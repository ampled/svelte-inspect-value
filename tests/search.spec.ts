import { describe, test, expect } from 'vitest'
import { buildSearchIndex, searchStructuredIndex } from '../src/lib/util/search.js'

import { DEFAULT_OPTIONS, type InspectOptions } from '../src/lib/options.svelte.js'

const options: InspectOptions = {
  ...DEFAULT_OPTIONS,
  noanimate: true,
  stores: true,
  quotes: 'single',
}

describe('search', () => {
  test('it should build an index of any given value', async () => {
    const index = buildSearchIndex({ value: ['hello'], options, key: 'test' }).sort(
      (a, b) => a.path.length - b.path.length
    )

    expect(index).toHaveLength(2)
    expect(index[0]).toBeDefined()
    expect(index[0].type).toBe('array')
    expect(index[0].path).toBe('test')
    expect(index[1].tokens?.[0]).toBe(`'hello'`)

    let searchResult = searchStructuredIndex(index, 'hello')
    expect(searchResult).toHaveLength(1)
    expect(searchResult[0]).toBeDefined()
    expect(searchResult[0]).toBe('test.0')

    searchResult = searchStructuredIndex(index, 'type:string')
    expect(searchResult).toHaveLength(1)
    expect(searchResult[0]).toBeDefined()
    expect(searchResult[0]).toBe('test.0')

    searchResult = searchStructuredIndex(index, 'path:test.0')
    expect(searchResult).toHaveLength(1)
    expect(searchResult[0]).toBeDefined()
    expect(searchResult[0]).toBe('test.0')
  })
})
