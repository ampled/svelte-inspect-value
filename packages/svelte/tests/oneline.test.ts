import { cleanup, screen } from '@testing-library/svelte'
import { afterAll, expect, test } from 'vitest'
import { renderInspect } from './util/index.js'

afterAll(() => {
  cleanup()
})

const fixtures = [
  { value: undefined, expectedType: 'undefined' },
  { value: null, expectedType: 'null' },
  { value: 'string', expectedType: 'str', expectedValue: `'string'`, expectedCount: '6 chars' },
  { value: 123, expectedType: 'num', expectedValue: '123' },
  { value: false, expectedType: 'bool', expectedValue: 'false' },
  { value: 1n, expectedType: 'bigint', expectedValue: '1n' },
  { value: /r(e+)gExp/, expectedType: 'regex', expectedValue: '/r(e+)gExp/' },
  { value: Symbol('test'), expectedType: 'symbol', expectedValue: 'Symbol(test)' },
  { value: () => void 0, expectedType: 'fn', expectedValue: '() => void 0' },
  { value: async () => void 0, expectedType: 'async fn', expectedValue: '() => void 0' },
  {
    value: eval(`(function* generator() { yield 'a' })`),
    expectedType: 'fn*',
    expectedValue: `generator() { yield 'a' }`,
  },
  {
    value: eval(`(async function* generator() { yield undefined })`),
    expectedType: 'async fn*',
    expectedValue: 'generator() { yield undefined }',
  },
]

test('it can display simple values', async () => {
  const { unmount, rerender } = renderInspect({
    value: undefined,
    showLength: true,
    showTypes: true,
  })

  for (const { value, expectedType, expectedValue, expectedCount } of fixtures) {
    try {
      await rerender({
        value,
        showLength: expectedCount != null,
        showTypes: true,
        name: expectedType,
      })
      // check type
      const type = screen.getAllByTestId('type')[0]
      expect(type).toHaveTextContent(expectedType)
      // check count
      if (expectedCount) {
        const count = screen.getByTestId('count')
        expect(count).toHaveTextContent(expectedCount)
      }
      // check value
      if (expectedValue) {
        const valueElement = screen.getAllByTestId('value')[0]
        expect(valueElement).toHaveTextContent(expectedValue)
      }
    } catch (e) {
      console.error(`Test failed for value ${value}`)
      throw e
    }
  }

  unmount()
})
