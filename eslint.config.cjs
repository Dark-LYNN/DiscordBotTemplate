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
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // Ignore variables starting with '_'
          varsIgnorePattern: '^_', // Ignore variables starting with '_'
          caughtErrorsIgnorePattern: '^_', // Ignore caught errors with '_'
        },
      ],
      indent: ['error', 2, { SwitchCase: 1 }],
      semi: ['error', 'always'],
    },
  },
];
