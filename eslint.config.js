import prettier from 'eslint-config-prettier'
import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'
import svelteParser from 'svelte-eslint-parser'
import globals from 'globals'
import ts from 'typescript-eslint'
import typescriptParser from '@typescript-eslint/parser'
import svelteConfig from './svelte.config.js'

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  { rules: { 'svelte/no-inner-declarations': 'off' } },
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts'],

    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: typescriptParser,
        extraFileExtensions: ['.svelte'],
        project: './tsconfig.json',
        svelteConfig,
      },
    },
  },
  {
    ignores: ['build/', '.svelte-kit/', 'dist/'],
  }
)
