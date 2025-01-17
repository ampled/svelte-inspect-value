import { sveltekit } from '@sveltejs/kit/vite'
import { svelteTesting } from '@testing-library/svelte/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    sveltekit(),
    svelteTesting({
      // disable auto cleanup
      autoCleanup: false,
      // disable browser resolution condition
      resolveBrowser: true,
    }),
  ],
  // build: {
  //   minify: 'terser',
  //   terserOptions: {
  //     keep_classnames: true,
  //   },
  // },
  test: {
    environment: 'happy-dom',
    setupFiles: ['./vitest-setup.ts'],
    include: ['tests/**/*.{test,spec}.{js,ts}', 'tests/**/*.svelte.test.{js,ts}'],
  },
})
