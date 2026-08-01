import equal from 'fast-deep-equal'
import type { Attachment } from 'svelte/attachments'

export type FlashFn = (flashStyle?: Partial<CSSStyleDeclaration>) => void

export const flash = <T extends Element = HTMLElement | SVGElement>(
  value: () => unknown,
  onupdate?: (node: T) => void,
  enabled: boolean = false,
  prevValue: unknown = undefined,
  initialized = false
): Attachment<T> => {
  return (node) => {
    function emitChanged(newVal: unknown) {
      onupdate?.(node)
      node.dispatchEvent(new CustomEvent('inspectvaluechange', { bubbles: true }))
      prevValue = newVal
    }

    $effect(() => {
      const newVal = value()
      if (enabled) {
        if (initialized) {
          try {
            // handle temporal comparison error
            // TODO: DIY an equal function or find alternative
            if (!equal(newVal, prevValue)) {
              emitChanged(newVal)
            }
          } catch {
            if (newVal !== prevValue) {
              emitChanged(newVal)
            }
          }
        } else {
          initialized = true
          prevValue = newVal
        }
      } else {
        prevValue = newVal
      }
    })
  }
}

declare module 'svelte/elements' {
  interface HTMLAttributes<T extends EventTarget> extends AriaAttributes, DOMAttributes<T> {
    oninspectvaluechange?: () => void
  }
}
