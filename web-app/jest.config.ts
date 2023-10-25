import type { Config } from "jest";

import jestConfig from "../jest.config";

const config: Config = {
  ...jestConfig,
  testEnvironment: "jsdom",
};

export default config;
