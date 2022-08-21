import { APIError } from "@common/types";

export const BAD_REQUEST_ERROR: APIError = {
  code: "BAD_REQUEST",
  message: "Bad request",
};

export const UNAUTHORIZED_ERROR: APIError = {
  code: "UNAUTHORIZED",
  message: "Unauthorized",
};

export const NOT_FOUND_ERROR = {
  code: "NOT_FOUND",
  message: "Not found",
};

export const TOO_MANY_REQUESTS_ERROR: APIError = {
  code: "TOO_MANY_REQUESTS",
  message: "Too many requests",
};

export const INTERNAL_SERVER_ERROR: APIError = {
  code: "INTERNAL_SERVER_ERROR",
  message: "Internal server error",
};

export const NOT_FOUND_RESOURCE_ERROR: APIError = {
  code: "NOT_FOUND_RESOURCE",
  message: "Resource not found",
};

export const EXISTING_RESOURCE_ERROR: APIError = {
  code: "EXISTING_RESOURCE",
  message: "Resource already exists",
};

export const INVALID_RESSOURCE_ERROR: APIError = {
  code: "INVALID_RESSOURCE",
  message: "Resource is invalid",
};
