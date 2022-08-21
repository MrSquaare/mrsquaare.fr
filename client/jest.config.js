import jestConfig from "../jest.config";

module.exports = {
  ...jestConfig,
  testEnvironment: "jsdom",
};
