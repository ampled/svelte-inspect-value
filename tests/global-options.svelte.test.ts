import { GLOBAL_OPTIONS_CONTEXT } from '$lib/options.svelte.js'
import { act, cleanup, screen } from '@testing-library/svelte'
import { afterAll, describe, expect, test } from 'vitest'
import { renderInspect } from './util/index.js'

afterAll(() => {
  cleanup()
})

describe('global options', () => {
  test('it can set options for all nested inspect instances', async () => {
    const { unmount } = renderInspect({ value: 'testing' }, [
      [GLOBAL_OPTIONS_CONTEXT, () => ({ showTypes: false })],
    ])

    expect(screen.queryByTestId('type')).not.toBeInTheDocument()

    unmount()
  })

  test('it reacts to changes if a reactive object is passed as global options', async () => {
    const options = $state({ showTypes: false })

    const { unmount } = renderInspect({ value: 'testing' }, [[GLOBAL_OPTIONS_CONTEXT, options]])

    expect(screen.queryByTestId('type')).not.toBeInTheDocument()

    await act(() => {
      options.showTypes = true
    })

    const type = screen.queryByTestId('type')
    expect(type).toBeInTheDocument()
    expect(type).toHaveTextContent('str')

    unmount()
  })
})
