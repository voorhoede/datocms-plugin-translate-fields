const ignoreNodeModulesPatterns = [
  'lodash-es',
  'mdast-util-to-string',
  'mdast-util-from-markdown',
  'mdast-util-to-markdown',
  'micromark',
  'micromark-util-combine-extensions',
  'decode-named-character-reference',
  'character-entities',
  'unist-util-stringify-position',
  'zwitch',
  'longest-streak',
  'unist-util-visit',
  'unist-util-is',
  'mdast-util-phrasin',
]

const config = {
  testMatch: ['**/*.test.ts?(x)'],
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    `node_modules/(?!(${ignoreNodeModulesPatterns.join('|')}))`,
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
}

module.exports = config
