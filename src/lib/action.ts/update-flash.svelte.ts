import { untrack } from 'svelte'
import type { Action } from 'svelte/action'
import equal from 'fast-deep-equal'

export const flashOnUpdate: Action<HTMLElement, () => unknown> = (element, value) => {
  let prevValue = value()
  let timeout = $state<number>()

  const originalColor = element.style.color

  element.style.transition = ''

  flash() // SEE TODO extract key and dash/collapse button out of titlebar/onelineview

  function flash() {
    // element.style.transition = 'color 200ms ease-out'

    element.style.color = 'var(--bg-light)'
    if (timeout) window.clearTimeout(timeout)

    timeout = window.setTimeout(() => {
      element.style.transition = 'color 200ms ease-out'

      element.style.color = originalColor
      // element.style.transition = ''
    }, 200)
  }

  $effect(() => {
    const newVal = value()
    // let prevValue = newVal;

    untrack(() => {
      // const prev = $state.snapshot(prevValue)

      // if (typeof newVal === 'string' || prevValue == null || newVal == null) {
      // console.log(prevValue, newVal)
      // }

      if (!equal(prevValue, newVal)) {
        flash()
        prevValue = newVal
      }
    })
  })
}
