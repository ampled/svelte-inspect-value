/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ValueType } from './util.js'

/** @inline */
export type NodeState = {
  collapsed: boolean
}

/** @inline */
export type CollapseState = Record<string, NodeState>

/**
 *
 * Various options to configure the look and feel of components exported by `'svelte-inspect-value'`
 *
 * These can be set directly on `Inspect` and `Inspect.Panel` as props, or "globally" using
 * {@link setGlobalInspectOptions} or `InspectOptionsProvider`
 * Props will override any options using the provider methods.
 *
 * @example
 * ```svelte
 * <script>
 *  import Inspect, {InspectOptionsProvider} from 'svelte-inspect-value'
 *  import data from './data.js'
 * </script>
 *
 * <InspectOptionsProvider options={{ expandLevel: 3, theme: 'light' }}>
 *   <Inspect value={data} expandLevel={20} /> <!-- override expandLevel -->
 * </InspectOptionsProvider>
 * ```
 */
export type InspectOptions = {
  /**
   * Display length of arrays or strings and number of nested entries in objects / maps etc
   *
   * @default true
   */
  showLength: boolean
  /**
   * Display type labels before values e.g. "string" / "number"
   * Does not affect class / function / promise
   *
   * @default true
   */
  showTypes: boolean
  /**
   * Display preview of nested values
   *
   * @default true
   */
  showPreview: boolean
  /**
   * How many entries / items of arrays, objects, maps, sets etc. to preview
   *
   * @default 3
   */
  previewEntries: number
  /**
   * How many levels of nested values to preview before "collapsing" nested values to their type only
   *
   * @default 1
   */
  previewDepth: number
  /**
   * Indicate when a value or child value is updated
   *
   * @default true
   */
  flashOnUpdate: boolean
  /**
   * Enable or disable "tool-buttons" that appear on hovering a value.
   *
   * @default true
   */
  showTools: boolean
  /**
   * Set a max display length for string values. `0` means display full string
   *
   * @default 0
   */
  stringCollapse: number
  /**
   * Custom components for displaying types.
   * An object with type as keyname and array of component and optional
   * prop modification function and predicate determining if custom component should be used.
   *
   * Use the helper function {@linkcode util.addComponent | addComponent} to get properly typed props for the custom component.
   *
   * @example
   * ```svelte
   * <script lang="ts">
   *  import Inspect, {addComponent} from 'svelte-inspect-value'
   *  import HexColorDisplay from './HexColorDisplay.svelte'
   *  import CustomBigIntDisplay from './CustomBigIntDisplay.svelte'
   * </script>
   *
   * <Inspect customComponents={{
   *    bigint: [CustomBigIntDisplay],
   *    string: addComponent(
   *      HexColorDisplay,
   *      // transform props or pass extra props
   *      (props) => props,
   *      // revert to default string component if false
   *      (props) => props.value.startsWith('#'))
   * }} />
   * ```
   *
   * @default {}
   */
  customComponents: unknown
  /**
   * Disable all animations (both css and Svelte transitions)
   *
   * @default false
   */
  noanimate: boolean
  /**
   * Set transition / animation rates
   *
   * `0.5` will double transition durations while `2` will halve durations.
   *
   * The base duration for transitions is 250ms.
   *
   * @default 1
   */
  animRate: number
  /**
   * Easing-function for expand/collapse transitions
   *
   * @default (t) => Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0; // quartOut
   */
  easing: ((t: number) => number) | undefined
  /**
   * Render no borders or background
   *
   * @default false
   */
  borderless: boolean
  /**
   * Display string values with double or single quotes
   *
   * @default 'single'
   */
  quotes: 'single' | 'double' | 'none'
  /**
   * Set color theme class
   *
   * Available themes: `'inspect'|'drak'|'stereo'|'dark'|'light'|'plain'
   *
   * @default 'inspect'
   */
  theme: ('inspect' | 'drak' | 'stereo' | 'dark' | 'light' | 'plain') | (string & {})
  /**
   * Expand all expandable nodes by default
   *
   * @default false
   */
  expandAll: boolean
  /**
   * Default expanded level
   *
   * @default 1
   */
  expandLevel: number
  /**
   * Initially expanded paths
   *
   * @default []
   * @example
   * ```svelte
   * <script>
   *  import Inspect from 'svelte-inspect-value'
   *
   *  const value = {
   *   a: { b: [{ c: '' }], d: 0 }
   *  }
   * </script>
   *
   * <!-- default name of root expandable is "root" -->
   * <Inspect {value} expandPaths={['root.a.b.0']} />
   * <!-- if name is set -->
   * <Inspect {value} name="obj" expandPaths={['obj.a.b.0']} />
   * ```
   */
  expandPaths: string[]
  /**
   * Embed images or sounds if a string is a url or path ending with a valid image or sound file extension
   *
   * @default false
   */
  embedMedia: boolean
  /**
   * Determines what properties are shown when inspecting HTML elements
   *
   * - `'simple'` - minimal list of properties including classList, styles, dataset and current scrollPositions
   * - `'full'` - lists all enumerable properties of an element
   *
   * @default 'simple'
   */
  elementView: 'simple' | 'full'
  /**
   * Render condition for `Inspect`
   *
   * Function or value. `Inspect` will render if value or return-value is truthy.
   *
   * Most valuable if set with global options and there are multiple `Inspect` instances,
   * otherwise using Svelte `{#if}{/if}` blocks is recommended.
   *
   * @default true
   */
  renderIf: unknown
  /**
   * Try parsing strings that start with `'['` or `'{'` and display the parsed value
   *
   * @default false
   */
  parseJson: boolean
  /**
   * Custom callback run when clicking copy tool-button.
   * If this option is set without passing a function to `canCopy`, the
   * copy button will be shown for all values.
   *
   * This overrides the default copy-button behavior.
   *
   * @see {@link InspectOptions.canCopy}
   * @returns {boolean | Promise<boolean>} `boolean` or `Promise` resolving to boolean indicating copying value was successful if true. The copy button will change color on success.
   * @default undefined
   */
  onCopy:
    | ((
        value: unknown,
        type: string,
        path: unknown[]
      ) => Promise<boolean | void> | (boolean | void))
    | undefined
  /**
   * Custom predicate that determines if copy-button should be displayed for a value
   *
   * @default undefined
   */
  canCopy: ((value: unknown, type: string, path: unknown[]) => boolean) | undefined
  /**
   * Custom callback run when clicking log tool-button.
   *
   * This overrides the default log-button behavior.
   *
   * @default undefined
   */
  onLog: ((value: unknown, type: string, path: unknown[]) => void) | undefined
  /**
   * Called whenever a node is collapsed or expanded.
   *
   * @default undefined
   */
  onCollapseChange: ((state: CollapseState) => void) | undefined
  /**
   * Enable or disable svelte-store inspection.
   * Objects with a `subscribe` method will be inspected as stores and show their subscription value.
   *
   * Set to `true`, `'value-only'` or `'full'` to enable.
   *
   * - `'full' | true` - render store value as nested value along with other properties on the store object
   * - `'value-only'` - render store value only along with a note indicating the value was retrieved from a store
   *
   * @default 'full'
   */
  stores: boolean | 'value-only' | 'full'
  /**
   * Enable or disable search functionality.
   *
   * Three modes are available:
   *
   * - `'filter' | true` - children and siblings of matching nodes will be visible
   * - `'filter-strict'` - only matches will be visible
   * - `'highlight'` - no nodes will be hidden, but matches will be highlighted
   *
   * @default false
   */
  search: boolean | 'highlight' | 'filter' | 'filter-strict'
  /**
   * Initial multi-term search mode
   *
   * - `'and'` - nodes must match every term
   * - `'or'` - nodes can match one of the terms
   *
   * @default 'or'
   */
  searchMode: 'and' | 'or'
  /**
   * When `search` is enabled, highlight matches in keys,
   * types and values when typing in the search input box.
   *
   * @see {@link InspectOptions.search}
   * @default true
   */
  highlightMatches: boolean
  /**
   * A `string` or `Snippet` that will be rendered as a small heading with a collapse-button for the component.
   *
   * The snippet parameter indicates if the instance has been collapsed
   */
  heading: boolean | string
  /**
   * Configures hotkeys using {@link https://github.com/jamiebuilds/tinykeys | tinykeys} syntax.
   *
   * Use an object to override defaults, `true` to use defaults and `false` to disable hotkeys
   *
   * @see {@link InspectHotkeys}
   * @default { search: 'Shift+$mod+F', expandTop: '$mod+ArrowRight', collapseTop: '$mod+ArrowLeft' }
   * @since 0.11.0
   */
  hotkeys: Partial<InspectHotkeys> | boolean
  /**
   * Disables using arrow keys, home, end, enter and space to navigate or expand/collapse nodes when
   * a node is focused.
   *
   * @default false
   * @since 0.11.0
   */
  disableKeynav: boolean
  /**
   * Enables typing to focus any node with matching text when any node is focused.
   *
   * @default true
   * @since 0.11.0
   */
  typeToFocus: boolean
}

