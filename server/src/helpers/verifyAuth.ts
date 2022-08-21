import { FastifyAuthFunction } from "@fastify/auth";

import { BAD_REQUEST_ERROR, UNAUTHORIZED_ERROR } from "../constants";
import { APIException } from "../exceptions";
import { AuthService } from "../services/auth";

export const verifyAuth: FastifyAuthFunction = (request, reply, done) => {
  const authorization = request.headers["authorization"]?.trim();

  if (!authorization) {
    throw new APIException(BAD_REQUEST_ERROR, 400);
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    throw new APIException(BAD_REQUEST_ERROR, 400);
  }

  const authorized = AuthService.authorize(token);

  if (!authorized) {
    throw new APIException(UNAUTHORIZED_ERROR, 401);
  }

  done();
};
