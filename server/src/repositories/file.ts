import fs from "fs/promises";
import path from "path";

import { cloneDeep } from "lodash";

import { ReadOptions, WriteOptions } from "../types";
import { safeDeleteFile, safeReadFile, safeWriteFile } from "../utilities";

export abstract class FileRepository<T, TCreate, TUpdate> {
  protected filePath: string;

  constructor(filePath: string) {
    this.filePath = path.resolve(filePath);
  }

  protected abstract fromRaw(raw: string): Partial<T>;
  protected abstract toRaw(value: Partial<T>): string;
  protected abstract merge(oldValue: Partial<T>, value: Partial<T>): Partial<T>;

  async init(value: TCreate): Promise<void> {
    const exists = await this.exists();

    if (!exists) {
      const dirPath = path.dirname(this.filePath);

      await fs.mkdir(dirPath, {
        recursive: true,
      });
    }

    await this.writeFile(value, undefined, exists);
  }

  async exists(): Promise<boolean> {
    try {
      await fs.access(this.filePath);

      return true;
    } catch (e) {
      return false;
    }
  }

  async create(value: TCreate): Promise<Partial<T>> {
    const newValue = cloneDeep(value);

    await this.writeFile(newValue, { flag: "wx" });

    return newValue;
  }

  async read(): Promise<Partial<T>> {
    return await this.readFile();
  }

  async update(value: TUpdate): Promise<Partial<T>> {
    const oldValue = await this.readFile();
    const newValue = this.merge(oldValue, value);

    await this.writeFile(newValue);

    return newValue;
  }

  async delete(): Promise<void> {
    await this.deleteFile();
  }

  async destroy(): Promise<void> {
    const exists = await this.exists();

    if (exists) {
      await this.deleteFile();
    }
  }

  protected async readFile(options?: ReadOptions): Promise<Partial<T>> {
    const raw = await safeReadFile(this.filePath, options);
    const value = this.fromRaw(raw.toString());

    return value;
  }

  protected async writeFile(
    value: Partial<T>,
    options?: WriteOptions,
    doLock?: boolean
  ): Promise<void> {
    const raw = this.toRaw(value);

    await safeWriteFile(this.filePath, raw, options, doLock);
  }

  private async deleteFile(): Promise<void> {
    await safeDeleteFile(this.filePath, false);
  }
}
