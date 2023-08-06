import { CategoryCreateDTO, CategoryUpdateDTO } from "@common/types";
import {
  CategoryCreateSchema,
  CategorySchema,
  CategoryUpdateSchema,
} from "@common/validators";
import { FastifyPluginCallback } from "fastify";
import NodeCache from "node-cache";
import { z } from "zod";

import { DATA_CATEGORIES_PATH } from "../../constants";
import { sendResponse, verifyAuth } from "../../helpers";
import { LOGGER } from "../../logger";
import { cachePlugin } from "../../plugins";
import { CategoryRepository } from "../../repositories";
import { CategoryService } from "../../services";
import { CategoryWatcher } from "../../watchers";

export const categoriesRouter: FastifyPluginCallback = async (server) => {
  const repository = new CategoryRepository(DATA_CATEGORIES_PATH);
  const service = new CategoryService(repository);
  const watcher = new CategoryWatcher(DATA_CATEGORIES_PATH);
  const cache = new NodeCache();

  // Initialize repositories
  try {
    await repository.init();
  } catch (e) {
    LOGGER.error("Failed to initialize category repositories", e);

    return;
  }

  /* Close hook */
  server.addHook("onClose", async () => {
    LOGGER.debug("Running category onClose hook...");
    cache.close();
    LOGGER.debug("Closed category cache");
    watcher.close();
    LOGGER.debug("Closed category watcher");
  });

  /* Cache */
  try {
    server.register(cachePlugin, {
      cache: cache,
    });
    LOGGER.debug("Registered category cache");

    const invalidateCache = (id: string) => {
      const cacheKeysToInvalidate = cache.keys().filter((key) => {
        return (
          key.startsWith(`${server.prefix}/categories-`) ||
          key.startsWith(`${server.prefix}/categories/${id}-`)
        );
      });

      cacheKeysToInvalidate.forEach((key) => cache.del(key));
    };

    watcher.on("add", invalidateCache);
    watcher.on("change", invalidateCache);
    watcher.on("unlink", invalidateCache);
    LOGGER.debug("Hooked category watcher");
  } catch (e) {
    LOGGER.error("Failed to register category cache", { error: e });

    return;
  }

  /* Schemas */
  const headersSchema = z.object({
    authorization: z.string(),
  });
  const paramsSchema = z.object({
    id: z.string(),
  });
  const category200Schema = z.object({
    status: z.literal(200),
  });
  const category201Schema = z.object({
    status: z.literal(201),
  });
  /*
  const categoriesResponseSchema = z.object({
    data: z.object({
      categories: z.array(CategorySchema),
    }),
  });
  */
  const categoryResponseSchema = z.object({
    data: z.object({
      category: CategorySchema,
    }),
  });

  server.get(
    "/categories",
    {
      schema: {
        /*response: {
          200: category200Schema.merge(categoriesResponseSchema),
        },*/
      },
    },
    async (request, reply) => {
      const categories = await service.list();

      const data = {
        status: 200,
        data: { categories: categories },
      };

      return sendResponse(reply, data);
    },
  );

  server.post<{
    Body: CategoryCreateDTO;
  }>(
    "/categories",
    {
      preHandler: server.auth([verifyAuth]),
      schema: {
        headers: headersSchema,
        body: CategoryCreateSchema,
        response: {
          201: category201Schema.merge(categoryResponseSchema),
        },
      },
    },
    async (request, reply) => {
      const category = await service.create(request.body.id, request.body);

      return sendResponse(reply, {
        status: 201,
        data: { category },
      });
    },
  );

  server.get<{
    Params: { id: string };
  }>(
    "/categories/:id",
    {
      schema: {
        params: paramsSchema,
        response: {
          200: category200Schema.merge(categoryResponseSchema),
        },
      },
    },
    async (request, reply) => {
      const category = await service.read(request.params.id);

      return sendResponse(reply, {
        status: 200,
        data: { category },
      });
    },
  );

  server.post<{
    Params: { id: string };
    Body: CategoryUpdateDTO;
  }>(
    "/categories/:id",
    {
      preHandler: server.auth([verifyAuth]),
      schema: {
        headers: headersSchema,
        params: paramsSchema,
        body: CategoryUpdateSchema,
        response: {
          200: category200Schema.merge(categoryResponseSchema),
        },
      },
    },
    async (request, reply) => {
      const category = await service.update(request.params.id, request.body);

      return sendResponse(reply, {
        status: 200,
        data: { category },
      });
    },
  );

  server.delete<{
    Params: { id: string };
  }>(
    "/categories/:id",
    {
      preHandler: server.auth([verifyAuth]),
      schema: {
        headers: headersSchema,
        params: paramsSchema,
        response: {
          200: category200Schema,
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
