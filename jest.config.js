module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!**/domain/**',
    '!**/common/**',
    '!**/config/**',
    '!**/main.ts',
    '!**/**.module.ts'
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  }
}
