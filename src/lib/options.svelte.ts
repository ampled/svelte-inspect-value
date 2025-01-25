import { getContext, setContext, untrack } from 'svelte'
import type { CustomComponents } from './types.js'

export const OPTIONS_CONTEXT = Symbol('inspect-options')
export const GLOBAL_OPTIONS_CONTEXT = Symbol('inspect-options')

export type JSONInspectOptions = {
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
   * Options open or closed
   *
   * Default `false`
   */
  open: boolean
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
   * Make the Inspect element draggable (powered by \@neodrag/svelte)
   *
   * Default `false`
   */
  draggable: boolean
  /**
   * Disable animations
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
   * Available themes: `'drak'|'monokai'|'default-dark'|'default-light'|'solarized-dark'|'cotton-candy'`
   *
   * Default `'drak'`
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

  embedMedia: boolean
}

const DEFAULT_OPTIONS: JSONInspectOptions = {
  open: false,
  draggable: false,
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
  theme: 'drak',
  expandAll: false,
  borderless: false,
  customComponents: {},
  expandLevel: 1,
  embedMedia: false,
} as const

export function mergeOptions(
  fromProps: Partial<JSONInspectOptions>,
  fromContext: Partial<JSONInspectOptions> = {}
) {
  const definedPropOptions = Object.entries(fromProps).filter(([, v]) => v != null)

  return {
    ...DEFAULT_OPTIONS,
    ...fromContext,
    ...Object.fromEntries(definedPropOptions),
  }
}

export function createOptions(options: () => JSONInspectOptions) {
  let value: JSONInspectOptions = $state(options())

  return {
    get value() {
      return value
    },
    set value(val: JSONInspectOptions) {
      value = val
    },
    setOptions(options: Partial<JSONInspectOptions>) {
      untrack(() => {
        value = {
          ...value,
          ...options,
        }
      })
    },
  }
}

export type OptionsContext = ReturnType<typeof createOptions>

export function setGlobalInspectOptions(options: Partial<JSONInspectOptions>) {
  return setContext(GLOBAL_OPTIONS_CONTEXT, options)
}

export function useOptions(): OptionsContext {
  return getContext<OptionsContext>(OPTIONS_CONTEXT)
}
