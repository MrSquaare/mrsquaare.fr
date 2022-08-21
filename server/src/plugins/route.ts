import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

type Options = {
  routers: CallableFunction[];
  prefix?: string;
};

export const cb: FastifyPluginCallback<Options> = (server, opts, done) => {
  opts.routers.forEach((router) => {
    server.register(
      async (server, opts) => {
        await router(server, opts);
      },
      { prefix: opts.prefix }
    );
  });

  done();
};

export const routePlugin = fp(cb);
