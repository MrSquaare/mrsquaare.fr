import { CategoryDTO } from "@common/types";

import { DTODirectoryRepository } from "./dto-directory";

export class CategoryRepository extends DTODirectoryRepository<
  CategoryDTO,
  CategoryDTO,
  Partial<CategoryDTO>
> {
  constructor(dirPath: string) {
    super(dirPath, ".json");
  }

  protected fromRaw(raw: string): Partial<CategoryDTO> {
    const value = JSON.parse(raw);

    return value;
  }

  protected toRaw(value: Partial<CategoryDTO>): string {
    const raw = JSON.stringify(value, null, 2);

    return raw;
  }
}
