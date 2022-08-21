import { CategoryDTO } from "@common/types";

import { safeFetchApi } from "../api";

import { useAPI } from "./useAPI";

export const getCategoriesUrl = () => `/blog/categories`;

export const getCategories = async () => {
  const { data, error } = await safeFetchApi()(getCategoriesUrl());
  const categories = data as CategoryDTO[];

  return { categories, error };
};

export const useCategories = () => {
  const { data, ...infos } = useAPI(getCategoriesUrl());
  const categories = data?.categories as CategoryDTO[] | undefined;

  return { categories, ...infos };
};
