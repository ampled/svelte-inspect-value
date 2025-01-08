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
}

export function createOptions(options: Partial<JSONInspectOptions>) {
  let value: JSONInspectOptions = $state({
    open: false,
    draggable: false,
    noanimate: false,
    quotes: 'single',
    showTypes: true,
    showPreview: true,
    showLength: true,
    showTools: true,
    stringCollapse: 0,
    theme: 'drak',
    expandAll: false,
    customComponents: {},
    expandLevel: 1,
    ...options,
  })

  return {
    get value() {
      // createSub
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
