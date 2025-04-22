import { DEV } from 'esm-env'
import { SvelteMap } from 'svelte/reactivity'
import type { Note } from './types.js'

type GlobalValue = {
  note?: Note
  value: () => unknown
}

export const globalValues = new SvelteMap<unknown, GlobalValue>()

const _componentNameRegex = /(\+)?\w+\.svelte/gm
const componentNameWithPathRegex = /([A-z$_-]+\/)+(\+)?(\w+[^Tools])\.svelte(?!\.ts)/gm

/**
 * Register a "global" value to be inspected with `Inspect.Panel`.
 * It is recommended to call this during component initialization.
 *
 * Returns a function that removes the added value when called.
 *
 * If called during component initialization, the value will automatically be removed when the component is unmounted.
 *
 * If called after component initialization (i.e. on click) the returned remove-function should be called when the component is destroyed.
 * If not, value will lose reactivity and may cause weird side-effects or throw errors.
 *
 * Can also safely be run inside an $effect that will re-add the value if removed and it changes.
 *
 * @example
 * ```svelte
 * <script>
 *  import {onDestroy} from 'svelte'
 *  import Inspect, {addToPanel} from 'svelte-inspect-value'
 *
 *  let value = $state('test')
 *  let anObject = $state({})
 *  let anotherValue = $state(123)
 *
 *  // call during initialization
 *  // will be removed when this component is destroyed.
 *  addToPanel('a', () => value)
 *
 *  $effect(() => {
 *    // re-set the value if it changes
 *    // will be removed when this component is destroyed.
 *    addToPanel('b', () => anObject)
 *  })
 *
 *  let remove;
 *  function add() {
 *    // called after initialization. value will not be removed
 *    remove = addToPanel('b', () => anotherValue)
 *  }
 *
 *  onDestroy(() => {
 *    if(remove) remove?.()
 *  })
 * </script>
 *
 * <button onclick={add}>add</button>
 *
 * ```
 *
 * @param name display name of inspected value
 * @param value function returning value to be inspected
 * @param addedBy (optional) label of where value was added from
 */
export function addToPanel(name: PropertyKey, value: () => unknown, addedBy?: string) {
  let addedByPath: string | undefined
  if (DEV && addedBy == null) {
    const err = new Error()
    if (err.stack) {
      const path = err.stack.match(componentNameWithPathRegex)?.[0]
      addedByPath = path ? `Added from ${path}` : undefined
      addedBy = path ? path.split('/').at(-1) : addedBy
    }
  }

  const note: Note | undefined = addedBy ? { title: addedBy, description: addedByPath } : undefined

  const entry: GlobalValue = { value, note }

  try {
    $effect(() => {
      value()
      globalValues.set(name, entry)
      return () => globalValues.delete(name)
    })
  } catch {
    return $effect.root(() => {
      $effect(() => {
        value()
        globalValues.set(name, entry)
      })
      return () => globalValues.delete(name)
    })
  }
  return () => globalValues.delete(name)
}

export function removeFromPanel(name: PropertyKey) {
  globalValues.delete(name)
}
