import { screen } from '@testing-library/svelte'

import { describe, expect, test } from 'vitest'
import Inspect, { GLOBAL_OPTIONS_CONTEXT } from '../src/lib/index.js'
import { renderComponent } from './util/index.js'

describe('inspect values', () => {
  test('it renders', async () => {
    using rendered = renderComponent(Inspect.Values, { props: { a: 'a', b: 'b', c: 'c' } })

    expect(rendered.result.component).toBeDefined()

    const [keyA, keyB, keyC] = screen.getAllByTestId('key')
    const [a, b, c] = screen.getAllByTestId('value')

    expect(keyA).toHaveTextContent('a')
    expect(keyB).toHaveTextContent('b')
    expect(keyC).toHaveTextContent('c')
    expect(a).toHaveTextContent(`'a'`)
    expect(b).toHaveTextContent(`'b'`)
    expect(c).toHaveTextContent(`'c'`)
  })

  test('it can be configured', async () => {
    const Configured = Inspect.Values.withOptions(() => ({
      stringCollapse: 5,
      quotes: 'none',
      showPreview: false,
      expandLevel: 0,
      noanimate: true,
    }))

    using rendered = renderComponent(Configured, {
      props: { test: '123456' },
      context: new Map([
        // passing an empty context map avoids "lifecycle_outside_component" error
      ]),
    })

    expect(rendered.result.component).toBeDefined()

    const key = screen.getByTestId('key')
    const value = screen.getByTestId('value')
    expect(key).toHaveTextContent('test')
    expect(value).toHaveTextContent('12345…')
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

    using renderedConfigured = renderComponent(Configured, {
      props: { test: '123456' },
      context: new Map([
        // passing an empty context map avoids "lifecycle_outside_component" error
      ]),
    })

    const key = screen.getByTestId('key')
    const value = screen.getByTestId('value')
    expect(value).toHaveTextContent('12345…')
    expect(key).toHaveTextContent('test')

    renderedConfigured[Symbol.dispose]()

    using rendered = renderComponent(Inherits, {
      props: { test: '123456' },
      context: new Map([]),
    })

    expect(rendered.result.component).toBeDefined()

    const inheritsValue = screen.getByTestId('value')

    // string should be collapsed (inherited option) but have double quotes
    expect(inheritsValue).toHaveTextContent('"12345…"')
  })

  test('it can be rendered with a preset initial expand-level', async () => {
    using rendered = renderComponent(Inspect.Values.Expand0, {
      props: { test: { test: '123456' } },
      context: new Map([
        [
          GLOBAL_OPTIONS_CONTEXT,
          { showPreview: false, noanimate: true, showTools: false, showTypes: false },
        ],
      ]),
    })

    expect(rendered.result.component).toBeDefined()

    const key = screen.getByTestId('key')
    const value = screen.queryByTestId('value')
    expect(value).toBe(null) // no value (123456) has been rendered
    expect(key).toHaveTextContent('test')
  })

  test('it can be configured using inline chainable configuration', async () => {
    using rendered = renderComponent(Inspect.Values.Config.PlainTheme.NoAnimate.Ok, {
      props: { test: { test: '123456' } },
      context: new Map([
        [GLOBAL_OPTIONS_CONTEXT, { showPreview: false, showTools: false, showTypes: false }],
      ]),
    })

    expect(rendered.result.component).toBeDefined()

    const inspect = screen.getByTestId('inspect')
    expect(inspect).toHaveClass('plain')
    expect(inspect).toHaveClass('noanimate')
  })
})
