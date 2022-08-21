import { DTO } from "@common/types";
import { omit } from "lodash";

import { DTOAlreadyExistsException, DTONotFoundException } from "../exceptions";
import { DTORepository } from "../types";

import { FileRepository } from "./file";

export type DTOFile<T extends DTO> = {
  [key: string]: Omit<T, "id">;
};

export type DTOFileCreate<T extends DTO> = DTOFile<T>;

export type DTOFileUpdate<T extends DTO> = Partial<DTOFileCreate<T>>;

export abstract class DTOFileRepository<
  T extends DTO,
  TCreate extends Omit<T, "id">,
  TUpdate extends Partial<TCreate>
> implements DTORepository<T, TCreate, TUpdate>
{
  protected repository: FileRepository<
    DTOFile<T>,
    DTOFileCreate<T>,
    DTOFileUpdate<T>
  >;
  constructor(path: string) {
    this.repository = new (class extends FileRepository<
      DTOFile<T>,
      DTOFileCreate<T>,
      DTOFileUpdate<T>
    > {
      constructor(
        filePath: string,
        private parentThis: DTOFileRepository<T, TCreate, TUpdate>
      ) {
        super(filePath);
      }

      protected fromRaw(raw: string): Partial<DTOFile<T>> {
        return this.parentThis.fromRaw(raw);
      }

      protected toRaw(value: Partial<DTOFile<T>>): string {
        return this.parentThis.toRaw(value);
      }

      protected merge(
        oldValue: Partial<DTOFile<T>>,
        value: Partial<DTOFile<T>>
      ): Partial<DTOFile<T>> {
        return value;
      }
    })(path, this);
  }

  protected abstract fromRaw(raw: string): Partial<DTOFile<T>>;
  protected abstract toRaw(value: Partial<DTOFile<T>>): string;

  async init(values?: T[]): Promise<void> {
    const raw =
      values?.reduce((acc, value) => {
        acc[value.id] = omit(value, "id");

        return acc;
      }, {} as DTOFileCreate<T>) ?? {};

    await this.repository.init(raw);
  }

  async list(): Promise<Partial<T>[]> {
    const raw = await this.repository.read();
    const values = Object.entries(raw).map(([id, data]): T => {
      return {
        ...data,
        id,
      } as T;
    });

    return values;
  }

  async create(id: string, value: TCreate): Promise<Partial<T>> {
    const raw: Partial<DTOFile<T>> = await this.repository.read();

    if (raw[id]) throw new DTOAlreadyExistsException();

    const newValue = { ...value, id };
    const newRaw = {
      ...raw,
      [newValue.id]: value,
    } as DTOFileCreate<T>;

    await this.repository.update(newRaw);

    // TODO: Find a better way to return right type
    return newValue as unknown as Partial<T>;
  }

  async read(id: string): Promise<Partial<T>> {
    const raw: Partial<DTOFile<T>> = await this.repository.read();
    const value = raw[id];

    if (!value) throw new DTONotFoundException();

    return { ...value, id } as Partial<T>;
  }

  async update(id: string, value: TUpdate): Promise<Partial<T>> {
    const raw: Partial<DTOFile<T>> = await this.repository.read();
    const oldValue = raw[id];

    if (!oldValue) throw new DTONotFoundException();

    const newValue = { ...oldValue, ...value, id };
    const newRaw = {
      ...raw,
      [newValue.id]: value,
    } as DTOFileUpdate<T>;

    await this.repository.update(newRaw);

    // TODO: Find a better way to return right type
    return newValue as unknown as Partial<T>;
  }

  async delete(id: string): Promise<void> {
    const raw: Partial<DTOFile<T>> = await this.repository.read();

    if (!raw[id]) throw new DTONotFoundException();

    const newRaw = omit(raw, id);

    await this.repository.update(newRaw);
  }

  async destroy(): Promise<void> {
    await this.repository.destroy();
  }
}
