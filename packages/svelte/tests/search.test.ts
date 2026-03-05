import { describe, expect, test } from 'vitest'
import Inspect from '../src/lib/index.js'
import { renderComponent } from './util/index.js'

describe('inspect search', () => {
  test('it can show matches only', async () => {
    using rendered = renderComponent(Inspect, {
      props: {
        values: { aa: 'aa', bb: 'bb', cc: 'cc' },
        noanimate: true,
        search: 'filter-strict',
        highlightMatches: false,
      },
    })

    const { user, result } = rendered

    expect(result.component).toBeDefined()

    const searchField = result.queryByPlaceholderText('search') as HTMLInputElement

    expect(searchField).toBeInTheDocument()
    let rows = result.getAllByTestId('row')
    expect(rows).toHaveLength(3)

    await user.type(searchField, 'aa')
    await user.keyboard('{Enter}')

    const clearBtn = result.getByTitle('clear search')
    expect(clearBtn).toBeInTheDocument()
    rows = result.getAllByTestId('row')
    expect(rows).toHaveLength(1)
  })
})
