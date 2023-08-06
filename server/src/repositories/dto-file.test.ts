import fs from "fs/promises";

import { vol } from "memfs";

import { DTOAlreadyExistsException, DTONotFoundException } from "../exceptions";

import {
  DTOFileRepositoryImpl,
  DummyCreateDTO,
  DummyDTO,
  DummyUpdateDTO,
} from "./__implementations__";
import { DTOFile } from "./dto-file";

jest.mock("fs/promises");

// Handle proper-lockfile
// FIXME: Bug in memfs
// See https://github.com/streamich/memfs/issues/391
// jest.mock("graceful-fs");

// Workaround: never lock files for tests
jest.mock("proper-lockfile");

describe("DTOFileRepository", () => {
  const filePath = "/file.json";
  const repository = new DTOFileRepositoryImpl(filePath);

  const sampleDTOFile: DTOFile<DummyDTO> = {
    johnDoe: {
      firstName: "John",
      lastName: "Doe",
    },
    janeDoe: {
      firstName: "Jane",
      lastName: "Doe",
    },
  };
  const sampleDTOs: DummyDTO[] = Object.entries(sampleDTOFile).map(
    ([id, data]) => ({
      ...data,
      id,
    }),
  );

  beforeEach(() => {
    vol.reset();
  });

  afterAll(() => {
    vol.reset();
  });

  describe("init", () => {
    it("should create file", async () => {
      await repository.init();

      const expected = {};
      const gotRaw = await fs.readFile(filePath, "utf8");
      const got = JSON.parse(gotRaw);

      expect(got).toEqual(expected);
    });

    it("should create file with dtos", async () => {
      await repository.init(sampleDTOs);

      const expected = sampleDTOFile;
      const gotRaw = await fs.readFile(filePath, "utf8");
      const got = JSON.parse(gotRaw);

      expect(got).toEqual(expected);
    });
  });

  describe("list", () => {
    it("should list no dto content", async () => {
      await fs.writeFile(filePath, JSON.stringify({}));

      const expected: DummyDTO[] = [];
      const got = await repository.list();

      expect(got).toEqual(expected);
    });

    it("should list dto contents", async () => {
      await fs.writeFile(filePath, JSON.stringify(sampleDTOFile));

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

      await fs.writeFile(filePath, JSON.stringify({}));

      await repository.create(dtoId, value);

      const expected = {
        [dtoId]: {
          firstName: value.firstName,
          lastName: value.lastName,
        },
      };
      const gotRaw = await fs.readFile(filePath, "utf8");
      const got = JSON.parse(gotRaw);

      expect(got).toEqual(expected);
    });

    it("should create new dto with initial dtos", async () => {
      const dtoId = "danDummy";
      const value: DummyCreateDTO = {
        firstName: "Dan",
        lastName: "Dummy",
      };

      await fs.writeFile(filePath, JSON.stringify(sampleDTOFile));

      await repository.create(dtoId, value);

      const expected = {
        ...sampleDTOFile,
        [dtoId]: {
          firstName: value.firstName,
          lastName: value.lastName,
        },
      };
      const gotRaw = await fs.readFile(filePath, "utf8");
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
        [dtoId]: {
          firstName: value.firstName,
          lastName: value.lastName,
        },
      };

      await fs.writeFile(filePath, JSON.stringify(fileContent));

      await expect(repository.create(dtoId, value)).rejects.toBeInstanceOf(
        DTOAlreadyExistsException,
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
        [dtoId]: {
          firstName: value.firstName,
          lastName: value.lastName,
        },
      };

      await fs.writeFile(filePath, JSON.stringify(fileContent));

      const expected = {
        id: dtoId,
        ...value,
      };
      const got = await repository.read(dtoId);

      expect(got).toEqual(expected);
    });

    it("should throw error if dto doesn't exist", async () => {
      const dtoId = "danDummy";

      await fs.writeFile(filePath, JSON.stringify({}));

      await expect(repository.read(dtoId)).rejects.toBeInstanceOf(
        DTONotFoundException,
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
        [dtoId]: {
          firstName: "Dan",
          lastName: "Dummy",
        },
      };

      await fs.writeFile(filePath, JSON.stringify(fileContent));

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

      await fs.writeFile(filePath, JSON.stringify({}));

      await expect(repository.update(dtoId, value)).rejects.toBeInstanceOf(
        DTONotFoundException,
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
        [dtoId]: {
          firstName: value.firstName,
          lastName: value.lastName,
        },
      };

      await fs.writeFile(filePath, JSON.stringify(fileContent));

      await repository.delete(dtoId);

      const expected = {};
      const gotRaw = await fs.readFile(filePath, "utf8");
      const got = JSON.parse(gotRaw);

      await expect(got).toEqual(expected);
    });

    it("should throw error if dto doesn't exist", async () => {
      const dtoId = "dummy";

      await fs.writeFile(filePath, JSON.stringify({}));

      await expect(repository.delete(dtoId)).rejects.toBeInstanceOf(
        DTONotFoundException,
      );
    });
  });

  describe("destroy", () => {
    it("should work", async () => {
      await expect(repository.destroy()).resolves.not.toThrow();
    });
  });
});
