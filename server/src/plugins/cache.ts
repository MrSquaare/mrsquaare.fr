import { FastifyPluginCallback, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import NodeCache from "node-cache";

import { LOGGER } from "../logger";

const DEFAULT_TTL = 60 * 60; // 1 hour

export type CacheOptions = {
  cache: NodeCache;
  ttl?: number;
};

const getCacheKey = (request: FastifyRequest): string => {
  const { query, url } = request;
  const queryStr = JSON.stringify(query);

  return `${url}-${queryStr}`;
};

const cb: FastifyPluginCallback<CacheOptions> = (server, opts, done) => {
  server.addHook("onRequest", (request, reply, done) => {
    if (request.routerMethod !== "GET") return done();

    const cacheKey = getCacheKey(request);
    const payload = opts.cache.get<string>(cacheKey);

    if (!payload) return done();

    LOGGER.debug(`Cache hit: ${cacheKey}`);

    reply.send(JSON.parse(payload));

    done();
  });

  server.addHook("onSend", (request, reply, payload, done) => {
    if (reply.statusCode < 200 || reply.statusCode >= 300) return done();
    if (!payload) return done();

    const cacheKey = getCacheKey(request);
    const inCache = opts.cache.has(cacheKey);

    if (inCache) return done();

    opts.cache.set(cacheKey, payload, opts.ttl ?? DEFAULT_TTL);

    LOGGER.debug(`Cache set: ${cacheKey}`);

    done();
  });

  done();
};

export const cachePlugin = fp(cb);
