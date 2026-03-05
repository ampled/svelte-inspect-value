import { cleanup, screen } from '@testing-library/svelte'
import { readable } from 'svelte/store'
import { afterAll, describe, expect, test } from 'vitest'
import { renderInspect } from './util/index.js'

describe('expandable values', () => {
  const inspect = renderInspect({
    value: undefined,
    showLength: true,
    showTypes: true,
    elementView: 'full',
  })
  const { rerender, unmount, user } = inspect

  afterAll(() => {
    unmount()
    cleanup()
  })

  test('it can display the keys and values of an object, including symbol keys', async () => {
    await rerender({
      name: 'test',
      value: {
        foo: 1,
        bar: 2,
        [Symbol('baz')]: 33,
      },
    })

    expect(screen.getAllByTestId('key')).toHaveLength(4)

    // check count
    const count = screen.queryByTestId('count')
    expect(count).toHaveTextContent('3 entries')

    // check keys
    const [foo, bar, baz] = [
      screen.queryByText('foo'),
      screen.queryByText('bar'),
      screen.queryByText('Symbol(baz)'),
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

  test('it can list and display properties of an object at root level using the propertiesOf-prop', async () => {
    await rerender({
      values: {
        foo: 1,
        bar: 2,
        [Symbol('baz')]: 33,
      },
    })

    expect(screen.getAllByTestId('key')).toHaveLength(3)
  })

  test('it can display the keys and values of a map', async () => {
    await rerender({
      values: undefined,
      showPreview: true,
      expandAll: false,
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
      screen.queryByText('foo'),
      screen.queryByText('bar'),
      screen.queryByText('baz'),
    ]

    expect(foo).toBeInTheDocument()
    expect(bar).toBeInTheDocument()
    expect(baz).toBeInTheDocument()

    // check type
    const type = screen.getAllByTestId('type')[0]
    expect(type).toHaveTextContent('Map')

    // check values
    screen.getAllByTestId('value').forEach((value) => {
      expect(value.innerText).toBeOneOf(['1', '2', `'33'`])
    })
  })

  test('it can display the values of an array', async () => {
    await rerender({ value: [1111, 2222, 3333] })

    // check count
    const count = screen.queryByTestId('count')
    expect(count).toHaveTextContent('3 items')

    // check keys
    const [foo, bar, baz] = [
      screen.queryByText('1'),
      screen.queryByText('2'),
      screen.queryByText('3'),
    ]

    expect(foo).toBeInTheDocument()
    expect(bar).toBeInTheDocument()
    expect(baz).toBeInTheDocument()

    // check type
    const type = screen.getAllByTestId('type')[0]
    expect(type).toHaveTextContent('arr')

    // check values
    screen.getAllByTestId('value').forEach((value) => {
      expect(value.innerText).toBeOneOf(['1111', '2222', '3333'])
    })
  })

  test('it can display the values of a set', async () => {
    await rerender({ value: new Set([111, 222, 333]) })

    // check count
    const count = screen.queryByTestId('count')
    expect(count).toHaveTextContent('3 entries')

    // check keys
    const [foo, bar, baz] = [
      screen.queryByText('0'),
      screen.queryByText('1'),
      screen.queryByText('2'),
    ]

    expect(foo).toBeInTheDocument()
    expect(bar).toBeInTheDocument()
    expect(baz).toBeInTheDocument()

    // check type
    const type = screen.getAllByTestId('type')[0]
    expect(type).toHaveTextContent('Set')

    // check values
    screen.getAllByTestId('value').forEach((value) => {
      expect(value.innerText).toBeOneOf(['111', '222', '333'])
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

  test('it can parse JSON strings and display the parsed value', async () => {
    await rerender({
      value: JSON.stringify(
        {
          foo: 1,
          bar: 2,
          baz: 33,
        },
        undefined,
        1
      ),
      noanimate: true,
      expandAll: true,
      parseJson: true,
      showPreview: false,
    })

    // check count
    const count = screen.getAllByTestId('count')[0]
    expect(count).toHaveTextContent('3 entries')

    // check keys
    const [foo, bar, baz] = [
      screen.queryByText('foo'),
      screen.queryByText('bar'),
      screen.queryByText('baz'),
    ]
    expect(foo).toBeInTheDocument()
    expect(bar).toBeInTheDocument()
    expect(baz).toBeInTheDocument()

    const note = screen.getByText('json')
    expect(note).toBeInTheDocument()
    expect(note).toHaveAttribute('title', 'This value was parsed from a JSON string')

    // check type
    const type = screen.getAllByTestId('type')[0]
    expect(type).toHaveTextContent('obj')

    // check values
    screen.getAllByTestId('value').forEach((value) => {
      expect(value.innerText).toBeOneOf(['1', '2', '33'])
    })
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

  test('it can display the value and other properties of stores', async () => {
    await rerender({
      value: readable('12345'),
      name: undefined,
      noanimate: true,
      expandAll: true,
      showPreview: false,
      showTypes: true,
      stores: true,
    })

    const [storeType, valueType] = screen.queryAllByTestId('type')
    const [valueKey] = screen.queryAllByTestId('key')
    const [value] = screen.queryAllByTestId('value')

    expect(storeType).toHaveTextContent('readable')
    expect(valueType).toHaveTextContent('str')
    expect(valueKey).toHaveTextContent('$ value')
    expect(value).toHaveTextContent(`'12345'`)

    await rerender({ stores: 'value-only' })

    const note = screen.getByTestId('note')

    expect(note).toBeInTheDocument()
    expect(note).toHaveTextContent('store')
    expect(note).toHaveAttribute('title', 'Value was retrieved by subscribing to a store')
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

    await user.click(button)

    indent = screen.queryByTestId('indent')

    expect(indent).not.toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'expand test')
  })
})
