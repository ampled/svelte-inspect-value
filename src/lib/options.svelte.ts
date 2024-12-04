export type JSONInspectOptions = {
  showLength: boolean
  showTypes: boolean
  stringCollapse?: number
  stringRender: 'stringify' | 'pre'
}

export function createOptions(options: JSONInspectOptions) {
  let value: JSONInspectOptions = $state(options)

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
