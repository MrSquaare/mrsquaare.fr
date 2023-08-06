import fs from "fs/promises";
import path from "path";

import { vol } from "memfs";

import { FileRepositoryImpl } from "./__implementations__";

jest.mock("fs/promises");

// Handle proper-lockfile
// FIXME: Bug in memfs
// See https://github.com/streamich/memfs/issues/391
// jest.mock("graceful-fs");

// Workaround: never lock files for tests
jest.mock("proper-lockfile");

describe("FileRepository", () => {
  const filePath = "/file.txt";
  const repository = new FileRepositoryImpl(filePath);

  beforeEach(() => {
    vol.reset();
  });

  afterAll(() => {
    vol.reset();
  });

  describe("init", () => {
    it("should create parent dir and file", async () => {
      const filePathWithDir = "/dir" + filePath;
      const repository = new FileRepositoryImpl(filePathWithDir);
      const value = "test";

      await repository.init(value);

      const expected = value;
      const got = await fs.readFile(filePathWithDir, "utf8");

      expect(got).toBe(expected);
    });

    it("should overwrite if file exists", async () => {
      const filePathWithDir = "/dir" + filePath;
      const repository = new FileRepositoryImpl(filePathWithDir);
      const value = "test";
      const newValue = "new test";

      vol.mkdirSync(path.dirname(filePathWithDir), { recursive: true });
      await fs.writeFile(filePath, value);

      await repository.init(newValue);

      const expected = newValue;
      const got = await fs.readFile(filePathWithDir, "utf8");

      expect(got).toBe(expected);
    });
  });

  describe("create", () => {
    it("should create file", async () => {
      const value = "test";

      await repository.create(value);

      const expected = value;
      const got = await fs.readFile(filePath, "utf8");

      expect(got).toBe(expected);
    });

    it("should throw error if file exists", async () => {
      const value = "test";

      await fs.writeFile(filePath, value);

      await expect(repository.create(value)).rejects.toThrow();
    });
  });

  describe("read", () => {
    it("should read file", async () => {
      const value = "test";

      await fs.writeFile(filePath, value);

      const expected = value;
      const got = await repository.read();

      expect(got).toBe(expected);
    });

    it("should throw error if file doesn't exist", async () => {
      await expect(repository.read()).rejects.toThrow();
    });
  });

  describe("update", () => {
    it("should update file", async () => {
      const value = "test";

      await fs.writeFile(filePath, value);

      await repository.update(value);

      const expected = "testtest";
      const got = await fs.readFile(filePath, "utf8");

      expect(got).toBe(expected);
    });

    it("should throw error if file doesn't exist", async () => {
      const value = "test";

      await expect(repository.update(value)).rejects.toThrow();
    });
  });

  describe("delete", () => {
    it("should delete file", async () => {
      const value = "test";

      await fs.writeFile(filePath, value);

      await repository.delete();

      await expect(fs.access(filePath)).rejects.toThrow();
    });

    it("should throw error if file doesn't exist", async () => {
      await expect(repository.delete()).rejects.toThrow();
    });
  });

  describe("destroy", () => {
    it("should delete file", async () => {
      const value = "test";

      await fs.writeFile(filePath, value);

      await repository.destroy();

      await expect(fs.access(filePath)).rejects.toThrow();
    });

    it("should do nothing if file doesn't exist", async () => {
      await repository.destroy();

      await expect(fs.access(filePath)).rejects.toThrow();
    });
  });
});
