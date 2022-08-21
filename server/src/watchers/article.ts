import { DirectoryWatcher } from "./directory";

export class ArticleWatcher extends DirectoryWatcher {
  constructor(dirPath: string) {
    super(dirPath, ".md");
  }
}
