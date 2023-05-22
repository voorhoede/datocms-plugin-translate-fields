module.exports = {
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$':
      'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!lodash-es/.*)'],
}
