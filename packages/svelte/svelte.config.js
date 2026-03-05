import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex } from 'mdsvex'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkHeadingId from 'remark-heading-id'
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

/** @type {import('rehype-autolink-headings').Options} */
const autoLinkOptions = {
  behavior: 'prepend',
  test: ['h1', 'h2', 'h3'],
}

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  remarkPlugins: [[remarkHeadingId, { defaults: true, uniqueDefaults: true }]],
  rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, autoLinkOptions]],
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
    alias: {
      $lib: './src/lib',
      $doclib: './src/doclib',
    },
    adapter: adapter(),
    prerender: {
      handleHttpError: 'warn',
      handleMissingId: 'warn',
    },
  },
  compilerOptions: { sourcemap: true, runes: true },
  extensions: ['.svelte', '.md', '.svx'],
}

export default config
