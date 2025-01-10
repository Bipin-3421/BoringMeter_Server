import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  transformIgnorePatterns: ['node_modules'],
  setupFiles: ['<rootDir>/test/setup.ts'],
};

export default config;
