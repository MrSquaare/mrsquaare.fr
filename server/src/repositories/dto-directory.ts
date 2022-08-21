import { DTO } from "@common/types";

import { DTOAlreadyExistsException, DTONotFoundException } from "../exceptions";
import { DTORepository } from "../types";

import { DirectoryRepository } from "./directory";

export type DTODirectory<T extends DTO> = Omit<T, "id">;

export type DTODirectoryCreate<T extends DTO> = DTODirectory<T>;

export type DTODirectoryUpdate<T extends DTO> = Partial<DTODirectoryCreate<T>>;

export abstract class DTODirectoryRepository<
  T extends DTO,
  TCreate extends Omit<T, "id">,
  TUpdate extends Partial<TCreate>
> implements DTORepository<T, TCreate, TUpdate>
{
  protected repository: DirectoryRepository<
    DTODirectory<T>,
    DTODirectoryCreate<T>,
    DTODirectoryUpdate<T>
  >;
  protected fileExt: string;

  constructor(dirPath: string, fileExt: string) {
    this.repository = new (class extends DirectoryRepository<
      DTODirectory<T>,
      DTODirectoryCreate<T>,
      DTODirectoryUpdate<T>
    > {
      constructor(
        dirPath: string,
        private parentThis: DTODirectoryRepository<T, TCreate, TUpdate>
      ) {
        super(dirPath);
      }

      protected fromRaw(raw: string): Partial<DTODirectory<T>> {
        return this.parentThis.fromRaw(raw);
      }

      protected toRaw(value: Partial<DTODirectory<T>>): string {
        return this.parentThis.toRaw(value);
      }

      protected merge(
        oldValue: Partial<DTODirectory<T>>,
        value: Partial<DTODirectory<T>>
      ): Partial<DTODirectory<T>> {
        return { ...oldValue, ...value };
      }
    })(dirPath, this);
    this.fileExt = fileExt;
  }

  protected abstract fromRaw(raw: string): Partial<DTODirectory<T>>;
  protected abstract toRaw(value: Partial<DTODirectory<T>>): string;

  async init(values?: T[]): Promise<void> {
    const raw = values?.map(({ id, ...data }) => {
      return [id + this.fileExt, data];
    }) as [string, DTODirectory<T>][];

    await this.repository.init(raw);
  }

  async list(): Promise<Partial<T>[]> {
    const names = await this.repository.listNames();
    const ids = names
      .filter((name) => name.endsWith(this.fileExt))
      .map((name) => name.replace(this.fileExt, ""));
    const values = await Promise.all(ids.map((id) => this.read(id)));

    return values;
  }

  async create(id: string, value: TCreate): Promise<Partial<T>> {
    try {
      const newValue: Partial<DTODirectory<T>> = await this.repository.create(
        id + this.fileExt,
        value
      );

      return { ...newValue, id } as Partial<T>;
    } catch (e) {
      throw this.mapException(e);
    }
  }

  async read(id: string): Promise<Partial<T>> {
    try {
      const value: Partial<DTODirectory<T>> = await this.repository.read(
        id + this.fileExt
      );

      return { ...value, id } as Partial<T>;
    } catch (e) {
      throw this.mapException(e);
    }
  }

  async update(id: string, value: TUpdate): Promise<Partial<T>> {
    try {
      const newValue: Partial<DTODirectory<T>> = await this.repository.update(
        id + this.fileExt,
        value
      );

      return { ...newValue, id } as Partial<T>;
    } catch (e) {
      throw this.mapException(e);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id + this.fileExt);
    } catch (e) {
      throw this.mapException(e);
    }
  }

  async destroy(): Promise<void> {
    await this.repository.destroy();
  }

  protected mapException(e: unknown): unknown {
    if (e instanceof Error) {
      const errno: NodeJS.ErrnoException = e;

      if (errno.code === "ENOENT") {
        throw new DTONotFoundException();
      }

      if (errno.code === "EEXIST") {
        throw new DTOAlreadyExistsException();
      }
    }

    return e;
  }
}
