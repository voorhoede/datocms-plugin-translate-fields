const config = {
  testMatch: ['**/*.test.ts?(x)'],
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!lodash-es/.*)'],
}

module.exports = config
