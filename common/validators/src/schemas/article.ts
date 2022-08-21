import { ArticleCreateDTO, ArticleDTO, ArticleUpdateDTO } from "@common/types";
import { toZod } from "tozod";
import { z } from "zod";

import { ArticleMetaSchema } from "./article-meta";

export const ArticleSchema: toZod<ArticleDTO> = ArticleMetaSchema.extend({
  content: z.string().min(1),
});

export const ArticleCreateSchema: toZod<ArticleCreateDTO> = ArticleSchema;

export const ArticleUpdateSchema: toZod<ArticleUpdateDTO> =
  ArticleCreateSchema.partial();
