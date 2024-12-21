import { getContext, untrack } from 'svelte'
import type { CustomComponents } from './types.js'

export type JSONInspectOptions = {
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
    theme: 'cotton-candy',
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
      if ($effect.tracking()) {
        untrack(() => {
          value = {
            ...value,
            ...options,
          }
        })
      } else {
        value = {
          ...value,
          ...options,
        }
      }
    },
  }
}

export type OptionsContext = ReturnType<typeof createOptions>

export function useOptions(): JSONInspectOptions {
  return getContext<OptionsContext>('json-inspect').value
}
