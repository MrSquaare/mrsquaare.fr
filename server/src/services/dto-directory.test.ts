/* eslint-disable jest/no-conditional-expect */

import fs from "fs/promises";

import { vol } from "memfs";

import { APIException } from "../exceptions";
import {
  DTODirectoryRepositoryImpl,
  DummyDTO,
} from "../repositories/__implementations__";

import { DTODirectoryServiceImpl, dummySchema } from "./__implementations__";

jest.mock("fs/promises");

// Handle proper-lockfile
// FIXME: Bug in memfs
// See https://github.com/streamich/memfs/issues/391
// jest.mock("graceful-fs");

// Workaround: never lock files for tests
jest.mock("proper-lockfile");

describe("DTODirectoryService", () => {
  const dirPath = "/dir";
  const repository = new DTODirectoryRepositoryImpl(dirPath, ".json");
  const service = new DTODirectoryServiceImpl(repository, dummySchema);

  const validDTO: Omit<DummyDTO, "id"> = {
    firstName: "John",
    lastName: "Doe",
  };

  const invalidDTO = {
    firstName: "John",
    // lastName: "Doe",
  } as Omit<DummyDTO, "id">;

  const validDTODirectory = {
    johnDoe: {
      firstName: "John",
      lastName: "Doe",
    },
    janeDoe: {
      firstName: "Jane",
      lastName: "Doe",
    },
  };

  const invalidDTODirectory = {
    johnDoe: {
      firstName: "John",
      // lastName: "Doe",
    },
    janeDoe: {
      firstName: "Jane",
      lastName: "Doe",
    },
  };

  const jsonErrorFile = "{ invalid json";

  beforeEach(async () => {
    vol.reset();
    await repository.init();
  });

  afterAll(() => {
    vol.reset();
  });

  describe("init", () => {
    it("should work", async () => {
      await expect(service.init()).resolves.not.toThrow();
    });
  });

  describe("list", () => {
    it("should return a list of dtos", async () => {
      await expect(service.list()).resolves.toBeInstanceOf(Array);
    });

    it("should throw an invalid resource error", async () => {
      const filePath = `${dirPath}/johnDoe.json`;

      await fs.writeFile(filePath, JSON.stringify(invalidDTODirectory));

      expect.assertions(3);

      await service.list().catch((e) => {
        expect(e).toBeInstanceOf(APIException);
        expect(e.status).toBe(500);
        expect(e.message).toBe("Resource is invalid");
      });
    });

    it("should throw json error", async () => {
      const filePath = `${dirPath}/johnDoe.json`;

      await fs.writeFile(filePath, jsonErrorFile);

      expect.assertions(2);

      await service.list().catch((e) => {
        expect(e).toBeInstanceOf(Error);
        expect(e.name).toBe("SyntaxError");
      });
    });
  });

  describe("create", () => {
    it("should throw an already exists resource error", async () => {
      const filePath = `${dirPath}/johnDoe.json`;

      await fs.writeFile(filePath, JSON.stringify(validDTODirectory));

      expect.assertions(3);

      await service.create("johnDoe", validDTO).catch((e) => {
        expect(e).toBeInstanceOf(APIException);
        expect(e.status).toBe(422);
        expect(e.message).toBe("Resource already exists");
      });
    });

    it("should throw an invalid resource error", async () => {
      expect.assertions(3);

      await service.create("johnDoe", invalidDTO).catch((e) => {
        expect(e).toBeInstanceOf(APIException);
        expect(e.status).toBe(500);
        expect(e.message).toBe("Resource is invalid");
      });
    });
  });

  describe("read", () => {
    it("should throw an not found resource error", async () => {
      expect.assertions(3);

      await service.read("johnDoe").catch((e) => {
        expect(e).toBeInstanceOf(APIException);
        expect(e.status).toBe(404);
        expect(e.message).toBe("Resource not found");
      });
    });

    it("should throw an invalid resource error", async () => {
      const filePath = `${dirPath}/johnDoe.json`;

      await fs.writeFile(filePath, JSON.stringify(invalidDTODirectory));

      expect.assertions(3);

      await service.read("johnDoe").catch((e) => {
        expect(e).toBeInstanceOf(APIException);
        expect(e.status).toBe(500);
        expect(e.message).toBe("Resource is invalid");
      });
    });

    it("should throw json error", async () => {
      const filePath = `${dirPath}/johnDoe.json`;

      await fs.writeFile(filePath, jsonErrorFile);

      expect.assertions(2);

      await service.read("johnDoe").catch((e) => {
        expect(e).toBeInstanceOf(Error);
        expect(e.name).toBe("SyntaxError");
      });
    });
  });

  describe("update", () => {
    it("should throw an not found resource error", async () => {
      expect.assertions(3);

      await service.update("johnDoe", { firstName: "John" }).catch((e) => {
        expect(e).toBeInstanceOf(APIException);
        expect(e.status).toBe(404);
        expect(e.message).toBe("Resource not found");
      });
    });

    it("should throw and invalid resource error", async () => {
      const filePath = `${dirPath}/johnDoe.json`;

      await fs.writeFile(filePath, JSON.stringify(invalidDTODirectory));

      expect.assertions(3);

      await service.update("johnDoe", { firstName: "John" }).catch((e) => {
        expect(e).toBeInstanceOf(APIException);
        expect(e.status).toBe(500);
        expect(e.message).toBe("Resource is invalid");
      });
    });

    it("should throw json error", async () => {
      const filePath = `${dirPath}/johnDoe.json`;

      await fs.writeFile(filePath, jsonErrorFile);

      expect.assertions(2);

      await service.update("johnDoe", { firstName: "John" }).catch((e) => {
        expect(e).toBeInstanceOf(Error);
        expect(e.name).toBe("SyntaxError");
      });
    });
  });

  describe("delete", () => {
    it("should throw an not found resource error", async () => {
      expect.assertions(3);

      await service.delete("johnDoe").catch((e) => {
        expect(e).toBeInstanceOf(APIException);
        expect(e.status).toBe(404);
        expect(e.message).toBe("Resource not found");
      });
    });
  });

  describe("destroy", () => {
    it("should work", async () => {
      await expect(service.destroy()).resolves.not.toThrow();
    });
  });
});
