import eslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default [
  {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      project: "./tsconfig.json",
    },

    plugins: {
      "@typescript-eslint": eslint,
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
    ],

    ignorePatterns: [
      "node_modules/*",
      "dist/*",
      ".github/*",
      ".git/*",
      "scripts/*",
    ],
    ignores: [
      "*/node_modules/*",
      "*dist/**/*.d.ts",
      "./.github/*",
      "scripts/*"
    ],
    files: [
      "**/*.ts"
    ],
    rules: {
      indent: [
        "error",
        2,
        {
          SwitchCase: 1
        }
      ],
      semi: ["error", "always"],
    }
  },
  eslintConfigPrettier,
];