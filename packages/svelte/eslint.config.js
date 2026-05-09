import { defineConfig } from 'eslint/config'
import rootConfig from '../../eslint.config.js'
import svelte from 'eslint-plugin-svelte'
import svelteParser from 'svelte-eslint-parser'
import typescriptParser from '@typescript-eslint/parser'
import svelteConfig from './svelte.config.js'

export default defineConfig([
  // ...rootConfig,
  // ...svelte.configs['flat/recommended'],
  // ...svelte.configs['flat/prettier'],
  {
    extends: [rootConfig, svelte.configs['flat/recommended'], svelte.configs['flat/prettier']],
    basePath: '.',
    files: ['src/lib/**/*.svelte', 'src/lib/**/*.svelte.ts'],
    ignores: ['build/', '.svelte-kit/', 'dist/', '**/*.md'],
    rules: {
      'svelte/no-inner-declarations': 'off',
      'svelte/no-useless-mustaches': 'off',
      'svelte/require-store-reactive-access': 'off',
      'svelte/no-unused-props': 'off',
      'svelte/no-inspect': 'warn',
    },
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
])
