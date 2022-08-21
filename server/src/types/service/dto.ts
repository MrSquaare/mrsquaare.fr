import { DTO } from "@common/types";

export interface DTOService<
  T extends DTO,
  TCreate extends Omit<T, "id">,
  TUpdate extends Partial<TCreate>
> {
  list(): Promise<T[]>;
  create(id: string, value: TCreate): Promise<T>;
  read(id: string): Promise<T>;
  update(id: string, value: TUpdate): Promise<T>;
  delete(id: string): Promise<void>;
}
