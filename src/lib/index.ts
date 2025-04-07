import type { Component } from 'svelte'
import { InspectValues, type Configurable } from './configurable.js'
import InspectBase from './Inspect.svelte'
import { setGlobalInspectOptions } from './options.svelte.js'
;(InspectBase as unknown as { Values: typeof InspectValues }).Values = InspectValues

export const Inspect = InspectBase as typeof InspectBase & {
  /**
   * Another version of `Inspect` that will inspect any value passed to it instead of using the `value`-prop.
   *
   * @example
   * ```svelte
   * <script>
   *  import Inspect from 'svelte-inspect-value'
   *
   *  const DarkInspect = Inspect.Values.withOptions(() => ({ theme: 'dark' }))
   *
   *  let str = 'hi'
   *  let obj = { a: 1 }
   * </script>
   *
   * <Inspect.Values {str} {obj} arr={[1,2,3]} />
   *
   * <DarkInspect {...obj} />
   * ```
   */
  Values: Configurable<Component<Record<string, unknown>>>
}

export { configured } from './configurable.js'
export { default as CustomExpandable } from './CustomExpandable.svelte'
export { default as CustomLine } from './CustomLine.svelte'
export { default as InspectOptionsProvider } from './InspectOptionsProvider.svelte'
export { GLOBAL_OPTIONS_CONTEXT, type InspectOptions } from './options.svelte.js'
export type { CustomComponentProps, CustomComponents, InspectValuesOptions } from './types.js'
export { addComponent } from './util.js'
export { setGlobalInspectOptions }
export default Inspect
