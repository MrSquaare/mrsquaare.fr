import { DTO } from "@common/types";
import { omit } from "lodash";

import { DTOAlreadyExistsException, DTONotFoundException } from "../exceptions";
import { DTORepository } from "../types";

import { FileRepository } from "./file";

export type DTOFile<T extends DTO> = {
  [key: string]: Partial<Omit<T, "id">>;
};

export abstract class DTOFileRepository<
  T extends DTO,
  TCreate extends Omit<T, "id">,
  TUpdate extends Partial<TCreate>,
> implements DTORepository<T, TCreate, TUpdate>
{
  protected repository: FileRepository<
    Partial<DTOFile<T>>,
    Partial<DTOFile<T>>
  >;
  constructor(path: string) {
    this.repository = new (class extends FileRepository<
      Partial<DTOFile<T>>,
      Partial<DTOFile<T>>
    > {
      constructor(
        filePath: string,
        private parentThis: DTOFileRepository<T, TCreate, TUpdate>,
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
        value: Partial<DTOFile<T>>,
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
      }, {} as DTOFile<T>) ?? {};

    await this.repository.init(raw);
  }

  async list(): Promise<Partial<T>[]> {
    const raw = await this.repository.read();
    const values = Object.entries(raw).map(([id, data]) => {
      return {
        ...data,
        id,
      } as Partial<T>;
    });

    return values;
  }

  async create(id: T["id"], value: TCreate): Promise<Partial<T>> {
    const raw = await this.repository.read();

    if (raw[id]) throw new DTOAlreadyExistsException();

    const newRaw = {
      ...raw,
      [id]: value,
    };

    const newValue = await this.repository.update(newRaw);

    return { ...newValue, id } as Partial<T>;
  }

  async read(id: T["id"]): Promise<Partial<T>> {
    const raw = await this.repository.read();
    const value = raw[id];

    if (!value) throw new DTONotFoundException();

    return { ...value, id } as Partial<T>;
  }

  async update(id: T["id"], value: TUpdate): Promise<Partial<T>> {
    const raw = await this.repository.read();
    const oldValue = raw[id];

    if (!oldValue) throw new DTONotFoundException();

    const newRaw = {
      ...raw,
      [id]: value,
    };

    const newValue = await this.repository.update(newRaw);

    return { ...newValue, id } as Partial<T>;
  }

  async delete(id: T["id"]): Promise<void> {
    const raw = await this.repository.read();

    if (!raw[id]) throw new DTONotFoundException();

    const newRaw = omit(raw, id);

    await this.repository.update(newRaw);
  }

  async destroy(): Promise<void> {
    await this.repository.destroy();
  }
}
