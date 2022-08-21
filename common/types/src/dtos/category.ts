import { DTO } from "./dto";

export type CategoryDTO = DTO & {
  name: string;
  image: string;
};

export type CategoryCreateDTO = CategoryDTO;

export type CategoryUpdateDTO = Partial<CategoryCreateDTO>;
