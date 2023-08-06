import { ArticleCreateDTO, ArticleUpdateDTO } from "@common/types";
import {
  ArticleCreateSchema,
  ArticleMetaSchema,
  ArticleSchema,
  ArticleUpdateSchema,
} from "@common/validators";
import { FastifyPluginAsync } from "fastify";
import NodeCache from "node-cache";
import { z } from "zod";

import { CACHE_ARTICLE_METAS_PATH, DATA_ARTICLES_PATH } from "../../constants";
import { sendResponse, verifyAuth } from "../../helpers";
import { LOGGER } from "../../logger";
import { cachePlugin } from "../../plugins";
import { ArticleMetaRepository, ArticleRepository } from "../../repositories";
import {
  ArticleMetaListParams,
  ArticleMetaService,
  ArticleService,
} from "../../services";
import { ArticleWatcher } from "../../watchers";
import { ArticleMetaWorker } from "../../workers";

export const articlesRouter: FastifyPluginAsync = async (server) => {
  const repository = new ArticleRepository(DATA_ARTICLES_PATH);
  const metaRepository = new ArticleMetaRepository(CACHE_ARTICLE_METAS_PATH);
  const service = new ArticleService(repository);
  const metaService = new ArticleMetaService(metaRepository);
  const watcher = new ArticleWatcher(DATA_ARTICLES_PATH);
  const cache = new NodeCache();
  const worker = new ArticleMetaWorker(service, metaService, watcher);

  // Initialize repositories
  try {
    await repository.init();
    await metaRepository.init();
  } catch (e) {
    LOGGER.error("Failed to initialize article repositories", e);

    return;
  }

  /* Close hook */
  server.addHook("onClose", async () => {
    LOGGER.debug("Running article onClose hook...");
    cache.close();
    LOGGER.debug("Closed article cache");
    watcher.close();
    LOGGER.debug("Closed article watcher");
    await worker.stop();
    LOGGER.debug("Stopped article worker");
  });

  /* Cache */
  try {
    server.register(cachePlugin, {
      cache: cache,
    });
    LOGGER.debug("Registered article cache");

    const invalidateCache = (id: string) => {
      const cacheKeysToInvalidate = cache.keys().filter((key) => {
        return (
          key.startsWith(`${server.prefix}/articles-`) ||
          key.startsWith(`${server.prefix}/articles/${id}-`)
        );
      });

      cacheKeysToInvalidate.forEach((key) => cache.del(key));
    };

    watcher.on("add", invalidateCache);
    watcher.on("change", invalidateCache);
    watcher.on("unlink", invalidateCache);
    LOGGER.debug("Hooked article watcher");
  } catch (e) {
    LOGGER.error("Failed to register article cache", { error: e });

    return;
  }

  /* Worker */
  try {
    await worker.start();
    LOGGER.debug("Started article worker");
  } catch (e) {
    LOGGER.error("Failed to start article worker", { error: e });

    return;
  }

  /* Schemas */
  const headersSchema = z.object({
    authorization: z.string(),
  });
  const listParamsSchema = z.object({
    sortBy: z.enum(["title", "createdAt", "updatedAt"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  });
  const paramsSchema = z.object({
    id: z.string(),
  });
  const article200Schema = z.object({
    status: z.literal(200),
  });
  const article201Schema = z.object({
    status: z.literal(201),
  });
  const articlesResponseSchema = z.object({
    data: z.object({
      articles: z.array(ArticleMetaSchema),
    }),
  });
  const articleResponseSchema = z.object({
    data: z.object({
      article: ArticleSchema,
    }),
  });

  /* Routes */
  server.get<{
    Querystring: ArticleMetaListParams;
  }>(
    "/articles",
    {
      schema: {
        querystring: listParamsSchema,
        response: {
          200: article200Schema.merge(articlesResponseSchema),
        },
      },
    },
    async (request, reply) => {
      const articles = await metaService.list(request.query);

      const data = {
        status: 200,
        data: { articles: articles },
      };

      return sendResponse(reply, data);
    },
  );

  server.post<{
    Body: ArticleCreateDTO;
  }>(
    "/articles",
    {
      preHandler: server.auth([verifyAuth]),
      schema: {
        headers: headersSchema,
        body: ArticleCreateSchema,
        response: {
          201: article201Schema.merge(articleResponseSchema),
        },
      },
    },
    async (request, reply) => {
      const article = await service.create(request.body.id, request.body);

      return sendResponse(reply, {
        status: 201,
        data: { article },
      });
    },
  );

  server.get<{
    Params: { id: string };
  }>(
    "/articles/:id",
    {
      schema: {
        params: paramsSchema,
        response: {
          200: article200Schema.merge(articleResponseSchema),
        },
      },
    },
    async (request, reply) => {
      const article = await service.read(request.params.id);

      return sendResponse(reply, {
        status: 200,
        data: { article },
      });
    },
  );

  server.post<{
    Params: { id: string };
    Body: ArticleUpdateDTO;
  }>(
    "/articles/:id",
    {
      preHandler: server.auth([verifyAuth]),
      schema: {
        headers: headersSchema,
        params: paramsSchema,
        body: ArticleUpdateSchema,
        response: {
          200: article200Schema.merge(articleResponseSchema),
        },
      },
    },
    async (request, reply) => {
      const article = await service.update(request.params.id, request.body);

      return sendResponse(reply, {
        status: 200,
        data: { article },
      });
    },
  );

  server.delete<{
    Params: { id: string };
  }>(
    "/articles/:id",
    {
      preHandler: server.auth([verifyAuth]),
      schema: {
        headers: headersSchema,
        params: paramsSchema,
        response: {
          200: article200Schema,
        },
      },
    },
    async (request, reply) => {
      await service.delete(request.params.id);

      return sendResponse(reply, {
        status: 200,
      });
    },
  );
};
