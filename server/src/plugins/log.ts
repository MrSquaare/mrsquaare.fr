import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

import { LOGGER } from "../logger";

const cb: FastifyPluginCallback = (server, opts, done) => {
  server.addHook("onRoute", (route) => {
    LOGGER.debug(`New route registered: ${route.method} ${route.path}`);
  });

  server.addHook("onResponse", (request, reply, done) => {
    const responseTime = reply.getResponseTime().toPrecision(3);

    LOGGER.debug(
      `${request.method} ${request.url} ${reply.statusCode} ${responseTime}ms`,
    );

    done();
  });

  done();
};

export const logPlugin = fp(cb);
