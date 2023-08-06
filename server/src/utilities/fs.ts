import fs from "fs/promises";

import { lock } from "proper-lockfile";

import { ReadOptions, WriteOptions } from "../types";

const lockOperation = async <T>(
  filePath: string,
  callback: () => Promise<T>,
  doLock = true,
): Promise<T> => {
  const release = doLock ? await lock(filePath) : undefined;

  const result = await callback();

  if (release) {
    release();
  }

  return result;
};

export const safeReadFile = async (
  filePath: string,
  options?: ReadOptions,
  doLock = true,
): Promise<string> => {
  const raw = await lockOperation(
    filePath,
    async () => {
      return fs.readFile(filePath, options);
    },
    doLock,
  );

  return raw.toString();
};

export const safeWriteFile = async (
  filePath: string,
  data: string,
  options?: WriteOptions,
  doLock = true,
): Promise<void> => {
  await lockOperation(
    filePath,
    async () => {
      return fs.writeFile(filePath, data, options);
    },
    doLock,
  );
};

export const safeDeleteFile = async (
  filePath: string,
  doLock = true,
): Promise<void> => {
  await lockOperation(
    filePath,
    async () => {
      return fs.unlink(filePath);
    },
    doLock,
  );
};
