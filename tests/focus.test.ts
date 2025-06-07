import { describe, expect, test } from 'vitest'
import Inspect from '../src/lib/index.js'
import { renderComponent } from './util/index.js'
import { waitFor } from '@testing-library/svelte'

describe('focus features', () => {
  test('set focus by typing', async () => {
    using rendered = renderComponent(Inspect, {
      props: {
        values: { lorem: 'aa', ipsum: 'bb', dolor: 'cc', sit: 'amet' },
        noanimate: true,
      },
    })

    const { user, result } = rendered

    expect(result.getAllByTestId('row')).toHaveLength(4)
    const sitLine = result.getByText('sit')
    await user.click(sitLine)
    await user.keyboard('lor')

    await waitFor(
      () => expect(result.container.ownerDocument.activeElement).toHaveTextContent('lorem'),
      { interval: 100, timeout: 600 }
    )
  })

  test('navigate lines with keyboard', async () => {
    using rendered = renderComponent(Inspect, {
      props: {
        values: { lorem: 'aa', ipsum: 'bb', dolor: 'cc', sit: 'dd' },
        noanimate: true,
      },
    })
    const {
      user,
      result,
      result: {
        container: {
          ownerDocument: { activeElement },
        },
      },
    } = rendered

    const sitLine = result.getByText('sit')
    await user.click(sitLine)
    await user.keyboard('{ArrowUp}')
    expect(activeElement).toHaveTextContent('dolor')
    await user.keyboard('{ArrowUp}{ArrowUp}')
    expect(activeElement).toHaveTextContent('lorem')
    await user.keyboard('{ArrowUp}') // it loops from top to end
    expect(activeElement).toHaveTextContent('sit')
  })
})
