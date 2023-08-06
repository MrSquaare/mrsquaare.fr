import { DTO } from "@common/types";

export interface DTOService<
  T extends DTO,
  TCreate extends Omit<T, "id">,
  TUpdate extends Partial<TCreate>,
> {
  list(): Promise<T[]>;
  create(id: T["id"], value: TCreate): Promise<T>;
  read(id: T["id"]): Promise<T>;
  update(id: T["id"], value: TUpdate): Promise<T>;
  delete(id: T["id"]): Promise<void>;
}
