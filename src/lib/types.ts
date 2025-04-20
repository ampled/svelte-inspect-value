/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component, ComponentProps } from 'svelte'
import type { HTMLAttributes, SvelteHTMLElements } from 'svelte/elements'
import type { InspectOptions } from './options.svelte.js'
import type { ValueType } from './util.js'

export type BaseProps = {
  /**
   * Any (single) value of any type to be inspected.
   *
   * Will not be inspected if {@linkcode InspectProps.values} is used
   *
   * If value is `undefined` or `null` without {@link InspectProps.name} being set,
   * the value will not be inspected
   *
   * @default undefined
   */
  value?: unknown
  /**
   * Inspect every enumerable property of a value, object or array-like.
   *
   * Allows for multiple root-level nodes, unlike {@linkcode InspectProps.value}.
   *
   * @default undefined
   */
  values?: unknown
  /**
   * Name of inspected value. Will be displayed as the "key" of the value.
   *
   * Will not be used if {@linkcode InspectProps.values} is set
   *
   * @see {@linkcode InspectOptions.expandPaths}
   *
   * @default undefined
   */
  name?: string
  /**
   * A `string` or {@linkcode Snippet} that will be rendered as a small heading with a collapse-button for the component.
   *
   * @default undefined
   */
  heading?: string | import('svelte').Snippet
}

export type InspectProps = BaseProps & Partial<InspectOptions> & SvelteHTMLElements['div']

export type YPos = 'top' | 'bottom' | 'middle' | 'full-y' | (string & {})
export type XPos = 'right' | 'left' | 'center' | 'full-x' | (string & {})
export type PanelAppearance = 'solid' | 'glassy' | 'floating' | 'dense' | (string & {})
export type PositionProp = [YPos, XPos | undefined]

export type PanelProps = {
  /**
   * Initial panel position
   *
   * Format: `[<y-position>, <x-position>]`
   *
   * y-position can be one of `'top' | 'bottom' | 'middle' | 'full-y'`
   *
   * x-position can be one of `'left' | 'right' | 'center' | 'full-x'`
   *
   * @default ['top', 'right']
   */
  position?: [YPos] | [YPos, XPos]
  /**
   * Initially open panel
   *
   * @default false
   */
  open?: boolean
  /**
   * Panel should open on hover.
   *
   * Enabling this will leave part of the panel visible for easier reach.
   *
   * @default false
   */
  openOnHover?: boolean
  /**
   * Sets appearance of panel.
   *
   * Can be `'solid'|'glassy'|'dense'|'floating'`
   *
   * @default 'solid'
   */
  appearance?: PanelAppearance
  /**
   * Don't render Panel toolbar
   *
   * @default false
   */
  hideToolbar?: boolean
  /**
   * Don't display "global" values added with `addToPanel`
   *
   * @default false
   */
  hideGlobalValues?: boolean
  /**
   * Enable resizing
   *
   * @default true
   */
  resize?: boolean
  /**
   * Apply opacity to the panel when not hovered
   *
   * @default false
   */
  opacity?: boolean
  /**
   * Extra elements to be added at the bottom of the Panel
   *
   * @default undefined
   */
  children?: import('svelte').Snippet
}

export type InspectPanelProps = BaseProps &
  PanelProps &
  Partial<InspectOptions> &
  SvelteHTMLElements['aside']

export type KeyType = PropertyKey

export type Note = { title?: string; description?: string }

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
  note?: Note
}

/**
 * @inheritdoc
 * @augments InspectOptions
 */
export type InspectValuesOptions = InspectOptions & {
  /**
   * HTML-attributes (like `class` and `style`) that will be applied to the `Inspect.Values`-element.
   *
   * Will be overwritten, not merged if a child-variation defined with `withOptions` defines this object.
   */
  elementAttributes?: SvelteHTMLElements['div']
}

export type ConfigurableOptions = () => Partial<InspectValuesOptions>

export type CustomComponentPropsTransformFn<TComponent extends Component<any>> = (
  props: ComponentProps<TComponent>
) => Partial<ComponentProps<TComponent>>

/**
 * Function returning boolean value. If false, use default component.
 */
export type CustomComponentPredicate<TComponent extends Component<any>> = (
  props: ComponentProps<TComponent>
) => boolean

export type CustomEntryComponentOnly<TComponent extends Component<any>> = [TComponent]
export type CustomEntryWithTransform<TComponent extends Component<any>> = [
  TComponent,
  CustomComponentPropsTransformFn<TComponent>,
]
export type CustomEntryWithPredicate<TComponent extends Component<any>> = [
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
  private errorValue: unknown
  public get value() {
    return this.errorValue
  }

  name = 'InspectError'

  constructor(message: string, value?: unknown, options?: ErrorOptions) {
    super(message, options)
    this.errorValue = value
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

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>
