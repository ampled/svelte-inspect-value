import { getContext, untrack } from 'svelte'
import type { CustomComponents } from './types.js'

export const OPTIONS_CONTEXT = Symbol('inspect-options')

export type JSONInspectOptions = {
  /**
   * Show length of arrays or strings and number of entries in objects
   */
  showLength: boolean

  showTypes: boolean
  stringCollapse: number
  open: boolean
  customComponents: CustomComponents
  draggable: boolean
  noanimate: boolean
  quotes: 'single' | 'double'
  theme: string
  expandAll: boolean
  expandLevel: number
}

export function createOptions(options: Partial<JSONInspectOptions>) {
  let value: JSONInspectOptions = $state({
    open: false,
    draggable: false,
    noanimate: false,
    quotes: 'single',
    showTypes: true,
    showLength: true,
    stringCollapse: 0,
    theme: 'drak',
    expandAll: false,
    customComponents: {},
    expandLevel: 1,
    ...options,
  })

  return {
    get value() {
      return value
    },
    set value(val: JSONInspectOptions) {
      value = val
    },
    setOptions(options: Partial<JSONInspectOptions>) {
      untrack(() => {
        value = {
          ...value,
          ...options,
        }
      })
    },
  }
}

export type OptionsContext = ReturnType<typeof createOptions>

export function useOptions(): JSONInspectOptions {
  return getContext<OptionsContext>(OPTIONS_CONTEXT).value
}
