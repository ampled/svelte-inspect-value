import { cleanup, screen } from '@testing-library/svelte'
import { afterAll, expect, test } from 'vitest'
import { renderInspect } from './util/index.js'

afterAll(() => {
  cleanup()
})

test('it has interactive elements for getters and setters', async () => {
  const value = $state({
    get current() {
      return this.value
    },
    set current(value: number) {
      this.value = value
    },
    get double() {
      return this.value * 2
    },
    value: 1,
  })

  const { unmount, user } = renderInspect({ value, expandAll: true, name: 'numberValue' })

  const key = screen.queryAllByTestId('key')[2]

  // getters / setters get key prefixes
  expect(key).toHaveTextContent('set|get current')

  const getButton = screen.queryAllByRole('button', { name: 'get' })[0]

  let getterValueElement = screen.queryAllByTestId('value')[1]

  expect(getterValueElement).toHaveTextContent('get current() { return this.value; }')

  await user.click(getButton)

  getterValueElement = screen.queryAllByTestId('value')[0]

  expect(getterValueElement).toHaveTextContent('1')

  unmount()
})
