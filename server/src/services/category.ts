import {
  CategoryCreateDTO,
  CategoryDTO,
  CategoryUpdateDTO,
} from "@common/types";
import { CategorySchema } from "@common/validators";

import { INVALID_RESSOURCE_ERROR } from "../constants";
import { APIException } from "../exceptions";
import { CategoryRepository } from "../repositories";

import { DTODirectoryService } from "./dto-directory";

export type CategoryListParams = {
  sortBy?: "name";
  sortOrder?: "asc" | "desc";
};

export class CategoryService extends DTODirectoryService<
  CategoryDTO,
  CategoryCreateDTO,
  CategoryUpdateDTO
> {
  constructor(repository: CategoryRepository) {
    super(repository, CategorySchema);
  }

  async list(params?: CategoryListParams): Promise<CategoryDTO[]> {
    const sortBy = params?.sortBy || "name";
    const sortOrder = params?.sortOrder || "asc";

    let articleMetas = await super.list();

    if (sortBy) {
      articleMetas = articleMetas.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : -1;
        }

        return aValue < bValue ? 1 : -1;
      });
    }

    return articleMetas;
  }

  protected mapException(e: unknown): unknown {
    if (e instanceof Error) {
      const errno: NodeJS.ErrnoException = e;

      if (errno.code === "SyntaxError") {
        return new APIException(INVALID_RESSOURCE_ERROR, 500);
      }
    }

    return super.mapException(e);
  }
}
