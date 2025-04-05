import { getContext, setContext } from 'svelte'
import type { InspectState } from './state.svelte.js'
import type { CustomComponents } from './types.js'
import { clamp } from './util.js'

export const OPTIONS_CONTEXT = Symbol('inspect-options')
export const GLOBAL_OPTIONS_CONTEXT = Symbol('inspect-options')

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
   * @Default true
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
   * Use the helper function `addComponent` to get properly typed props for the custom component.
   *
   * @example
   * // script
   * import Inspect, {addComponent} from 'svelte-inspect-value'
   * import HexColorDisplay from './HexColorDisplay.svelte'
   * import CustomBigIntDisplay from './CustomBigIntDisplay.svelte'
   *
   * // template
   * <Inspect customComponents={{
   *    bigint: [CustomBigIntDisplay],
   *    string: addComponent(
   *      HexColorDisplay,
   *      // transform props or pass extra props
   *      (props) => props,
   *      // revert to default string component if false
   *      (props) => props.value.startsWith('#'))
   * }} />
   *
   * @default {}
   */
  customComponents: CustomComponents
  /**
   * Disable animations
   *
   * @default false
   */
  noanimate: boolean
  /**
   * Use no borders and transparent background
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
   * Available themes: `'inspect'|'drak'|'stereo'|'dark'|'light'|'plain'|'cotton-candy'`
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
   * const value = {
   *  a: { b: [{ c: '' }], d: 0 }
   * }
   *
   * // default name of root expandable is "root"
   * <Inspect {value} expandPaths={['root.a.b.0']} />
   * // if name is set:
   * <Inspect {value} name="obj" expandPaths={['obj.a.b.0']}
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
   *
   * `'simple'` - minimal list of properties including classList, styles, dataset and current scrollPositions
   *
   * `'full'` - lists all enumerable properties of an element
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
   * @returns {boolean | Promise<boolean>} boolean or Promise resolving to boolean indicating copying value was successful if true. The copy button will change color on success.
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
  onCollapseChange: ((state: InspectState) => void) | undefined
  /**
   * Enable or disable svelte-store inspection.
   * Objects with a `subscribe` method will be inspected as stores and show their subscription value.
   *
   * @default true
   */
  stores: boolean
}

export const DEFAULT_OPTIONS: InspectOptions = {
  noanimate: false,
  quotes: 'single',
  showTypes: true,
  showPreview: true,
  previewDepth: 1,
  previewEntries: 3,
  flashOnUpdate: true,
  showLength: true,
  showTools: true,
  stringCollapse: 0,
  theme: 'inspect',
  borderless: false,
  customComponents: {},
  expandAll: false,
  expandLevel: 1,
  expandPaths: [],
  embedMedia: false,
  elementView: 'simple',
  renderIf: true,
  parseJson: false,
  onCopy: undefined,
  canCopy: undefined,
  onLog: undefined,
  onCollapseChange: undefined,
  stores: true,
} as const

export const OPTIONS_KEYS = Object.keys(DEFAULT_OPTIONS) as (keyof InspectOptions)[]

export function mergeOptions(
  fromProps: Partial<InspectOptions>,
  fromContext: Partial<InspectOptions> = {}
): InspectOptions {
  const definedPropOptions = Object.entries(fromProps).filter(([, v]) => v != null)
  return {
    ...DEFAULT_OPTIONS,
    ...fromContext,
    ...Object.fromEntries(definedPropOptions),
  }
}

export function createOptions(options: () => InspectOptions) {
  const transitionDuration = $derived(options().noanimate ? 0 : 200)
  // this could be Infinity but let's set a cap just to be sure
  const expandLevel = $derived(clamp(options().expandAll ? 30 : options().expandLevel, 0, 30))

  return {
    get value() {
      return options()
    },
    get transitionDuration() {
      return transitionDuration
    },
    get expandLevel() {
      return expandLevel
    },
  }
}

export type OptionsContext = ReturnType<typeof createOptions>

export function setGlobalInspectOptions(
  options: Partial<InspectOptions> | (() => Partial<InspectOptions>)
) {
  if (typeof options !== 'function') {
    console.warn(`[SVELTE-INSPECT-VALUE]:
Passing global options as an object is deprecated and will be removed in a future version.
Reactivity is not guaranteed.
Set global options like this instead: setGlobalInspectOptions(() => {options value})`)
  }

  return setContext(GLOBAL_OPTIONS_CONTEXT, options)
}

export function useOptions(): OptionsContext {
  return getContext<OptionsContext>(OPTIONS_CONTEXT)
}
