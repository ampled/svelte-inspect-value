import { cleanup, render, screen } from '@testing-library/svelte'
import { afterAll, describe, expect, test } from 'vitest'
import Inspect, { GLOBAL_OPTIONS_CONTEXT } from '../src/lib/index.js'

afterAll(() => {
  cleanup()
})

describe('inspect values', () => {
  test('it renders', async () => {
    const { unmount } = render(Inspect.Values, { props: { a: 'a', b: 'b', c: 'c' } })

    const [keyA, keyB, keyC] = screen.getAllByTestId('key')
    const [a, b, c] = screen.getAllByTestId('value')

    expect(keyA).toHaveTextContent('a')
    expect(keyB).toHaveTextContent('b')
    expect(keyC).toHaveTextContent('c')
    expect(a).toHaveTextContent(`'a'`)
    expect(b).toHaveTextContent(`'b'`)
    expect(c).toHaveTextContent(`'c'`)

    unmount()
  })

  test('it can be configured', async () => {
    const Configured = Inspect.Values.withOptions(() => ({
      stringCollapse: 5,
      quotes: 'none',
      showPreview: false,
      expandLevel: 0,
      noanimate: true,
    }))

    const { unmount } = render(Configured, {
      props: { test: '123456' },
      context: new Map([
        // passing an empty context map avoids "lifecycle_outside_component" error
      ]),
    })

    const key = screen.getByTestId('key')
    const value = screen.getByTestId('value')
    expect(value).toHaveTextContent('12345…')
    expect(key).toHaveTextContent('test')

    unmount()
  })

  test('it can be configured and inherit configurations', async () => {
    const Configured = Inspect.Values.withOptions(() => ({
      stringCollapse: 5,
      quotes: 'none',
      showPreview: false,
      expandLevel: 0,
      noanimate: true,
    }))

    const Inherits = Configured.withOptions(() => ({
      quotes: 'double',
    }))

    const configured = render(Configured, {
      props: { test: '123456' },
      context: new Map([
        // passing an empty context map avoids "lifecycle_outside_component" error
      ]),
    })

    const key = screen.getByTestId('key')
    const value = screen.getByTestId('value')
    expect(value).toHaveTextContent('12345…')
    expect(key).toHaveTextContent('test')

    configured.unmount()

    const inherits = render(Inherits, {
      props: { test: '123456' },
      context: new Map([]),
    })

    const inheritsValue = screen.getByTestId('value')

    // string should be collapsed (inherited) but have double quotes
    expect(inheritsValue).toHaveTextContent('"12345…"')

    inherits.unmount()
  })

  test('it can be rendered with a preset initial expand-level', async () => {
    const { unmount } = render(Inspect.Values.Expand0, {
      props: { test: { test: '123456' } },
      context: new Map([
        [
          GLOBAL_OPTIONS_CONTEXT,
          { showPreview: false, noanimate: true, showTools: false, showTypes: false },
        ],
      ]),
    })

    const key = screen.getByTestId('key')
    const value = screen.queryByTestId('value')
    expect(value).toBe(null) // no value (123456) has been rendered
    expect(key).toHaveTextContent('test')

    unmount()
  })

  test('it can be configured using inline chainable configuration', async () => {
    const { unmount } = render(Inspect.Values.Config.PlainTheme.NoLength.NoAnimate.Ok, {
      props: { test: { test: '123456' } },
      context: new Map([
        [GLOBAL_OPTIONS_CONTEXT, { showPreview: false, showTools: false, showTypes: false }],
      ]),
    })

    const inspect = screen.getByTestId('inspect')

    expect(inspect).toHaveClass('plain')
    expect(inspect).toHaveClass('noanimate')

    unmount()
  })
})
