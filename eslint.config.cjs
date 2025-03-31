const js = require('@eslint/js');
const ts = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: { '@typescript-eslint': ts },
    rules: {
      indent: ['error', 2, { SwitchCase: 1 }],
      semi: ['error', 'always'],
    },
  },
];
