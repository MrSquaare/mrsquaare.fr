import {
  ArticleMetaCreateDTO,
  ArticleMetaDTO,
  ArticleMetaUpdateDTO,
} from "@common/types";
import { ArticleMetaSchema } from "@common/validators";

import { INVALID_RESSOURCE_ERROR } from "../constants";
import { APIException } from "../exceptions";
import { ArticleMetaRepository } from "../repositories";

import { DTOFileService } from "./dto-file";

export type ArticleMetaListParams = {
  sortBy?: "title" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
};

export class ArticleMetaService extends DTOFileService<
  ArticleMetaDTO,
  ArticleMetaCreateDTO,
  ArticleMetaUpdateDTO
> {
  constructor(repository: ArticleMetaRepository) {
    super(repository, ArticleMetaSchema);
  }

  async list(params?: ArticleMetaListParams): Promise<ArticleMetaDTO[]> {
    const sortBy = params?.sortBy || "createdAt";
    const sortOrder = params?.sortOrder || "desc";

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
