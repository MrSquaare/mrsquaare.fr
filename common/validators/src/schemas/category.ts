import {
  CategoryCreateDTO,
  CategoryDTO,
  CategoryUpdateDTO,
} from "@common/types";
import { toZod } from "tozod";
import { z } from "zod";

import { DTOSchema } from "./dto";

export const CategorySchema: toZod<CategoryDTO> = DTOSchema.extend({
  name: z.string().min(1),
  image: z.string().min(1),
});

export const CategoryCreateSchema: toZod<CategoryCreateDTO> = CategorySchema;

export const CategoryUpdateSchema: toZod<CategoryUpdateDTO> =
  CategoryCreateSchema.partial();
