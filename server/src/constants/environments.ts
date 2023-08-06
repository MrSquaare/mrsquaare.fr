import path from "path";

import { v4 } from "uuid";

export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "0.0.0.0";
export const SERVER_PORT = parseInt(process.env.SERVER_PORT || "3100");

export const DATA_PATH = process.env.DATA_PATH || "./data";

export const DATA_ARTICLES_PATH =
  process.env.DATA_ARTICLES_PATH || path.join(DATA_PATH, "./articles");
export const DATA_CATEGORIES_PATH =
  process.env.DATA_ARTICLES_PATH || path.join(DATA_PATH, "./categories");

export const CACHE_PATH =
  process.env.CACHE_PATH || path.join(DATA_PATH, "./_cache");
export const CACHE_ARTICLE_METAS_PATH = path.join(
  CACHE_PATH,
  "./article-metas.json",
);

export const AUTH_PASSWORD = process.env.AUTH_PASSWORD || v4();
export const AUTH_SECRET = process.env.AUTH_SECRET || v4();

export const LOGGER_LEVEL = process.env.LOGGER_LEVEL || "debug";
