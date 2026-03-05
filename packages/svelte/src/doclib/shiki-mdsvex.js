import { createHighlighter } from 'shiki/bundle/web'
import theme from './theme-copy.js'

const highlighter = createHighlighter({
  langs: ['svelte', 'javascript', 'css'],
  themes: [
    //@ts-expect-error yeh
    theme,
  ],
})

export async function highlight(code = '', language = 'svelte') {
  const hl = await highlighter
  return hl.codeToHtml(code, { lang: language, theme: 'inspect' })
}
