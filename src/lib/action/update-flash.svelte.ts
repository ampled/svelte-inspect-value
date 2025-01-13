import equal from 'fast-deep-equal'
import { onDestroy, untrack } from 'svelte'
import type { Action } from 'svelte/action'

export const flashOnUpdate: Action<
  HTMLElement,
  {
    value: () => unknown
    enabled?: () => boolean
    cb?: (fn: () => void) => void
  },
  { oninspectvaluechange: () => void }
> = (node, parameters) => {
  const { value, cb, enabled = () => true } = parameters

  let prevValue = value()
  let timeout = $state<number>()

  const originalColor = node.style.color
  const originalTransition = node.style.transition

  node.style.transition = ''

  const flash = () => {
    node.style.opacity = '1'
    node.style.color = 'var(--bg-light)'
    if (timeout) window.clearTimeout(timeout)

    timeout = window.setTimeout(() => {
      node.style.transition = 'color 200ms ease-out'
      node.style.color = originalColor
    }, 200)
  }

  // expose flash function
  cb?.(flash)

  $effect(() => {
    if (enabled()) {
      const newValue = value()

      untrack(() => {
        if (!equal(prevValue, newValue)) {
          node.dispatchEvent(new CustomEvent('inspectvaluechange', { bubbles: true }))
          flash()
          prevValue = newValue
        }
      })
    }
  })

  onDestroy(() => {
    node.style.color = originalColor
    node.style.transition = originalTransition
  })
}

declare module 'svelte/elements' {
  interface HTMLAttributes<T extends EventTarget> extends AriaAttributes, DOMAttributes<T> {
    oninspectvaluechange?: () => void
  }
}
