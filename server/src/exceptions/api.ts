import { APIError } from "@common/types";

export class APIException extends Error {
  constructor(
    public error: APIError,
    public status: number,
  ) {
    super(error.message);
  }
}
