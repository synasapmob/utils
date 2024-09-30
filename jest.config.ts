import type { Config } from "jest";

const config: Config = {
  // you may need to tell Jest how to resolve module paths
  moduleNameMapper: {
    "^utils/(.*)$": "<rootDir>/utils/$1",
  },

  preset: "ts-jest",
};

module.exports = config;
