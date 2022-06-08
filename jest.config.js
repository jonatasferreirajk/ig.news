module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  setupFilesAfterEnv: [
    //"<rootDir>/src/tests/setupTests.ts"
    "@testing-library/jest-dom/extend-expect",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(scss|css|sass)$": "identity-obj-proxy",
  },
  collectCoverages: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.spec.tsx",
    "!src/**/*_app.tsx",
    "!src/**/*_document.tsx",
  ],
  coverageReporters: ["lcov","json"],
};
