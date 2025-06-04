import { addToPanel } from '../global.svelte.js'
import type { Action } from 'svelte/action'

export const inspectWithPanel: Action<HTMLElement, string> = (element, name) => {
  $effect(() => {
    const remove = addToPanel(name, () => element)
    return remove
  })
}
