import type { JestConfigWithTsJest } from 'ts-jest'

import { defaults as tsjPreset } from 'ts-jest/presets'

export default {
   collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!src/**/errors/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    ...tsjPreset.transform,
  },
} as JestConfigWithTsJest
