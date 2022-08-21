import path from "path";

import { FSWatcher, watch } from "chokidar";

export abstract class FileWatcher {
  protected filePath: string;
  protected watcher: FSWatcher;

  constructor(filePath: string) {
    this.filePath = path.resolve(filePath);
    this.watcher = watch(this.filePath);
  }

  on(event: "add" | "change" | "unlink", handler: () => void): void {
    this.watcher.on(event, () => {
      handler();
    });
  }

  close(): void {
    this.watcher.close();
  }
}
