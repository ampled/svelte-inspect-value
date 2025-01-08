import type { Component } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'
import type { ViewComponents } from './components/types.js'
import type { JSONInspectOptions } from './options.svelte.js'
import type { InspectState } from './state.svelte.js'
import type { ValueType } from './util.js'

export type InspectProps = {
  value?: unknown
  name?: string
  /**
   * Called whenever a node is collapsed or expanded
   * @param state
   */
  onCollapseChange?: (state: InspectState) => void
} & Partial<JSONInspectOptions> &
  HTMLAttributes<HTMLDivElement>

export type KeyName = string | number | symbol

export type TypeViewProps<T = unknown | undefined> = {
  key?: KeyName
  path?: KeyName[]
  value: T
  display?: string
  type?: ValueType | string
  collapsed?: boolean
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
