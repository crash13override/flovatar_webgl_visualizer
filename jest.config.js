// jest.config.js
// https://stackoverflow.com/questions/59116570/jest-cannot-find-module-with-typescript-paths-in-ci
// https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping/

const { pathsToModuleNameMapper } = require("ts-jest");
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions: rco } = require("./tsconfig.json");

module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(rco.paths, {
      prefix: "<rootDir>/../",
    }),
  },
};
