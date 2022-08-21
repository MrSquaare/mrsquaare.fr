import { ArticleMetaDTO } from "./article-meta";
import { DTO } from "./dto";

export type ArticleDTO = DTO &
  ArticleMetaDTO & {
    content: string;
  };

export type ArticleCreateDTO = ArticleDTO;

export type ArticleUpdateDTO = Partial<ArticleCreateDTO>;
