import { cleanup, screen } from '@testing-library/svelte'
import { afterAll, describe, expect, test } from 'vitest'
import { renderInspect } from './util/index.js'

describe('expandable values', () => {
  const inspect = renderInspect({
    value: undefined,
    showLength: true,
    showTypes: true,
    elementView: 'full',
    // expandAll: true,
  })
  const { rerender, unmount, user, debug } = inspect

  afterAll(() => {
    unmount()
    cleanup()
  })

  test('it can display the keys and values of an object, including symbol keys', async () => {
    await rerender({
      value: {
        foo: 1,
        bar: 2,
        [Symbol('baz')]: 33,
      },
    })

    // check count
    const count = screen.queryByTestId('count')
    expect(count).toHaveTextContent('3 entries')

    // check keys
    const [foo, bar, baz] = [
      screen.queryByRole('button', { name: 'foo' }),
      screen.queryByRole('button', { name: 'bar' }),
      screen.queryByRole('button', { name: 'Symbol(baz)' }),
    ]
    expect(foo).toBeInTheDocument()
    expect(bar).toBeInTheDocument()
    expect(baz).toBeInTheDocument()

    // check type
    const type = screen.getAllByTestId('type')[0]
    expect(type).toHaveTextContent('obj')

    // check values
    screen.getAllByTestId('value').forEach((value) => {
      expect(value.innerText).toBeOneOf(['1', '2', '33'])
    })
  })

  test('it can display the keys and values of a map', async () => {
    await rerender({
      showPreview: true,
      expandAll: true,
      value: new Map<unknown, unknown>([
        ['foo', 1],
        ['bar', 2],
        ['baz', '33'],
      ]),
    })

    // check count
    const count = screen.getAllByTestId('count')[0]
    expect(count).toHaveTextContent('3 entries')

    // check keys
    const [foo, bar, baz] = [
      screen.queryByRole('button', { name: 'foo' }),
      screen.queryByRole('button', { name: 'bar' }),
      screen.queryByRole('button', { name: 'baz' }),
    ]

    // console.log(screen.getAllByTestId('key'))
    expect(foo).toBeInTheDocument()
    expect(bar).toBeInTheDocument()
    expect(baz).toBeInTheDocument()

    // check type
    const type = screen.getAllByTestId('type')[0]
    expect(type).toHaveTextContent('Map')

    // debug()

    // check values
    screen.getAllByTestId('value').forEach((value) => {
      expect(value.innerText).toBeOneOf(['1', '2', `'33'`])
    })
  })

  test('it can display the values of an array', async () => {
    await rerender({ value: [1, 2, 3] })

    debug()

    // check count
    const count = screen.queryByTestId('count')
    expect(count).toHaveTextContent('3 items')

    // check keys
    const [foo, bar, baz] = [
      screen.queryByRole('button', { name: '0' }),
      screen.queryByRole('button', { name: '1' }),
      screen.queryByRole('button', { name: '2' }),
    ]

    expect(foo).toBeInTheDocument()
    expect(bar).toBeInTheDocument()
    expect(baz).toBeInTheDocument()

    // check type
    const type = screen.getAllByTestId('type')[0]
    expect(type).toHaveTextContent('arr')

    // check values
    screen.getAllByTestId('value').forEach((value) => {
      expect(value.innerText).toBeOneOf(['1', '2', '3'])
    })
  })

  test('it can display the values of a set', async () => {
    await rerender({ value: new Set([1, 2, 3]) })

    // check count
    const count = screen.queryByTestId('count')
    expect(count).toHaveTextContent('3 entries')

    // check keys
    const [foo, bar, baz] = [
      screen.queryByRole('button', { name: '0' }),
      screen.queryByRole('button', { name: '1' }),
      screen.queryByRole('button', { name: '2' }),
    ]

    expect(foo).toBeInTheDocument()
    expect(bar).toBeInTheDocument()
    expect(baz).toBeInTheDocument()

    // check type
    const type = screen.getAllByTestId('type')[0]
    expect(type).toHaveTextContent('Set')

    // check values
    screen.getAllByTestId('value').forEach((value) => {
      expect(value.innerText).toBeOneOf(['1', '2', '3'])
    })
  })

  test('it renders multiline strings', async () => {
    await rerender({
      value: '  hello \n     world',
      expandAll: true,
    })
    const element = screen.queryByTestId('inspect')
    expect(element).toBeInTheDocument()

    const count = screen.getByTestId('count')

    expect(count).toHaveTextContent('19 chars')

    const indent = screen.getByTestId('indent')

    expect(indent).toHaveTextContent('hello world')
    expect(indent).toHaveClass('indent', 'string')
  })

  test('it renders multiline functions', async () => {
    await rerender({
      value: function greet(name: string) {
        return 'hello ' + name
      },
      noanimate: true,
      expandAll: true,
      showPreview: false,
    })

    const type = screen.queryByTestId('type')
    expect(type).toHaveTextContent('fn')
    const value = screen.queryByTestId('value')
    expect(value).toHaveTextContent(`function greet(name) { return "hello " + name; }`)
    const indent = screen.queryByTestId('indent')
    expect(indent).toHaveClass('indent', 'function')
  })

  test('it can display properties of html elements', async () => {
    document.body.classList.add('test')
    document.body.dataset['test'] = 'test'

    await rerender({
      value: document.body,
      noanimate: true,
      expandAll: true,
      showPreview: false,
      showTypes: true,
    })

    const type = screen.queryAllByTestId('type')[0]
    expect(type).toHaveTextContent('htmlbodyelement')
    const value = screen.queryAllByTestId('value')[0]

    expect(value).toHaveTextContent(`<body class="test" data-test="test">`)
    const indent = screen.queryAllByTestId('indent')[0]
    expect(indent).toBeInTheDocument()
    expect(indent).toHaveClass('indent', 'htmlbodyelement')
  })

  test('it can be opened and closed', async () => {
    await rerender({
      value: { hey: 'im a test value' },
      name: 'test',
      expandAll: false,
    })

    const button = screen.getByTestId('collapse-button')

    let indent = screen.queryByTestId('indent')
    expect(indent).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'collapse test')
    expect(button).toHaveAttribute('title', 'collapse test')

    await user.click(button)

    indent = screen.queryByTestId('indent')

    expect(indent).not.toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'expand test')
    expect(button).toHaveAttribute('title', 'expand test')
  })
})
