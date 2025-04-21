import { describe, expect, test } from 'vitest'
import Inspect, { GLOBAL_OPTIONS_CONTEXT, type InspectOptions } from '../src/lib/index.js'
import { renderComponent } from './util/index.js'

describe('inspect panel', () => {
  test('it renders', async () => {
    using rendered = renderComponent(Inspect.Panel, {
      props: { values: { a: 'a', b: 'b', c: 'c' }, open: true },
      context: new Map([
        [GLOBAL_OPTIONS_CONTEXT, { noanimate: true } satisfies Partial<InspectOptions>],
      ]),
    })

    expect(rendered.result.component).toBeDefined()

    rendered.result.debug()
  })
})
