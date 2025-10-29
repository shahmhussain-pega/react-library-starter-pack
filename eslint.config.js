// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  // Base JS rules
  js.configs.recommended,

  // TypeScript support
  ...tseslint.configs.recommended,

  {
    ignores: ['dist', 'build', 'node_modules'],
  },

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier,
    },
    rules: {
      // Recommended React + Hooks rules
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Prettier integration
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],

      // Disables redundant React imports
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
];
