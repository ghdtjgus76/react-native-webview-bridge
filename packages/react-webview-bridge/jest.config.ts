module.exports = {
  displayName: "react",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)?$": "babel-jest",
  },
  testMatch: ["<rootDir>/src/__tests__/**/*.test.(js|jsx|ts|tsx)"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};
