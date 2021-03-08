const tsconfig = require("./tsconfig.json");
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  // setupFilesAfterEnv: ["<rootDir>/internals/jestSettings.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper,
  // moduleNameMapper: {
  // // https://jestjs.io/docs/en/webpack#handling-static-assets
  // //   "\\.(css|less)$": "<rootDir>/internals/__mocks__/styleMock.js",
  // //   "^@/(.*)$": "<rootDir>/src/$1",
  // },
  // testPathIgnorePatterns: ["e2e"],
  moduleDirectories: ["node_modules", "src"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 70,
      lines: 80,
    },
  },
};
