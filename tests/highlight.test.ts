import highlightWordsCopied from '../src/lib/util/highlight-words/index.js'
import { highlightText } from '../src/lib/util/highlight-text.js'
import { describe, test } from 'vitest'
import highlightWords from 'highlight-words'

const { log } = console

describe('highlight', () => {
  test('lib', async () => {
    console.time('lib')
    log(
      highlightWordsCopied({
        text: `it should highlight the search terms in the text` + crypto.randomUUID(),
        query: 'the',
      })
    )
    console.timeEnd('lib')
  })

  test('liboriginal', async () => {
    console.time('lib')
    log(
      highlightWords({
        text: `it should highlight the search terms in the text` + crypto.randomUUID(),
        query: 'the',
      })
    )
    console.timeEnd('lib')
  })

  test('it should highlight the search terms in the text', async () => {
    console.time('diy')
    log(
      highlightText(`it should highlight the search terms in the text` + crypto.randomUUID(), [
        { value: `the`, exact: false },
      ])
    )
    console.timeEnd('diy')
  })
})
