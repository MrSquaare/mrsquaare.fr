import { DTO } from "@common/types";
import { toZod } from "tozod";
import { z } from "zod";

export const DTOSchema: toZod<DTO> = z.object({
  id: z.string().min(1),
});
