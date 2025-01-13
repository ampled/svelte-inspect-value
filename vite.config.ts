import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [sveltekit()],
  // build: {
  //   minify: 'terser',
  //   terserOptions: {
  //     keep_classnames: true,
  //   },
  // },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
})
