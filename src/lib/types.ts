import type { Component } from 'svelte'
import type { ViewComponents } from './components/types.js'
import type { ValueType } from './util.js'

export type KeyName = string | number | symbol

export type TypeViewProps<T = unknown | undefined> = {
  key?: KeyName
  path?: KeyName[]
  value: T
  display?: string
  type?: ValueType | string
  oninspectvaluechange?: () => void
}

export type CustomComponent = Component<TypeViewProps>

export type CustomComponents = Partial<ViewComponents>

export class InspectError extends Error {
  value: unknown
  name = 'InspectError'

  constructor(message: string, value?: unknown, options?: ErrorOptions) {
    super(message, options)
    this.value = value
  }
}
