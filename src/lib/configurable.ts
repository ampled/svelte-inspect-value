import { setContext } from 'svelte'
import ValuesBase from './InspectValues.svelte'
import type { InspectOptions } from './options.svelte.js'
import type { InspectValuesOptions, IntRange } from './types.js'

export type ConfigurableOptions = () => Partial<InspectValuesOptions>

type ExpandRange = IntRange<0, 11>

/** Set initial expandLevel */
type ExpandKey = `Expand${ExpandRange}`

export type Configurable<T> = T & {
  /**
   * Configure `Inspect.Values` or other variants created with `withOptions` or `configured`
   *
   * The component will also inherit options set with `setGlobalInspectOptions` or `InspectOptionsProvider`.
   *
   * "Global" options will be overriden by options passed to this method.
   *
   * @example
   * ```svelte
   * <script>
   *  import Inspect from 'svelte-inspect-value'
   *
   *  const InspectValues = Inspect.withOptions(() => ({ theme: 'plain', showPreview: false }))
   *  const Ins = InspectValues.withOptions(() => ({ showTypes: false })) // inherits from InspectValues
   *
   *  let str = 'hi'
   *  let obj = {}
   * </script>
   *
   * <InspectValues {str} {obj} arr={[1,2,3]} />
   * ```
   */
  withOptions: (options: ConfigurableOptions) => Configurable<T>
  /** Initially expand all nodes (max 30) */
  ExpandAll: Configurable<T>
} & {
  [key in ExpandKey]: Configurable<T>
} & {
  /**
   * Use chainable inline configuration in a template.
   * Complete configuration and return component with `Ok`
   *
   * Will override global options and options passed with `withOptions`
   *
   * @example
   * ```svelte
   * <script>
   *  import Inspect from 'svelte-inspect-value'
   *  import data from './data.js'
   * </script>
   *
   * <Inspect.Values.Expand0.Config.Borderless.DoubleQuotes.DarkTheme.Ok
   *  {data}
   * />
   * ```
   */
  Config: InlineConfig<T>
}

export type InlineConfig<T> = {
  [key in keyof typeof optionProps]: InlineConfig<T>
} & {
  /**
   * Finish inline configuration and return component
   */
  Ok: Configurable<T>
}

const optionProps = {
  DarkTheme: { theme: 'dark' },
  LightTheme: { theme: 'light' },
  DrakTheme: { theme: 'drak' },
  StereoTheme: { theme: 'stereo' },
  DefaultTheme: { theme: 'inspect' },
  PlainTheme: { theme: 'plain' },
  /** Render with no background color or border */
  Borderless: { borderless: true },
  /** Render with background color or border */
  Border: { borderless: false },
  /** Disable animations */
  NoAnimate: { noanimate: true },
  /** Enable animations */
  Animate: { noanimate: false },
  /** Initially expand all props */
  ExpandAll: { expandAll: true },
  /** Disable row tools */
  NoTools: { showTools: false },
  /** Enable row tools */
  ShowTools: { showTools: true },
  /** Disable display of counts of object entries, array items, string lengths etc.  */
  NoLength: { showLength: false },
  /** Enable display of counts of object entries, array items, string lengths etc.  */
  ShowLength: { showLength: false },
  /** Disable display of types of values */
  NoTypes: { showTypes: false },
  /** Enable display of types of values */
  ShowTypes: { showTypes: false },
  /** Disable preview of nested values */
  NoPreview: { showPreview: false },
  /** Enable preview of nested values */
  ShowPreview: { showPreview: false },
  /** Enable parsing stringified JSON arrays and Objects */
  ParseJSON: { parseJson: true },
  /** Enable inspecting Svelte stores / observables */
  Stores: { stores: true },
  /** Disable inspecting Svelte store / observables */
  NoStores: { stores: false },
  /** Enable embedding images and sounds */
  EmbedMedia: { embedMedia: true },
  SingleQuotes: { quotes: 'single' },
  DoubleQuotes: { quotes: 'double' },
  NoQuotes: { quotes: 'none' },
} as const satisfies Record<string, Partial<InspectOptions>>

export function createConfigurable<T>(
  component: Configurable<T>,
  inheritOptions: ConfigurableOptions
): Configurable<T> {
  // declare
  component.withOptions = function (options: ConfigurableOptions) {
    const merged: ConfigurableOptions = () => ({ ...inheritOptions(), ...options() })

    // wrapper component
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function wrapped(...args: any[]) {
      setContext(Symbol.for('siv.with-options'), merged)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (ValuesBase as any)(...args) as Configurable<T>
    }

    return createConfigurable(wrapped as Configurable<T>, merged)
  }

  if (!Object.hasOwn(component, 'Config')) {
    const cfg = {
      config: {},
      get Ok() {
        return component.withOptions(() => ({ ...inheritOptions(), ...this.config }))
      },
    }

    Object.entries(optionProps).forEach(([property, options]) => {
      Object.defineProperty(cfg, property, {
        get(this: typeof cfg) {
          this.config = { ...this.config, ...options }
          return this
        },
      })
    })

    Object.defineProperty(component, 'Config', {
      value: cfg,
    })
  }

  for (let i = 0; i <= 10; i++) {
    if (!Object.hasOwn(component, `Expand${i}`)) {
      Object.defineProperty(component, `Expand${i}`, {
        get: function () {
          return component.withOptions(() => ({ ...inheritOptions(), expandLevel: i }))
        },
      })
    }
  }

  if (!Object.hasOwn(component, 'ExpandAll')) {
    Object.defineProperty(component, 'ExpandAll', {
      get() {
        return component.withOptions(() => ({ ...inheritOptions(), expandAll: true }))
      },
    })
  }

  return component
}

export const InspectValues = createConfigurable(
  ValuesBase as Configurable<typeof ValuesBase>,
  () => ({})
)

/**
 * Creates a pre-configured Inspect-component that will inspect any value passed to it
 * instead of using the `value`-prop.
 *
 * The component will also inherit options set with `setGlobalInspectOptions` or `InspectOptionsProvider`.
 *
 * "Global" options will be overriden by options passed to this method.
 *
 * @example
 * ```svelte
 * <script>
 *  import {configured} from 'svelte-inspect-value'
 *
 *  const Inspect = configured(() => ({ theme: 'plain', borderless: true, showPreview: false }))
 *
 *  let str = 'hi'
 *  let obj = {}
 * </script>
 *
 * <Inspect {str} {obj} arr={[1,2,3]} />
 * ```
 *
 * @see setGlobalInspectOptions
 * @see {@link Inspect.Values}
 */
export function configured(options: ConfigurableOptions) {
  return InspectValues.withOptions(options)
}
