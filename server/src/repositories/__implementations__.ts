import { DTO } from "@common/types";

import { DirectoryRepository } from "./directory";
import { DTODirectory, DTODirectoryRepository } from "./dto-directory";
import { DTOFile, DTOFileRepository } from "./dto-file";
import { FileRepository } from "./file";

export type DummyDTO = DTO & {
  firstName: string;
  lastName: string;
};
export type DummyCreateDTO = Omit<DummyDTO, "id">;
export type DummyUpdateDTO = Partial<DummyCreateDTO>;

export class DirectoryRepositoryImpl extends DirectoryRepository<
  string,
  string
> {
  protected fromRaw(raw: string): string {
    return raw;
  }

  protected toRaw(value: string): string {
    return value;
  }

  protected merge(oldValue: string, value: string): string {
    return oldValue + value;
  }
}

export class DTODirectoryRepositoryImpl extends DTODirectoryRepository<
  DummyDTO,
  DummyCreateDTO,
  DummyUpdateDTO
> {
  protected fromRaw(raw: string): Partial<DTODirectory<DummyDTO>> {
    const value = JSON.parse(raw);

    return value;
  }

  protected toRaw(value: Partial<DTODirectory<DummyDTO>>): string {
    const raw = JSON.stringify(value);

    return raw;
  }
}

export class DTOFileRepositoryImpl extends DTOFileRepository<
  DummyDTO,
  DummyCreateDTO,
  DummyUpdateDTO
> {
  protected fromRaw(raw: string): Partial<DTOFile<DummyDTO>> {
    const value = JSON.parse(raw);

    return value;
  }

  protected toRaw(value: Partial<DTOFile<DummyDTO>>): string {
    const raw = JSON.stringify(value);

    return raw;
  }
}

export class FileRepositoryImpl extends FileRepository<string, string> {
  protected fromRaw(raw: string): string {
    return raw;
  }

  protected toRaw(value: string): string {
    return value;
  }

  protected merge(oldValue: string, value: string): string {
    return oldValue + value;
  }
}
