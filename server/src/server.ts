import path from "path";

import authPlugin from "@fastify/auth";
import compressPlugin from "@fastify/compress";
import corsPlugin from "@fastify/cors";
import etagPlugin from "@fastify/etag";
import helmetPlugin from "@fastify/helmet";
import rateLimitPlugin from "@fastify/rate-limit";
import staticPlugin from "@fastify/static";
import swaggerPlugin from "@fastify/swagger";
import fastify from "fastify";
import { ZodError } from "zod";

import {
  FastifySwaggerTransformer,
  zodIssuesToAPIIssues,
  zodSerializerCompiler,
  zodSwaggerTransformer,
  zodValidatorCompiler,
} from "./adapters";
import {
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_ERROR,
  SERVER_HOSTNAME,
  SERVER_PORT,
  TOO_MANY_REQUESTS_ERROR,
} from "./constants";
import { APIException } from "./exceptions";
import { sendResponse } from "./helpers";
import { LOGGER } from "./logger";
import { logPlugin, routePlugin } from "./plugins";
import { rootRouters, blogRouters } from "./routes";

export const server = fastify();

export type TypedServer = typeof server;

server.register(corsPlugin);
server.register(helmetPlugin, {
  crossOriginResourcePolicy: false,
});
server.register(rateLimitPlugin, {
  max: 60,
  timeWindow: "1 minute",
});

server.register(etagPlugin);
// FIXME: Bug in @fastify/compress plugin
// See https://github.com/fastify/fastify-compress/issues/215
//server.register(compressPlugin);

server.register(staticPlugin, {
  root: path.resolve("./data/uploads"),
  prefix: "/v1/uploads/",
});

server.register(swaggerPlugin, {
  routePrefix: "/v1/swagger",
  exposeRoute: true,
  staticCSP: true,
  openapi: {
    info: {
      title: "blog.mrsquaare.fr API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  uiConfig: {
    layout: "BaseLayout",
  },
  transform: zodSwaggerTransformer as FastifySwaggerTransformer,
});

server.register(authPlugin);
server.register(logPlugin);
server.register(routePlugin, {
  prefix: "/v1",
  routers: rootRouters,
});
server.register(routePlugin, {
  prefix: "/v1/blog",
  routers: blogRouters,
});

server.setValidatorCompiler(zodValidatorCompiler);
server.setSerializerCompiler(zodSerializerCompiler);

server.setNotFoundHandler(async (request, reply) => {
  return sendResponse(reply, {
    status: 404,
    error: NOT_FOUND_ERROR,
  });
});

server.setErrorHandler(async (error, request, reply) => {
  if (error instanceof ZodError) {
    return sendResponse(reply, {
      status: 400,
      error: {
        ...BAD_REQUEST_ERROR,
        issues: zodIssuesToAPIIssues(error.issues),
      },
    });
  }

  if (error instanceof APIException) {
    return sendResponse(reply, {
      status: error.status,
      error: error.error,
    });
  }

  if (error.statusCode === 400) {
    return sendResponse(reply, {
      status: 400,
      error: BAD_REQUEST_ERROR,
    });
  }

  if (error.statusCode === 429) {
    return sendResponse(reply, {
      status: 429,
      error: TOO_MANY_REQUESTS_ERROR,
    });
  }

  LOGGER.error("Unhandled error", { error: error });

  return sendResponse(reply, {
    status: 500,
    error: INTERNAL_SERVER_ERROR,
  });
});

export async function start() {
  try {
    LOGGER.debug("Starting server");

    await server.after();
    await server.ready();

    const address = await server.listen({
      host: SERVER_HOSTNAME,
      port: SERVER_PORT,
    });

    LOGGER.info(`Server listening on ${address}`);
  } catch (e) {
    LOGGER.error("Failed to start server", { error: e });

    process.exit(1);
  }
}

export async function stop() {
  try {
    LOGGER.debug("Stopping server");

    await server.close();

    LOGGER.debug("Stopped server");
  } catch (e) {
    LOGGER.error("Failed to stop server", { error: e });

    process.exit(1);
  }
}
