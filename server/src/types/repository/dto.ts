import { DTO } from "@common/types";

export interface DTORepository<
  T extends DTO,
  TCreate extends Omit<T, "id">,
  TUpdate extends Partial<TCreate>
> {
  list(): Promise<Partial<T>[]>;
  create(id: string, value: TCreate): Promise<Partial<T>>;
  read(id: string): Promise<Partial<T>>;
  update(id: string, value: TUpdate): Promise<Partial<T>>;
  delete(id: string): Promise<void>;
}
