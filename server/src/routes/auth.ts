import { FastifyPluginCallback } from "fastify";
import { z } from "zod";

import { sendResponse } from "../helpers";
import { AuthService } from "../services/auth";

export const authRouter: FastifyPluginCallback = (server) => {
  const authSchema = z.object({
    password: z.string(),
  });
  const auth200Schema = z.object({
    status: z.literal("200"),
    data: z.object({
      token: z.string(),
    }),
  });

  server.post<{
    Body: {
      password: string;
    };
  }>(
    "/auth",
    {
      schema: {
        body: authSchema,
        response: {
          200: auth200Schema,
        },
      },
    },
    async (request, reply) => {
      const token = AuthService.authenticate(request.body.password);

      return sendResponse(reply, {
        status: 200,
        data: { token },
      });
    },
  );
};
