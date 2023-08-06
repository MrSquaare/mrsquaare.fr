import fs from "fs/promises";

import { vol } from "memfs";

import { DirectoryRepositoryImpl } from "./__implementations__";

jest.mock("fs/promises");

// Handle proper-lockfile
// FIXME: Bug in memfs
// See https://github.com/streamich/memfs/issues/391
// jest.mock("graceful-fs");

// Workaround: never lock files for tests
jest.mock("proper-lockfile");

describe("DirectoryRepository", () => {
  const dirPath = "/dir";
  const repository = new DirectoryRepositoryImpl(dirPath);

  beforeEach(() => {
    vol.reset();
    vol.mkdirSync(dirPath, { recursive: true });
  });

  afterAll(() => {
    vol.reset();
  });

  describe("init", () => {
    it("should create parent dir and files", async () => {
      const dirPathWithParentDir = "/parent" + dirPath;
      const repository = new DirectoryRepositoryImpl(dirPathWithParentDir);

      const values = [
        ["file1.txt", "test 1"],
        ["file2.txt", "test 2"],
      ] as [string, string][];

      await repository.init(values);

      await expect(fs.access(dirPathWithParentDir)).resolves.not.toThrow();

      const got1 = await fs.readFile(
        `${dirPathWithParentDir}/file1.txt`,
        "utf8",
      );
      const got2 = await fs.readFile(
        `${dirPathWithParentDir}/file2.txt`,
        "utf8",
      );

      expect(got1).toBe("test 1");
      expect(got2).toBe("test 2");
    });

    it("should do nothing if dir exists", async () => {
      const dirPathWithParentDir = "/parent" + dirPath;
      const repository = new DirectoryRepositoryImpl(dirPathWithParentDir);

      vol.mkdirSync(dirPathWithParentDir, { recursive: true });

      await fs.writeFile(`${dirPathWithParentDir}/file1.txt`, "test 1");
      await fs.writeFile(`${dirPathWithParentDir}/file2.txt`, "test 2");

      const values = [
        ["file1.txt", "new test 1"],
        ["file2.txt", "new test 2"],
      ] as [string, string][];

      await repository.init(values);

      await expect(fs.access(dirPathWithParentDir)).resolves.not.toThrow();

      const got1 = await fs.readFile(
        `${dirPathWithParentDir}/file1.txt`,
        "utf8",
      );
      const got2 = await fs.readFile(
        `${dirPathWithParentDir}/file2.txt`,
        "utf8",
      );

      expect(got1).toBe("new test 1");
      expect(got2).toBe("new test 2");
    });
  });

  describe("listNames", () => {
    it("should list no file name", async () => {
      const expected: string[] = [];
      const got = await repository.listNames();

      expect(got).toEqual(expected);
    });

    it("should list file names", async () => {
      await fs.writeFile(dirPath + "/file1.txt", "test");
      await fs.writeFile(dirPath + "/file2.txt", "test");

      const expected: string[] = ["file1.txt", "file2.txt"];
      const got = await repository.listNames();

      expect(got).toEqual(expected);
    });
  });

  describe("list", () => {
    it("should list no file content", async () => {
      const expected: string[] = [];
      const got = await repository.list();

      expect(got).toEqual(expected);
    });

    it("should list file contents", async () => {
      await fs.writeFile(dirPath + "/file1.txt", "test");
      await fs.writeFile(dirPath + "/file2.txt", "test");

      const expected: string[] = ["test", "test"];
      const got = await repository.list();

      expect(got).toEqual(expected);
    });
  });

  describe("create", () => {
    it("should create file", async () => {
      const fileName = "file.txt";
      const filePath = dirPath + "/" + fileName;
      const value = "test";

      await repository.create(fileName, value);

      const expected = value;
      const got = await fs.readFile(filePath, "utf8");

      expect(got).toBe(expected);
    });

    it("should throw error if file exists", async () => {
      const fileName = "file.txt";
      const filePath = dirPath + "/" + fileName;
      const value = "test";

      await fs.writeFile(filePath, value);

      await expect(repository.create(fileName, value)).rejects.toThrow();
    });
  });

  describe("read", () => {
    it("should read file", async () => {
      const fileName = "file.txt";
      const filePath = dirPath + "/" + fileName;
      const value = "test";

      await fs.writeFile(filePath, value);

      const expected = value;
      const got = await repository.read(fileName);

      expect(got).toBe(expected);
    });

    it("should throw error if file doesn't exist", async () => {
      const fileName = "file.txt";

      await expect(repository.read(fileName)).rejects.toThrow();
    });
  });

  describe("update", () => {
    it("should update file", async () => {
      const fileName = "file.txt";
      const filePath = dirPath + "/" + fileName;
      const value = "test";

      await fs.writeFile(filePath, value);

      await repository.update(fileName, value);

      const expected = "testtest";
      const got = await fs.readFile(filePath, "utf8");

      expect(got).toBe(expected);
    });

    it("should throw error if file doesn't exist", async () => {
      const fileName = "file.txt";
      const value = "test";

      await expect(repository.update(fileName, value)).rejects.toThrow();
    });
  });

  describe("delete", () => {
    it("should delete file", async () => {
      const fileName = "file.txt";
      const filePath = dirPath + "/" + fileName;
      const value = "test";

      await fs.writeFile(filePath, value);

      await repository.delete(fileName);

      await expect(fs.access(filePath)).rejects.toThrow();
    });

    it("should throw error if file doesn't exist", async () => {
      const fileName = "file.txt";

      await expect(repository.delete(fileName)).rejects.toThrow();
    });
  });

  describe("destroy", () => {
    it("should delete directory", async () => {
      await repository.destroy();

      await expect(fs.access(dirPath)).rejects.toThrow();
    });

    it("should do nothing if directory doesn't exist", async () => {
      vol.unlinkSync(dirPath);

      await repository.destroy();

      await expect(fs.access(dirPath)).rejects.toThrow();
    });
  });
});
