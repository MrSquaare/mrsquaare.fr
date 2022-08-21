import {
  ArticleMetaCreateDTO,
  ArticleMetaDTO,
  ArticleMetaUpdateDTO,
} from "@common/types";
import { toZod } from "tozod";
import { z } from "zod";

import { DTOSchema } from "./dto";

export const ArticleMetaSchema: toZod<ArticleMetaDTO> = DTOSchema.extend({
  title: z.string().min(1),
  description: z.string().min(1),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
  image: z.string().min(1),
  categories: z.array(z.string()),
});
export const ArticleMetaCreateSchema: toZod<ArticleMetaCreateDTO> =
  ArticleMetaSchema;

export const ArticleMetaUpdateSchema: toZod<ArticleMetaUpdateDTO> =
  ArticleMetaCreateSchema.partial();
