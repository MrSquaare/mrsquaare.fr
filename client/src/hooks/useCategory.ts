import { CategoryDTO } from "@common/types";

import { safeFetchApi } from "../api";

import { useAPI } from "./useAPI";

export const getCategoryUrl = (id: string) => `/blog/categories/${id}`;

export const getCategory = async (id: string) => {
  const { data, error } = await safeFetchApi()(getCategoryUrl(id));
  const category = data as CategoryDTO;

  return { category, error };
};

export const useCategory = (id: string) => {
  const { data, ...infos } = useAPI(getCategoryUrl(id));
  const category = data?.category as CategoryDTO;

  return { category, ...infos };
};
