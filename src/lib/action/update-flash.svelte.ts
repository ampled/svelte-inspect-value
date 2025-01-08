import equal from 'fast-deep-equal'
import { onDestroy, untrack } from 'svelte'
import type { Action } from 'svelte/action'

export const flashOnUpdate: Action<
  HTMLElement,
  {
    value: () => unknown
    cb?: (fn: () => void) => void
  },
  { oninspectvaluechange: () => void }
> = (node, parameters) => {
  const { value, cb } = parameters

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
    const newVal = value()

    untrack(() => {
      if (!equal(prevValue, newVal)) {
        node.dispatchEvent(new CustomEvent('inspectvaluechange', { bubbles: true }))
        flash()
        prevValue = newVal
      }
    })
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
