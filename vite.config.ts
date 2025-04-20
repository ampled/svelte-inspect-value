import { sveltekit } from '@sveltejs/kit/vite'
import { svelteTesting } from '@testing-library/svelte/vite'
import { defineConfig } from 'vitest/config'

import { createLogger } from 'vite'

const logger = createLogger()
const loggerWarn = logger.warn

logger.warn = (msg, options) => {
  if (msg.includes('Use of eval in')) return
  loggerWarn(msg, options)
}

export default defineConfig({
  customLogger: logger,
  plugins: [
    sveltekit(),
    svelteTesting({
      // disable auto cleanup
      autoCleanup: false,
      // disable browser resolution condition
      resolveBrowser: true,
    }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      keep_classnames: true,
      keep_fnames: true,
    },
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['./vitest-setup.ts'],
    include: ['tests/**/*.{test,spec}.{js,ts}', 'tests/**/*.svelte.test.{js,ts}'],
  },
})
