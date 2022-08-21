export type APIIssue = {
  code: string;
  message: string;
  path: (number | string)[];
  details?: Record<string, unknown>;
};

export type APIError = {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  issues?: APIIssue[];
};
