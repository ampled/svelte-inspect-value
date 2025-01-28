import memoize from 'p-memoize'
import { createHighlighter, type BundledLanguage } from 'shiki/bundle/web'

const highlighter = createHighlighter({
  langs: ['svelte', 'javascript', 'css'],
  themes: ['dracula'],
})

export async function _highlight(code: string, language: BundledLanguage = 'svelte') {
  const hl = await highlighter
  return hl.codeToHtml(code, { lang: language, theme: 'dracula' })
}

export const highlight = memoize(_highlight)
