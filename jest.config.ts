export default {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!src/**/errors/*.ts'],
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.(t|j)s?$': ['@swc/jest'],
  },
  preset: '@shelf/jest-mongodb',
  setupFiles: ['dotenv/config']
}
