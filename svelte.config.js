import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex } from 'mdsvex'
import { highlight } from './src/doclib/shiki-mdsvex.js'

/**
 *
 * @param {string} str
 * @returns {string}
 */
const escapeSvelte = (str) =>
  str
    .replace(/[{}`]/g, (c) => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' })[c])
    .replace(/\\([trn])/g, '&#92;$1')

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  layout: {
    docs: './src/routes/reference/+layout.svelte',
  },
  extensions: ['.md', '.svx'],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const output = await highlight(code, lang)

      const html = escapeSvelte(output)
      return `{@html \`${html}\` }`
    },
  },
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
  kit: {
    adapter: adapter(),
    prerender: {
      handleHttpError: 'warn',
      handleMissingId: 'warn',
    },
  },
  compilerOptions: { sourcemap: false },
  extensions: ['.svelte', '.md', '.svx'],
}

export default config
