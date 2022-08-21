import path from "path";

import { FSWatcher, watch } from "chokidar";

export abstract class DirectoryWatcher {
  protected dirPath: string;
  protected fileExt: string;
  protected watcher: FSWatcher;

  constructor(dirPath: string, fileExt: string) {
    this.dirPath = path.resolve(dirPath);
    this.fileExt = fileExt;
    this.watcher = watch(path.join(this.dirPath, "**/*" + this.fileExt));
  }

  on(event: "add" | "change" | "unlink", handler: (id: string) => void): void {
    this.watcher.on(event, (path) => {
      const fileName = path.split("\\").pop().split("/").pop();
      const id = fileName.replace(this.fileExt, "");

      handler(id);
    });
  }

  close(): void {
    this.watcher.close();
  }
}
