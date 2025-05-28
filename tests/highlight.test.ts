import { highlightText } from '../src/lib/util/highlight-text.js'
import { describe, test, expect } from 'vitest'

describe('highlight', () => {
  test('it should highlight the search terms in the text', async () => {
    const chunks = highlightText(`it should highlight the search terms in the text`, [
      { value: `the`, exact: false },
    ])

    expect(chunks.some((chunk) => chunk.text === 'the' && chunk.match)).toBeTruthy()
  })
})
