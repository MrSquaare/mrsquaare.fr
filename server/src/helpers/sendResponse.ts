import { APIResponse } from "@common/types";
import { FastifyReply } from "fastify";

export const sendResponse = (reply: FastifyReply, data: APIResponse): void => {
  reply.status(data.status).send({
    status: data.status,
    data: data.data,
    error: data.error,
  });
};