/**
 * Hotkeys configuration using {@link https://github.com/jamiebuilds/tinykeys | tinykeys} syntax.
 *
 * Note: The string `'$mod'` means "command" on macOS and "ctrl" on Windows / Linux
 *
 * @example
 * ```svelte
 * <Inspect hotkeys={{
 *  expandTop: 'Shift+$mod+ArrowUp', // override
 *  collapseTop: false // disable
 *  // search: '' // keeps default if omitted
 * }} />
 * ```
 *
 * @see {@link InspectOptions.hotkeys}
 */
export type InspectHotkeys = {
  /**
   * Hotkey for focusing search field if {@linkcode InspectOptions.search | search} is enabled
   *
   * @default 'Shift+$mod+F'
   */
  search: string | false
  /**
   * Hotkey for expanding all top level nodes
   *
   * @default '$mod+ArrowRight'
   */
  expandTop: string | false
  /**
   * Hotkey for collapsing all top level nodes
   *
   * @default '$mod+ArrowLeft'
   */
  collapseTop: string | false
}

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
   * If value is `undefined` or `null` without `name` being set,
   * the value will not be inspected
   */
  value?: unknown
  /**
   * Inspect every enumerable property of a value, object or array-like.
   *
   * Allows for multiple root-level nodes, unlike `value`.
   */
  values?: unknown
  /**
   * Name of inspected value. Will be displayed as the "key" of the value.
   *
   * Will not be used if `values` is set
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
export type InspectProps = BaseProps & Partial<InspectOptions>

/**
 * @inline
 */
