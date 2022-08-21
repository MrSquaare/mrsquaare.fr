import fs from "fs/promises";
import path from "path";

import { cloneDeep } from "lodash";

import { ReadOptions, WriteOptions } from "../types";
import { safeDeleteFile, safeReadFile, safeWriteFile } from "../utilities";

export abstract class DirectoryRepository<T, TCreate, TUpdate> {
  protected dirPath: string;

  constructor(dirPath: string) {
    this.dirPath = path.resolve(dirPath);
  }

  protected abstract fromRaw(raw: string): Partial<T>;
  protected abstract toRaw(value: Partial<T>): string;
  protected abstract merge(oldValue: Partial<T>, value: Partial<T>): Partial<T>;

  async init(values?: [string, T][]): Promise<void> {
    const exists = await this.exists();

    if (!exists) {
      await fs.mkdir(this.dirPath, {
        recursive: true,
      });
    }

    if (values?.length) {
      await Promise.all(
        values.map(([name, value]) =>
          this.writeFile(name, value, undefined, exists)
        )
      );
    }
  }

  async exists(): Promise<boolean> {
    try {
      await fs.access(this.dirPath);

      return true;
    } catch (e) {
      return false;
    }
  }

  async listNames(): Promise<string[]> {
    const entries = await fs.readdir(this.dirPath, {
      withFileTypes: true,
    });
    const filteredEntries = entries.filter((entry) => {
      return entry.isFile();
    });
    const names = filteredEntries.map((entry) => {
      return entry.name;
    });

    return names;
  }

  async list(): Promise<Partial<T>[]> {
    const names = await this.listNames();
    const values = await Promise.all(names.map((name) => this.read(name)));

    return values;
  }

  async create(name: string, value: TCreate): Promise<Partial<T>> {
    const newValue = cloneDeep(value);

    await this.writeFile(name, newValue, { flag: "wx" });

    return newValue;
  }

  async read(name: string): Promise<Partial<T>> {
    return await this.readFile(name);
  }

  async update(name: string, value: TUpdate): Promise<Partial<T>> {
    const oldValue = await this.readFile(name);
    const newValue = this.merge(oldValue, value);

    await this.writeFile(name, newValue);

    return newValue;
  }

  async delete(name: string): Promise<void> {
    await this.deleteFile(name);
  }

  async destroy(): Promise<void> {
    const exists = await this.exists();

    if (exists) {
      await fs.unlink(this.dirPath);
    }
  }

  protected async readFile(
    name: string,
    options?: ReadOptions,
    doLock?: boolean
  ): Promise<Partial<T>> {
    const filePath = path.join(this.dirPath, name);
    const raw = await safeReadFile(filePath, options, doLock);
    const value = this.fromRaw(raw.toString());

    return value;
  }

  protected async writeFile(
    name: string,
    value: Partial<T>,
    options?: WriteOptions,
    doLock?: boolean
  ): Promise<void> {
    const raw = this.toRaw(value);
    const filePath = path.join(this.dirPath, name);

    await safeWriteFile(filePath, raw, options, doLock);
  }

  protected async deleteFile(name: string): Promise<void> {
    const filePath = path.join(this.dirPath, name);

    await safeDeleteFile(filePath, false);
  }
}
