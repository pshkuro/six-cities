module.exports = {
  rootDir: `./src`,
  setupFiles: [`./setup-tests.js`, `core-js`],
  collectCoverage: true,
  coverageReporters: [`lcov`, `text`],
  coverageDirectory: `test-coverage`,
  coverageThreshold: {
    "global": {
      "branches": 0,
      "functions": 0,
      "lines": 0,
      "statements": 0
    }
  },
  transform: {
    "^.+\\.tsx?$": `ts-jest`,
    "^.+\\.js?$": `babel-jest`,
  },
  testRegex: `.test.(js?|jsx?|tsx?)$`,
  moduleFileExtensions: [
    `ts`,
    `tsx`,
    `js`,
    `jsx`,
    `json`,
    `node`
  ],

};
