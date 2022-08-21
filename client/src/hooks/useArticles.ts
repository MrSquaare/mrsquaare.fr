import { ArticleMetaDTO } from "@common/types";

import { safeFetchApi } from "../api";

import { useAPI } from "./useAPI";

export const getArticlesUrl = () => `/blog/articles`;

export const getArticles = async () => {
  const { data, error } = await safeFetchApi()(getArticlesUrl());
  const articles = data as ArticleMetaDTO[];

  return { articles, error };
};

export const useArticles = () => {
  const { data, ...infos } = useAPI(getArticlesUrl());
  const articles = data?.articles as ArticleMetaDTO[] | undefined;

  return { articles, ...infos };
};