export type PanelAppearance = 'solid' | 'glassy' | 'floating' | 'dense'

export type XPos = 'left' | 'right' | 'center' | 'full'
export type YPos = 'top' | 'bottom' | 'middle' | 'full'
export type Direction = 'right' | 'left' | 'top' | 'bottom'

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
 * Options for persisting `Inspect.Panel` state or configuration using the Panel UI.
 */
export type PanelPersistProps = {
  /**
   * Storage key used with local/session storage
   *
   * @default 'siv.panel'
   */
  key?: string
  /**
   * The storage type to use.
   * @default 'local'
   */
  storage?: 'local' | 'session'
  /**
   * Enable or disable syncing the state changes from other tabs.
   * @default false
   */
  syncTabs?: boolean
}

/**
 * Props / settings that can be changed within the `Inspect.Panel` UI.
 *
 * These can be persisted using built-in logic with `persist` or
 * customized logic using the `onSettingsChange`-callback
 *
 * @see {@link PanelProps.persist}
 * @see {@link PanelProps.onSettingsChange}
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
  align: PositionProp
  /**
   * Initially open panel
   *
   * **Bindable**
   * @default false
   */
  open: boolean
  /**
   * Sets appearance of panel.
   *
   * Can be `'solid'|'glassy'|'dense'|'floating'`
   *
   * **Bindable**
   * @default 'solid'
   */
  appearance: PanelAppearance
  /**
   *
   * Apply opacity to the panel when not hovered or focused
   *
   * **Bindable**
   * @default false
   */
  opacity: boolean
  /**
   * Panel width in pixels.
   *
   * Not used if x-position in `align` is `'full'`
   *
   * **Bindable**
   * @default undefined
   */
  width?: number | undefined
  /**
   * Panel height in pixels
   *
   * Not used if y-position in `align` is `'full'`
   *
   * **Bindable**
   * @default undefined
   */
  height?: number | undefined
}

/**
 * Props for `Inspect.Panel`
 *
 * @see {@link InspectOptions}
 * @see {@link PanelSettings}
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
  children?: unknown
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
   * customized persisting of settings using `localStorage`
   *
   * Will run when any of the following prop / setting is changed:
   *
   * - `open`
   * - `align`
   * - `appearance`
   * - `opacity`
   * - `width` and `height` (if resizing is enabled)
   * @param {Required<PanelSettings>} settings Current value of settings
   * @param {(keyof PanelSettings[])} changed Keys of changed settings
   * @default undefined
   * @see {@link PanelSettings}
   */
  onSettingsChange?: (settings: PanelSettings, changed: (keyof PanelSettings)[]) => void
  /**
   * Enable/disable persistence of {@linkcode PanelSettings} using localStorage or sessionStorage
   * when changed through Panel UI, e.g. open/closed state, width, height, appearance, alignment and opacity setting.
   *
   * When enabled, stored settings will take precedence over passed props.
   *
   * Pass a configuration object ({@link PanelPersistProps}), `true` or a string (storage key) to enable.
   *
   * Passing `true` will enable persistence and using these default options:
   * ```typescript
   * {
   *  storage: 'local',
   *  key: 'siv.panel',
   *  syncTabs: false
   * }
   * ```
   * Passing a string will use those defaults but use the passed string as the key
   *
   * @default false
   * @see {@link PanelPersistProps}
   */
  persist?: boolean | string | PanelPersistProps
  /**
   * Alias for `persist` except tab syncing is always enabled.
   *
   * If `persist` is truthy this prop will not have any effect.
   *
   * @default false
   * @see {@link PanelProps.persist}
   * @see {@link PanelPersistProps.syncTabs}
   */
  persistSync?: boolean | string | Omit<PanelPersistProps, 'syncTabs'>
} & BaseProps &
  Partial<PanelSettings> &
  Partial<InspectOptions>

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
  keyStyle?: string
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
  elementAttributes?: unknown
}

export class InspectError extends Error {
  private errorValue: unknown
  public get value() {
    return this.errorValue
  }

  override name = 'InspectError'

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
