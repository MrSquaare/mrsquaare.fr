import { DTO } from "@common/types";
import { ZodError, ZodSchema } from "zod";

import { zodIssuesToAPIIssues } from "../adapters";
import {
  EXISTING_RESOURCE_ERROR,
  INVALID_RESSOURCE_ERROR,
  NOT_FOUND_RESOURCE_ERROR,
} from "../constants";
import {
  APIException,
  DTOAlreadyExistsException,
  DTONotFoundException,
} from "../exceptions";
import { DTODirectoryRepository } from "../repositories";
import { DTOService } from "../types";

export abstract class DTODirectoryService<
  T extends DTO,
  TCreate extends Omit<T, "id">,
  TUpdate extends Partial<TCreate>,
> implements DTOService<T, TCreate, TUpdate>
{
  constructor(
    protected repository: DTODirectoryRepository<T, TCreate, TUpdate>,
    protected EntitySchema: ZodSchema<T>,
  ) {}

  async init(values?: T[]): Promise<void> {
    await this.repository.init(values);
  }

  async list(): Promise<T[]> {
    try {
      const partialArticles = await this.repository.list();

      return partialArticles.map((article) => {
        return this.EntitySchema.parse(article);
      });
    } catch (e) {
      throw this.mapException(e);
    }
  }

  async read(id: T["id"]): Promise<T> {
    try {
      const partialArticle = await this.repository.read(id);

      return this.EntitySchema.parse(partialArticle);
    } catch (e) {
      throw this.mapException(e);
    }
  }

  async create(id: T["id"], value: TCreate): Promise<T> {
    try {
      const partialArticle = await this.repository.create(id, value);

      return this.EntitySchema.parse(partialArticle);
    } catch (e) {
      throw this.mapException(e);
    }
  }

  async update(id: T["id"], value: TUpdate): Promise<T> {
    try {
      const partialArticle = await this.repository.update(id, value);

      return this.EntitySchema.parse(partialArticle);
    } catch (e) {
      throw this.mapException(e);
    }
  }

  async delete(id: T["id"]): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (e) {
      throw this.mapException(e);
    }
  }

  async destroy(): Promise<void> {
    await this.repository.destroy();
  }

  protected mapException(e: unknown) {
    if (e instanceof DTONotFoundException) {
      return new APIException(NOT_FOUND_RESOURCE_ERROR, 404);
    }

    if (e instanceof DTOAlreadyExistsException) {
      return new APIException(EXISTING_RESOURCE_ERROR, 422);
    }

    if (e instanceof ZodError) {
      const issues = zodIssuesToAPIIssues(e.issues);

      return new APIException({ ...INVALID_RESSOURCE_ERROR, issues }, 500);
    }

    return e;
  }
}
