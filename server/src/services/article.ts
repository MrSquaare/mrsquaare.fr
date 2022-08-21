import { ArticleCreateDTO, ArticleDTO, ArticleUpdateDTO } from "@common/types";
import { ArticleSchema } from "@common/validators";

import { INVALID_RESSOURCE_ERROR } from "../constants";
import { APIException } from "../exceptions";
import { ArticleRepository } from "../repositories";

import { DTODirectoryService } from "./dto-directory";

export class ArticleService extends DTODirectoryService<
  ArticleDTO,
  ArticleCreateDTO,
  ArticleUpdateDTO
> {
  constructor(repository: ArticleRepository) {
    super(repository, ArticleSchema);
  }

  protected mapException(e: unknown): unknown {
    if (e instanceof Error) {
      const errno: NodeJS.ErrnoException = e;

      if (errno.code === "YAMLException") {
        return new APIException(INVALID_RESSOURCE_ERROR, 500);
      }
    }

    return super.mapException(e);
  }
}
