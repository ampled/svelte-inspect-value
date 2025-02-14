/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component, ComponentProps } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'
import type { InspectOptions } from './options.svelte.js'
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
  debug?: boolean
} & Partial<InspectOptions> &
  HTMLAttributes<HTMLDivElement>

export type KeyType = string | number | symbol

export type TypeViewProps<Value = unknown, Type = ValueType> = {
  value: Value
  key?: KeyType
  keyPrefix?: string
  showKey?: boolean
  keyDelim?: string
  keyStyle?: HTMLAttributes<HTMLDivElement>['style']
  /**
   * Path of the node
   */
  path?: KeyType[]
  /**
   * Representation of value.
   *
   * Use to customize how a value is represented while still being able to pass the original
   * value for other purposes
   */
  display?: string
  /**
   * Type of the value
   */
  type?: Type
  /**
   * Force type indicator visibility for this node
   */
  forceType?: boolean
}

export type CustomComponentPropsTransformFn<TComponent extends Component<any>> = (
  props: ComponentProps<TComponent>
) => Partial<ComponentProps<TComponent>>
/**
 * Function returning boolean value. If false, use default component.
 */
export type CustomComponentPredicate<TComponent extends Component<any>> = (
  props: ComponentProps<TComponent>
) => boolean

type CustomEntryComponentOnly<TComponent extends Component<any>> = [TComponent]
type CustomEntryWithTransform<TComponent extends Component<any>> = [
  TComponent,
  CustomComponentPropsTransformFn<TComponent>,
]
type CustomEntryWithPredicate<TComponent extends Component<any>> = [
  TComponent,
  CustomComponentPropsTransformFn<TComponent> | undefined,
  CustomComponentPredicate<TComponent>,
]

export type CustomComponentEntry<TComponent extends Component<any> = Component<any>> =
  | CustomEntryComponentOnly<TComponent>
  | CustomEntryWithTransform<TComponent>
  | CustomEntryWithPredicate<TComponent>

export type CustomComponents = Record<string, CustomComponentEntry>

export class InspectError extends Error {
  value: unknown
  name = 'InspectError'

  constructor(message: string, value?: unknown, options?: ErrorOptions) {
    super(message, options)
    this.value = value
  }
}

/**
 * Props received by custom components.
 * Define extra props using third generic parameter
 */
export type CustomComponentProps<
  T = unknown,
  Type = string | undefined,
  ExtraProps extends Record<string, any> = Record<string, any>,
> = TypeViewProps<T, Type> & ExtraProps

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
