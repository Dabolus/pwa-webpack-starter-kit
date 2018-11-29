module.exports = {
  rootDir: '..',
  testEnvironment: '@skatejs/ssr/jest',
  transform: {
    '.+\\.[tj]s$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules\\/(?!(@polymer|lit-html|pwa-helpers)).*/',
  ],
  moduleNameMapper: {
    '.+\\.styles': '<rootDir>/test/mocks/styles.ts',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@actions/(.*)': '<rootDir>/src/actions/$1',
    '@reducers/(.*)': '<rootDir>/src/reducers/$1',
    '@store': '<rootDir>/src/store',
  },
  moduleFileExtensions: ['ts', 'js', 'scss', 'sass', 'css', 'ejs', 'html'],
  testMatch: [
    '<rootDir>/test/unit/**/*.ts',
  ],
};
