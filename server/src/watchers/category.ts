import { DirectoryWatcher } from "./directory";

export class CategoryWatcher extends DirectoryWatcher {
  constructor(dirPath: string) {
    super(dirPath, ".json");
  }
}
