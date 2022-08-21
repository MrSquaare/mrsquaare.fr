import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

import { AUTH_PASSWORD, AUTH_SECRET, UNAUTHORIZED_ERROR } from "../constants";
import { APIException } from "../exceptions";

const mapException = (e: unknown) => {
  if (e instanceof JsonWebTokenError) {
    return new APIException(UNAUTHORIZED_ERROR, 401);
  }

  return e;
};

export class AuthService {
  static authenticate(password: string): string {
    const valid = bcrypt.compareSync(password, AUTH_PASSWORD);

    if (!valid) {
      throw new APIException(UNAUTHORIZED_ERROR, 401);
    }

    try {
      return jwt.sign(AUTH_PASSWORD, AUTH_SECRET);
    } catch (e) {
      throw mapException(e);
    }
  }

  static authorize(token: string): boolean {
    try {
      return jwt.verify(token, AUTH_SECRET) === AUTH_PASSWORD;
    } catch (e) {
      throw mapException(e);
    }
  }
}
