import type { Component } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'
import type { ViewComponents } from './components/index.js'
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

export type KeyType = string | number | symbol

export type TypeViewProps<Value = unknown, Type = ValueType> = {
  key?: KeyType
  keyPrefix?: string
  showKey?: boolean
  keyDelim?: string
  keyStyle?: HTMLAttributes<HTMLDivElement>['style']
  path?: KeyType[]
  value: Value
  /**
   * Representation of value.
   *
   * Use to customize how a value is represented while still being able to pass the original
   * value for other purposes
   */
  display?: string
  type?: Type
  forceType?: boolean
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

export type CustomComponentProps<T = unknown> = TypeViewProps<T>

export type List =
  | unknown[]
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array
