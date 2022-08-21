import { APIResponse } from "@common/types";
import { AxiosRequestConfig } from "axios";
import useSWR from "swr";

import { fetchApi } from "../api";

type Returned = {
  data: APIResponse["data"];
  error: APIResponse["error"];
  isLoading: boolean;
};

export const useAPI = (
  route: string,
  config?: AxiosRequestConfig
): Returned => {
  const { data, error } = useSWR(route, fetchApi(config));

  return { data, error, isLoading: !data && !error };
};
