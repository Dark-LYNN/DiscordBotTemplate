import type { Config } from 'jest';

const config: Config = {
  rootDir: './',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/*.test.ts'],
  collectCoverage: true,
  coverageDirectory: '../coverage',
  coverageReporters: ['lcov', 'text', 'html'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

};

export default config;
