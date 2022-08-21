import { APIIssue } from "@common/types";
import { JSONObject } from "@fastify/swagger";
import { FastifySchema, FastifyTypeProvider } from "fastify";
import {
  FastifySchemaCompiler,
  FastifySerializerCompiler,
  // eslint-disable-next-line import/no-unresolved
} from "fastify/types/schema";
import z, { ZodIssue, ZodSchema } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export interface FastifyZodTypeProvider extends FastifyTypeProvider {
  output: this["input"] extends ZodSchema ? z.infer<this["input"]> : never;
}

export type FastifySwaggerTransformer<S = FastifySchema> = (args: {
  schema: S;
  url: string;
}) => {
  schema: JSONObject;
  url: string;
};

export type FastifyZodSchemaValue = ZodSchema;

export interface FastifyZodSchema {
  body?: FastifyZodSchemaValue;
  querystring?: FastifyZodSchemaValue;
  params?: FastifyZodSchemaValue;
  headers?: FastifyZodSchemaValue;
  response?: FastifyZodSchemaValue;
}

export const zodIssuesToAPIIssues = (issues: ZodIssue[]): APIIssue[] => {
  return issues.map((issue) => {
    const { code, message, path, ...details } = issue;

    return {
      code: code,
      message: message,
      path: path,
      details: { ...details },
    };
  });
};

export const zodValidatorCompiler: FastifySchemaCompiler<
  FastifyZodSchemaValue
> = ({ schema }) => {
  return (data) => {
    if (schema instanceof ZodSchema) {
      return schema.parse(data);
    }

    throw new Error("Can't validate: not a Zod schema");
  };
};

export const zodSerializerCompiler: FastifySerializerCompiler<
  FastifyZodSchemaValue
> = ({ schema }) => {
  return (data) => {
    if (schema instanceof ZodSchema) {
      return JSON.stringify(schema.parse(data));
    }

    throw new Error("Can't serialize schema: not a Zod schema");
  };
};

const zodSchemaToJsonSchema = (schema: any) => {
  if (!schema) return schema;

  if (schema instanceof ZodSchema) {
    const jsonSchema: any = zodToJsonSchema(schema);

    return jsonSchema;
  }

  if (schema instanceof Array) {
    const jsonSchema: any = schema.map(zodSchemaToJsonSchema);

    return jsonSchema;
  }

  if (schema instanceof Object) {
    const jsonSchema: any = {};

    for (const key in schema) {
      jsonSchema[key] = zodSchemaToJsonSchema(schema[key]);
    }

    return jsonSchema;
  }

  return schema;
};

export const zodSwaggerTransformer: FastifySwaggerTransformer<
  FastifyZodSchema
> = ({ schema, url }) => {
  return { schema: zodSchemaToJsonSchema(schema), url };
};
