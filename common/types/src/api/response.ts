import { APIError } from "./error";

export type APIResponse = {
  status: number;
  data?: Record<string, unknown>;
  error?: APIError;
};
