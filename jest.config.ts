import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx"],
  transform: {},
  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: "./tests/tsconfig.test.json"
    },
  },
};

export default config;

