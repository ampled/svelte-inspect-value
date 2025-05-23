import { describe, expect, test } from 'vitest'
import Inspect from '../src/lib/index.js'
import { renderComponent } from './util/index.js'

describe('inspect search', () => {
  test('it renders', async () => {
    using rendered = renderComponent(Inspect, {
      props: {
        values: { a: 'a', b: 'b', c: 'c' },
        noanimate: true,
        search: 'filter-strict',
        highlightMatches: false,
      },
    })

    const { user, result } = rendered

    expect(result.component).toBeDefined()

    const searchField = result.queryByPlaceholderText('search') as HTMLInputElement

    expect(searchField).toBeInTheDocument()

    await user.type(searchField, 'a')
    await user.keyboard('{Enter}')

    const clearBtn = result.getByTitle('clear search')
    expect(clearBtn).toBeInTheDocument()
  })
})
