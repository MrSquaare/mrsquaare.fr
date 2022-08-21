import { ArticleDTO } from "@common/types";

import { safeFetchApi } from "../api";

import { useAPI } from "./useAPI";

export const getArticleUrl = (id: string) => `/blog/articles/${id}`;

export const getArticle = async (id: string) => {
  const { data, error } = await safeFetchApi()(getArticleUrl(id));
  const article = data as ArticleDTO;

  return { article, error };
};

export const useArticle = (id: string) => {
  const { data, ...infos } = useAPI(getArticleUrl(id));
  const article = data?.article as ArticleDTO;

  return { article, ...infos };
};
