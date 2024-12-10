import type { Component } from 'svelte'
import type { ValueType } from './util.js'
import type { ViewComponents } from './components/types.js'

export type KeyName = string | number | symbol

export type TypeViewProps<T = unknown | undefined> = {
  key?: KeyName
  path?: KeyName[]
  value?: T
  type?: ValueType | string
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
