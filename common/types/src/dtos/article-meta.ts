import { DTO } from "./dto";

export type ArticleMetaDTO = DTO & {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  categories: string[];
};

export type ArticleMetaCreateDTO = ArticleMetaDTO;

export type ArticleMetaUpdateDTO = Partial<ArticleMetaCreateDTO>;
