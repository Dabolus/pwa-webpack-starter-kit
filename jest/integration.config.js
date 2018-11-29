module.exports = {
  preset: 'jest-puppeteer',
  rootDir: '..',
  transform: {
    '.+\\.[tj]s$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  moduleNameMapper: {},
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: [
    '<rootDir>/test/integration/**/*.ts',
  ],
};
