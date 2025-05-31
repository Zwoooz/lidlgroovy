// @ts-check

import eslint from "@eslint/js";
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ["dist/**"]
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
    ],
    rules: {
      'max-len': ['warn', { code: 100 }],
      semi: ['error', 'always'],
    }
  }
);
