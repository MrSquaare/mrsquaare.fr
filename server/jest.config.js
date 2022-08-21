const jestConfig = require("../jest.config");

module.exports = {
  ...jestConfig,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  testEnvironment: "node",
};
