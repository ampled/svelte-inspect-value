import { render } from '@testing-library/svelte'
import { userEvent } from '@testing-library/user-event'
import type { ComponentProps } from 'svelte'
import Inspect from '../../src/lib/Inspect.svelte'

export function renderInspect(
  props: ComponentProps<typeof Inspect>,
  context?: [unknown, unknown][]
) {
  const user = userEvent.setup()

  const renderResult = render(Inspect, {
    props: {
      borderless: true,
      noanimate: true,
      showPreview: false,
      showTools: false,
      showLength: false,
      flashOnUpdate: false,
      ...props,
    },
    context: new Map(context),
  })

  return {
    ...renderResult,
    user,
  }
}
