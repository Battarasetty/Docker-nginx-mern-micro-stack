import js from '@eslint/js';
import jsx from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  {
    files: ['**/*.test.js'],
    languageOptions: {
      globals: {
        jest: true
      }
    },
    plugins: {
      react: jsx
    },
    rules: {
      // your rules here
    }
  }
];
