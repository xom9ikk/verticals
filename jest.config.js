const tsconfig = require("./tsconfig.json");
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper,
  moduleDirectories: ["node_modules", "src"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 70,
      lines: 80,
    },
  },
};
