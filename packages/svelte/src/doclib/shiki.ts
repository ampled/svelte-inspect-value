import memoize from 'p-memoize'
import { createHighlighter, type BundledLanguage } from 'shiki/bundle/web'
import theme from './theme.js'

const highlighter = createHighlighter({
  langs: ['svelte', 'javascript', 'css'],
  themes: [
    //@ts-expect-error yeh
    theme,
  ],
})

export async function _highlight(code: string, language: BundledLanguage = 'svelte') {
  const hl = await highlighter
  return hl.codeToHtml(code, { lang: language, theme: 'inspect' })
}

export const highlight = memoize(_highlight)
