import { ArticleMetaDTO } from "@common/types";

import { DTOFile, DTOFileRepository } from "./dto-file";

export class ArticleMetaRepository extends DTOFileRepository<
  ArticleMetaDTO,
  ArticleMetaDTO,
  Partial<ArticleMetaDTO>
> {
  protected fromRaw(raw: string): Partial<DTOFile<ArticleMetaDTO>> {
    const value = JSON.parse(raw);

    return value;
  }

  protected toRaw(value: Partial<DTOFile<ArticleMetaDTO>>): string {
    const raw = JSON.stringify(value);

    return raw;
  }
}
