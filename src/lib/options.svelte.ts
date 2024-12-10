import { getContext } from 'svelte'
import type { CustomComponents } from './types.js'

export type JSONInspectOptions = {
  showLength: boolean
  showTypes: boolean
  stringCollapse?: number
  open?: boolean
  customComponents?: CustomComponents
  draggable?: boolean
  noanimate?: boolean
  theme: string
}

export function createOptions(options: () => JSONInspectOptions) {
  let value: JSONInspectOptions = $state({
    open: false,
    draggable: false,
    noanimate: false,
    customComponents: {},
    ...options(),
  })

  // $effect(() => {
  //   value = {
  //     ...value,
  //     ...options(),
  //   }
  // })

  // $inspect(value)

  return {
    get value() {
      return value
    },
    set value(val: JSONInspectOptions) {
      value = val
    },
  }
}

export type OptionsContext = ReturnType<typeof createOptions>

export function useOptions(): JSONInspectOptions {
  return getContext<OptionsContext>('json-inspect').value
}
