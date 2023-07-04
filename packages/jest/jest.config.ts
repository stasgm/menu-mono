/**
 * Execute all tests
 */

import { testRoot, singleUnitTestMatch } from './constants';

export const baseConfig = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: singleUnitTestMatch,
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  rootDir: `${process.env.JEST_LIB_UNDER_TEST || testRoot}`,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  moduleFileExtensions: ['ts', 'js', 'json'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'package.json',
    'package-lock.json',
    'index.ts',
    'coverage',
    '*.mock.ts',
  ],
};
