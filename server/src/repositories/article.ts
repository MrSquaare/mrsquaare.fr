import { ArticleCreateDTO, ArticleDTO, ArticleUpdateDTO } from "@common/types";
import matter from "gray-matter";

import { DTODirectoryRepository } from "./dto-directory";

export class ArticleRepository extends DTODirectoryRepository<
  ArticleDTO,
  ArticleCreateDTO,
  ArticleUpdateDTO
> {
  constructor(dirPath: string) {
    super(dirPath, ".md");
  }

  protected fromRaw(raw: string): Partial<ArticleDTO> {
    const { content, data } = matter(raw);

    return {
      ...data,
      content,
    };
  }

  protected toRaw(article: Partial<ArticleDTO>): string {
    const { content, ...data } = article;
    const raw = matter.stringify(content || "", data);

    return raw;
  }
}
