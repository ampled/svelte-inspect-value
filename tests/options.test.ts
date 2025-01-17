import { cleanup, screen } from '@testing-library/svelte'
import { afterAll, describe, expect, test } from 'vitest'
import { renderInspect } from './util/index.js'

afterAll(() => {
  cleanup()
})

describe('inspect options', () => {
  test('it can expand all nodes by default', async () => {
    const { unmount, rerender } = renderInspect({
      value: { a: { b: { c: { d: 'end' } } } },
      expandAll: true,
    })

    let expandables = screen.queryAllByTestId('expandable')

    expect(expandables.length).toBe(4)
    expandables.forEach((e) => {
      expect(e).toHaveAttribute('aria-expanded', 'true')
    })

    await rerender({ value: [[[[[['end']]]]]] })
    expandables = screen.queryAllByTestId('expandable')

    expect(expandables.length).toBe(6)

    const value = screen.queryByTestId('value')

    // fully expanded = value visible
    expect(value).toBeInTheDocument()
    expect(value).toHaveTextContent('end')

    unmount()
  })

  test('it can expand nodes to a certain depth', async () => {
    const { unmount } = renderInspect({ value: { a: { b: { c: { d: 'end' } } } }, expandLevel: 2 })

    const expandables = screen.queryAllByTestId('expandable')

    expect(expandables.length).toBe(3)

    expect(expandables[0]).toHaveAttribute('aria-expanded', 'true')
    expect(expandables[1]).toHaveAttribute('aria-expanded', 'true')
    expect(expandables[2]).toHaveAttribute('aria-expanded', 'false')

    unmount()
  })

  test('it can shorten strings based on stringCollapse prop', async () => {
    const { unmount, rerender } = renderInspect({ value: '1234567', stringCollapse: 3 })
    const valueElement = screen.getByTestId('value')
    expect(valueElement).toHaveTextContent(`'123…'`)

    // whitespace is trimmed
    await rerender({ value: '12 34567' })
    expect(valueElement).toHaveTextContent(`'12…'`)

    unmount()
  })

  test('it will show or hide types based on showTypes prop', async () => {
    const { unmount, rerender } = renderInspect({ value: 'a string', showTypes: true })
    const type = screen.queryByTestId('type')
    expect(type).toBeInTheDocument()
    expect(type).toHaveTextContent('str')
    await rerender({ showTypes: false })
    expect(type).not.toBeInTheDocument()
    unmount()
  })

  test('it will show or hide counts based on showLength prop', async () => {
    const { unmount, rerender } = renderInspect({ value: [1, 2, 3], showLength: true })
    const count = screen.queryByTestId('count')
    expect(count).toBeInTheDocument()
    expect(count).toHaveTextContent('3 items')
    await rerender({ showLength: false })
    expect(count).not.toBeInTheDocument()
    unmount()
  })
})
