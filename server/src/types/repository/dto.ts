import { DTO } from "@common/types";

export interface DTORepository<
  T extends DTO,
  TCreate extends Omit<T, "id">,
  TUpdate extends Partial<TCreate>,
> {
  list(): Promise<Partial<T>[]>;
  create(id: T["id"], value: TCreate): Promise<Partial<T>>;
  read(id: T["id"]): Promise<Partial<T>>;
  update(id: T["id"], value: TUpdate): Promise<Partial<T>>;
  delete(id: T["id"]): Promise<void>;
}
