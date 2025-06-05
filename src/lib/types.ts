/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component, ComponentProps } from 'svelte'
import type { HTMLAttributes, SvelteHTMLElements } from 'svelte/elements'
import type { InspectOptions } from './options.svelte.js'
import type { ValueType } from './util.js'

/**
 * Shared props for `Inspect` and `Inspect.Panel`
 *
 * @inline
 */
export type BaseProps = {
  /**
   * Any (single) value of any type to be inspected.
   *
   * Will not be inspected if {@linkcode BaseProps.values} is used
   *
   * If value is `undefined` or `null` without {@linkcode BaseProps.name} being set,
   * the value will not be inspected
   */
  value?: unknown
  /**
   * Inspect every enumerable property of a value, object or array-like.
   *
   * Allows for multiple root-level nodes, unlike {@linkcode BaseProps.value}.
   */
  values?: unknown
  /**
   * Name of inspected value. Will be displayed as the "key" of the value.
   *
   * Will not be used if {@linkcode BaseProps.values} is set
   *
   * @see {@linkcode InspectOptions.expandPaths}
   */
  name?: string
}

/**
 * Props for `Inspect`
 *
 * @see {@link InspectOptions}
 */
export type InspectProps = BaseProps & Partial<InspectOptions> & SvelteHTMLElements['div']

/**
 * @inline
 */
export type PanelAppearance = 'solid' | 'glassy' | 'floating' | 'dense'

export type XPos = 'left' | 'right' | 'center' | 'full'
export type YPos = 'top' | 'bottom' | 'middle' | 'full'

/**
 * All possible positions for `Inspect.Panel`
 */
export type PositionProp<X extends XPos = XPos, Y extends YPos = YPos> =
  | (X extends 'center' | 'full'
      ? `${XPos} ${Exclude<YPos, 'full' | 'middle'>}`
      : Y extends 'middle' | 'full'
        ? `${Exclude<XPos, 'full' | 'center'>} ${YPos}`
        : never)
  | ('left' | 'right')

/**
 * Props / settings that can be changed within the `Inspect.Panel` UI.
 */
export type PanelSettings = {
  /**
   * Initial panel position
   *
   * Format: `'<x-position> <y-position?>'` (y is optional)
   *
   * x-position can be one of `'left' | 'right' | 'center' | 'full'`
   *
   * y-position can be one of `'top' | 'bottom' | 'middle' | 'full'`
   *
   * *Note: if only x-position is given it can only be `'left'` or `'right'`*
   *
   * **Bindable**
   * @example
   * ```svelte
   * <Inspect.Panel align="left">
   * <Inspect.Panel align="right middle">
   * <Inspect.Panel align="center top">
   * ```
   *
   * @default 'right full'
   */
  align?: PositionProp
  /**
   * Initially open panel
   *
   * **Bindable**
   * @default false
   */
  open?: boolean
  /**
   * Sets appearance of panel.
   *
   * Can be `'solid'|'glassy'|'dense'|'floating'`
   *
   * **Bindable**
   * @default 'solid'
   */
  appearance?: PanelAppearance
  /**
   *
   * Apply opacity to the panel when not hovered or focused
   *
   * **Bindable**
   * @default false
   */
  opacity?: boolean
}

/**
 * Props for `Inspect.Panel`
 *
 * @see {@link InspectOptions}
 */
export type PanelProps = {
  /**
   * Panel should open on hover.
   *
   * Enabling this will leave part of the panel visible for easier reach.
   *
   * @default false
   */
  openOnHover?: boolean
  /**
   * Don't render Panel toolbar with controls for setting position, opacity and appearance
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
   * Extra elements to be added at the bottom of the panel
   */
  children?: import('svelte').Snippet
  /**
   * Z-index of panel
   *
   * @default 1000
   */
  zIndex?: number
  /**
   * When closed, wiggle the panel button when an inspected value is updated
   *
   * @default true
   */
  wiggleOnUpdate?: boolean
  /**
   * Callback for when panel is opened or closed
   *
   * @param open
   * @default undefined
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Callback for when any panel prop/setting is changed with the panel UI. Can be used for
   * persisting settings using `localStorage`
   *
   * Will run when any of the following prop / setting is changed:
   *
   * - `open`
   * - `align`
   * - `appearance`
   * - `opacity`
   * @param {Required<PanelSettings>} settings Current value of settings
   * @default undefined
   * @see {@link PanelSettings}
   */
  onSettingsChange?: (settings: Required<PanelSettings>) => void
} & BaseProps &
  PanelSettings &
  Partial<InspectOptions> &
  SvelteHTMLElements['aside']

/**
 * @inline
 */
export type Note = { title?: string; description?: string }

export type TypeViewProps<Value = unknown, Type = ValueType> = {
  value: Value
  key?: PropertyKey
  /**
   * Prefix for key e.g. "get" or "static"
   */
  keyPrefix?: string
  /**
   * Should key be shown
   */
  showKey?: boolean
  /**
   * Key delimiter
   */
  keyDelim?: string
  /**
   * Style overrides for key
   */
  keyStyle?: HTMLAttributes<HTMLDivElement>['style']
  /**
   * Path of the node
   */
  path?: PropertyKey[]
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
  /**
   * Title / description for node note, e.g. "parsed" for parsed JSON strings
   */
  note?: Note
  /**
   * The node is a search match
   */
  match?: boolean
  /**
   * Number of child entries / items.
   * Also determines if expandables can be expanded (needs to be not `undefined`/`null`/`zero`).
   */
  length?: number
  /**
   * Should the node show it's given length / count
   */
  showLength?: boolean
}

/**
 * Options for `Inspect.Values`
 *
 * Includes `elementAttributes` for setting HTML-attributes on the element without using props.
 */
export type InspectValuesOptions = () => Partial<InspectOptions> & {
  /**
   * HTML-attributes (like `class` and `style`) that will be applied to the `Inspect.Values`-element.
   *
   * Will be overwritten, not merged if a child-variation defined with `withOptions` defines this object.
   */
  elementAttributes?: SvelteHTMLElements['div']
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
 *
 * @see {@linkcode TypeViewProps}
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

export type SecondArgOf<T> = T extends (
  first: any,
  second: infer SecondArgument,
  ...args: any[]
) => any
  ? SecondArgument
  : never
