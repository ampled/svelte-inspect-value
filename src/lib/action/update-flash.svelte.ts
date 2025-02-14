import equal from 'fast-deep-equal'
import { untrack } from 'svelte'
import type { Action } from 'svelte/action'

export type FlashFn = (flashStyle?: Partial<CSSStyleDeclaration>) => void

export const flashOnUpdate: Action<
  HTMLElement | SVGSVGElement,
  {
    value: () => unknown
    enabled?: () => boolean
    onInit?: (fn: FlashFn) => void
    flashStyle?: () => Partial<CSSStyleDeclaration>
  },
  { oninspectvaluechange: () => void }
> = (node, parameters) => {
  const {
    value,
    onInit,
    enabled = () => true,
    flashStyle = () =>
      ({
        height: '4px',
        width: '4px',
        backgroundColor: 'var(--fg-light)',
        border: '1px solid var(--fg-light)',
        transform: `translateX(0%) scale(1, 1)`,
        // transform: `scale(1, 1.5)`,
        // boxShadow: '0px 0px 4px 1px var(--fg-light)',
        filter: 'drop-shadow(0px 0px 2px var(--fg-light))',
        borderRadius: '9999px',
      }) as CSSStyleDeclaration,
  } = parameters

  let prevValue = value()
  let timeout: number | undefined
  let isFlashing = false

  const flash: FlashFn = (style?: Partial<CSSStyleDeclaration>) => {
    if (isFlashing) return
    isFlashing = true
    const fStyle = style ?? flashStyle()

    const originalStyles = Object.keys({ ...fStyle, ...flashStyle() }).map((styleKey) => [
      styleKey,
      node.style.getPropertyValue(styleKey),
    ])
    node.style.transition = 'all 0ms linear'
    // set update flash style
    Object.entries(fStyle).forEach(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      node.style[key as any] = value as string
    })

    if (timeout) window.clearTimeout(timeout)
    // reset styles
    timeout = window.setTimeout(() => {
      node.style.transition = 'all 200ms ease-out'

      originalStyles.forEach(([key]) => {
        if (key !== 'transition') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          node.style[key as any] = '' as string
        }
      })

      isFlashing = false
    }, 100)
  }

  // expose flash function
  if (onInit) onInit(flash)

  $effect(() => {
    if (enabled()) {
      const newValue = value()

      untrack(() => {
        if (!equal(prevValue, newValue)) {
          node.dispatchEvent(new CustomEvent('inspectvaluechange', { bubbles: true }))
          flash(flashStyle())
          prevValue = newValue
        }
      })
    }
  })
}

declare module 'svelte/elements' {
  interface HTMLAttributes<T extends EventTarget> extends AriaAttributes, DOMAttributes<T> {
    oninspectvaluechange?: () => void
  }
}
