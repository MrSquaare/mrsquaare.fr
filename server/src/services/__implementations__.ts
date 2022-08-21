import { toZod } from "tozod";
import { z } from "zod";

import {
  DummyCreateDTO,
  DummyDTO,
  DummyUpdateDTO,
} from "../repositories/__implementations__";

import { DTODirectoryService } from "./dto-directory";
import { DTOFileService } from "./dto-file";

export const dummySchema: toZod<DummyDTO> = z.object({
  id: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export class DTODirectoryServiceImpl extends DTODirectoryService<
  DummyDTO,
  DummyCreateDTO,
  DummyUpdateDTO
> {}

export class DTOFileServiceImpl extends DTOFileService<
  DummyDTO,
  DummyCreateDTO,
  DummyUpdateDTO
> {}
