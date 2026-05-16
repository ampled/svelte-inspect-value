import core from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import memoize from 'memoize';

const hljs = core.newInstance();
hljs.configure({ classPrefix: '' });
hljs.registerLanguage('javascript', javascript);

function highlight_markup(markup: string) {
  return hljs.highlight(markup, { language: 'javascript' });
}

export const highlightMarkup = memoize(highlight_markup);
