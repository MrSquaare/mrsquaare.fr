import { ArticleMetaSchema } from "@common/validators";
import { z } from "zod";

export const ArticleMetasSchema = z.record(z.string(), ArticleMetaSchema);
