import fs from "fs/promises";

import { vol } from "memfs";

import { DTOAlreadyExistsException, DTONotFoundException } from "../exceptions";

import {
  DTODirectoryRepositoryImpl,
  DummyCreateDTO,
  DummyDTO,
  DummyUpdateDTO,
} from "./__implementations__";
import { DTODirectory } from "./dto-directory";

jest.mock("fs/promises");

// Handle proper-lockfile
// FIXME: Bug in memfs
// See https://github.com/streamich/memfs/issues/391
// jest.mock("graceful-fs");

// Workaround: never lock files for tests
jest.mock("proper-lockfile");

describe("DTOFileRepository", () => {
  const dirPath = "/dir";
  const repository = new DTODirectoryRepositoryImpl(dirPath, ".json");

  const sampleDTODirectoryIds = ["janeDoe", "johnDoe"];
  const sampleDTODirectoryContents: DTODirectory<DummyDTO>[] = [
    {
      firstName: "Jane",
      lastName: "Doe",
    },
    {
      firstName: "John",
      lastName: "Doe",
    },
  ];
  const sampleDTOs: DummyDTO[] = sampleDTODirectoryIds.map((id, index) => ({
    ...sampleDTODirectoryContents[index],
    id,
  }));

  beforeEach(() => {
    vol.reset();
    vol.mkdirpSync(dirPath);
  });

  afterAll(() => {
    vol.reset();
  });

  describe("init", () => {
    it("should create directory", async () => {
      vol.unlinkSync(dirPath);

      await repository.init();

      await expect(fs.access(dirPath)).resolves.not.toThrow();
    });

    it("should create directory with dtos", async () => {
      vol.unlinkSync(dirPath);

      await repository.init(sampleDTOs);

      await expect(fs.access(dirPath)).resolves.not.toThrow();

      await Promise.all(
        sampleDTOs.map(async ({ id, ...data }) => {
          const filePath = `${dirPath}/${id}.json`;
          const gotRaw = await fs.readFile(filePath, "utf8");
          const got = JSON.parse(gotRaw);

          expect(got).toEqual(data);
        })
      );
    });
  });

  describe("list", () => {
    it("should list no dto content", async () => {
      const expected: DummyDTO[] = [];
      const got = await repository.list();

      expect(got).toEqual(expected);
    });

    it("should list dto contents", async () => {
      await Promise.all(
        sampleDTODirectoryIds.map((id, index) =>
          fs.writeFile(
            `${dirPath}/${id}.json`,
            JSON.stringify(sampleDTODirectoryContents[index])
          )
        )
      );

      const expected = sampleDTOs;
      const got = await repository.list();

      expect(got).toEqual(expected);
    });
  });

  describe("create", () => {
    it("should create new dto with no initial dto", async () => {
      const dtoId = "danDummy";
      const value: DummyCreateDTO = {
        firstName: "Dan",
        lastName: "Dummy",
      };

      await repository.create(dtoId, value);

      const expected = {
        firstName: value.firstName,
        lastName: value.lastName,
      };
      const gotRaw = await fs.readFile(`${dirPath}/${dtoId}.json`, "utf8");
      const got = JSON.parse(gotRaw);

      expect(got).toEqual(expected);
    });

    it("should create new dto with initial dtos", async () => {
      await Promise.all(
        sampleDTODirectoryIds.map((id, index) =>
          fs.writeFile(
            `${dirPath}/${id}.json`,
            JSON.stringify(sampleDTODirectoryContents[index])
          )
        )
      );

      const dtoId = "danDummy";
      const value: DummyCreateDTO = {
        firstName: "Dan",
        lastName: "Dummy",
      };

      await repository.create(dtoId, value);

      const expected = {
        firstName: value.firstName,
        lastName: value.lastName,
      };
      const gotRaw = await fs.readFile(`${dirPath}/${dtoId}.json`, "utf8");
      const got = JSON.parse(gotRaw);

      expect(got).toEqual(expected);
    });

    it("should throw error if dto exists", async () => {
      const dtoId = "danDummy";
      const value: DummyCreateDTO = {
        firstName: "Dan",
        lastName: "Dummy",
      };
      const fileContent = {
        firstName: value.firstName,
        lastName: value.lastName,
      };

      await fs.writeFile(
        `${dirPath}/${dtoId}.json`,
        JSON.stringify(fileContent)
      );

      await expect(repository.create(dtoId, value)).rejects.toBeInstanceOf(
        DTOAlreadyExistsException
      );
    });
  });

  describe("read", () => {
    it("should read dto", async () => {
      const dtoId = "danDummy";
      const value: DummyCreateDTO = {
        firstName: "Dan",
        lastName: "Dummy",
      };
      const fileContent = {
        firstName: value.firstName,
        lastName: value.lastName,
      };

      await fs.writeFile(
        `${dirPath}/${dtoId}.json`,
        JSON.stringify(fileContent)
      );

      const expected = {
        id: dtoId,
        ...value,
      };
      const got = await repository.read(dtoId);

      expect(got).toEqual(expected);
    });

    it("should throw error if dto doesn't exist", async () => {
      const dtoId = "danDummy";

      await expect(repository.read(dtoId)).rejects.toBeInstanceOf(
        DTONotFoundException
      );
    });
  });

  describe("update", () => {
    it("should update dto", async () => {
      const dtoId = "danDummy";
      const value: DummyUpdateDTO = {
        firstName: "Katy",
      };
      const fileContent = {
        firstName: "Dan",
        lastName: "Dummy",
      };

      await fs.writeFile(
        `${dirPath}/${dtoId}.json`,
        JSON.stringify(fileContent)
      );

      const expected = {
        id: dtoId,
        firstName: value.firstName,
        lastName: "Dummy",
      };
      const got = await repository.update(dtoId, value);

      expect(got).toEqual(expected);
    });

    it("should throw error if dto doesn't exist", async () => {
      const dtoId = "danDummy";
      const value: DummyUpdateDTO = {
        firstName: "Katy",
      };

      await expect(repository.update(dtoId, value)).rejects.toBeInstanceOf(
        DTONotFoundException
      );
    });
  });

  describe("delete", () => {
    it("should delete dto", async () => {
      const dtoId = "danDummy";
      const value: DummyCreateDTO = {
        firstName: "Dan",
        lastName: "Dummy",
      };
      const fileContent = {
        firstName: value.firstName,
        lastName: value.lastName,
      };

      await fs.writeFile(
        `${dirPath}/${dtoId}.json`,
        JSON.stringify(fileContent)
      );

      await repository.delete(dtoId);

      await expect(fs.access(`${dirPath}/${dtoId}.json`)).rejects.toThrow();
    });

    it("should throw error if dto doesn't exist", async () => {
      const dtoId = "dummy";

      await expect(repository.delete(dtoId)).rejects.toBeInstanceOf(
        DTONotFoundException
      );
    });
  });

  describe("destroy", () => {
    it("should work", async () => {
      await expect(repository.destroy()).resolves.not.toThrow();
    });
  });
});
