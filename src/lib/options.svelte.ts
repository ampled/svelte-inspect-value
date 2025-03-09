import { getContext, setContext } from 'svelte'
import type { CustomComponents } from './types.js'

export const OPTIONS_CONTEXT = Symbol('inspect-options')
export const GLOBAL_OPTIONS_CONTEXT = Symbol('inspect-options')

export type InspectOptions = {
  /**
   * Display length of arrays or strings and number of nested entries in objects / maps etc
   *
   * Default `true`
   */
  showLength: boolean
  /**
   * Display type labels before values e.g. "string" / "number"
   * Does not affect class / function / promise
   *
   * Default `true`
   */
  showTypes: boolean
  /**
   * Display preview of nested values
   *
   * Default `true`
   */
  showPreview: boolean
  /**
   * How many entries / items of arrays, objects, maps, sets etc. to preview
   *
   * Default 3
   */
  previewEntries: number
  /**
   * How many levels of nested values to preview before showing only type
   *
   * Default: 1
   */
  previewDepth: number
  /**
   * Indicate when a value or child value is updated
   *
   * Default `true`
   */
  flashOnUpdate: boolean
  /**
   *
   * Default `true`
   */
  showTools: boolean
  /**
   * Set a max display length for string values. `0` means display full string
   *
   * Default `0`
   */
  stringCollapse: number
  /**
   * Custom components for types. Object with type as keyname and tuple of component and optional
   * prop modification function
   *
   * @example
   *
   * import CustomBigIntDisplay from './CustomBigIntDisplay.svelte'
   *
   * // ...
   *
   * const customComponents = {
   *  bigint: [
   *     CustomBigIntDisplay,
   *     // OPTIONAL
   *     (props: TypeViewProps<bigint>) => ({ display: props.value.toString() + 'n' })
   *   ]
   * }
   *
   * // ...
   *
   * <Inspect {customComponents} />
   */
  customComponents: CustomComponents
  /**
   * Disable animations
   *
   * Default `false`
   */
  noanimate: boolean
  /**
   * Use no borders and transparent background
   *
   * Default `false`
   */
  borderless: boolean
  /**
   * Display string values with double or single quotes
   *
   * Default `'single'`
   */
  quotes: 'single' | 'double'
  /**
   * Set color theme class
   *
   * Available themes: `'inspect'|'drak'|'monokai'|'default-dark'|'default-light'|'solarized-dark'|'cotton-candy'`
   *
   * Default `'inspect'`
   */
  theme: string
  /**
   * Expand all expandable nodes by default
   *
   * Default `false`
   */
  expandAll: boolean
  /**
   * Default expanded level
   *
   * Default `1`
   */
  expandLevel: number
  /**
   * Initially expanded paths
   *
   * Default `[ ]`
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
   * Default `false`
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
   * Default `'simple'`
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
   * Default `true`
   */
  renderIf: unknown
  /**
   * Try parsing strings that start with `'['` or `'{'` and display the parsed value
   *
   * Default `false`
   */
  parseJson: boolean
  /**
   * Custom callback run when clicking copy tool-button.
   * If this option is set without passing a function to `canCopy`, the
   * copy button will be shown for all values.
   *
   * This overrides the default copy-button behavior.
   *
   * Default `undefined`
   *
   * @see {@link InspectOptions.canCopy}
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
   * Default `undefined`
   */
  canCopy: ((value: unknown, type: string, path: unknown[]) => boolean) | undefined
  /**
   * Custom callback run when clicking log tool-button.
   *
   * This overrides the default log-button behavior.
   *
   * Default `undefined`
   */
  onLog: ((value: unknown, type: string, path: unknown[]) => void) | undefined
}

const DEFAULT_OPTIONS: InspectOptions = {
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
} as const

export function mergeOptions(
  fromProps: Partial<InspectOptions>,
  fromContext: Partial<InspectOptions> = {}
) {
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
  const expandLevel = $derived(options().expandAll ? 100 : options().expandLevel)

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
