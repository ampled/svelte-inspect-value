import { parseSearchTerms } from '$lib/util/search.js'
import { highlightText } from '../src/lib/util/highlight-text.js'
import { describe, test, expect } from 'vitest'

describe('highlight', () => {
  test('it should highlight the search terms in the text', async () => {
    const chunks = highlightText(`it should highlight the search terms in the text`, [
      { value: `the`, exact: false },
    ])

    expect(chunks.some((chunk) => chunk.text === 'the' && chunk.match)).toBeTruthy()
  })

  test('it should highlight exact matches with strings wrapped in single quotes', async () => {
    const value = `'numbers are cool'`
    const query = `"'numbers are cool'"`

    const terms = parseSearchTerms(query, false)

    const chunks = highlightText(value, terms)

    expect(chunks).toHaveLength(1)
    expect(chunks[0].text).toBe(value)

    // expect(chunks.some((chunk) => chunk.text === 'the' && chunk.match)).toBeTruthy()
  })
})
