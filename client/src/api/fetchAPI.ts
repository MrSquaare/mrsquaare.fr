import { APIError } from "@common/types";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { API_BASE_URL } from "../constants";

export const fetchApi =
  (config?: AxiosRequestConfig) => async (route: string) => {
    try {
      const response = await axios.request({
        ...config,
        baseURL: API_BASE_URL,
        url: route,
      });

      return response.data.data;
    } catch (e) {
      console.error("Error while fetching API:", e);

      let apiError: APIError = {
        message: "Unknown error",
        code: "UNKNOWN",
      };

      if (e instanceof AxiosError) {
        apiError = {
          message: e.message,
          code: `AXIOS_${e.code || "UNKNOWN"}`,
        };

        if (e.response?.data) {
          apiError = e.response.data.error;
        }
      }

      throw apiError;
    }
  };

export const safeFetchApi =
  (config?: AxiosRequestConfig) => async (route: string) => {
    try {
      const data = await fetchApi(config)(route);

      return { data };
    } catch (e) {
      return { error: e as APIError };
    }
  };
