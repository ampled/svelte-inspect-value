import type { Component } from 'svelte'
import { InspectValues, type Configurable } from './configurable.js'
import InspectBase from './Inspect.svelte'
import Panel from './Panel.svelte'
import type { InspectProps, PanelProps } from './types.js'
;(InspectBase as unknown as { Values: typeof InspectValues }).Values = InspectValues
;(InspectBase as unknown as { Panel: typeof Panel }).Panel = Panel

/**
 * Value-inspector component.
 *
 * Also used to access variations of the component: {@linkcode Inspect.Values} and {@linkcode Inspect.Panel}
 *
 * @see {@link InspectProps}
 *
 * @example
 * ```svelte
 * <script>
 *  import Inspect from 'svelte-inspect-value'
 *  import data from './data.js'
 * </script>
 *
 * <Inspect value={data} />
 * <Inspect.Values {data} />
 * <Inspect.Panel value={data} />
 * ```
 */
export const Inspect = InspectBase as unknown as Component<InspectProps> & {
  /**
   * Another version of `Inspect` that will inspect any value passed to it instead of using the `value`-prop.
   *
   * Configure using `setGlobalInspectOptions`, {@linkcode [InspectOptionsProvider](./InspectOptionsProvider.svelte)},
   * {@linkcode InspectValues.withOptions} or chainable inline configuration ({@linkcode InspectValues.Config})
   * listed in order of priority.
   *
   * @example
   * ```svelte
   * <script>
   *  import Inspect from 'svelte-inspect-value'
   *
   *  const InspectValues = Inspect.Values.withOptions(() => ({ expandLevel: 2 }))
   *  const DarkInspect = InspectValues.withOptions(() => ({ theme: 'dark' }))
   *
   *  let str = 'hi'
   *  let obj = { a: 1 }
   * </script>
   *
   * <!-- unconfigured -->
   * <Inspect.Values {str} {obj} />
   *
   * <!-- configured with withOptions -->
   * <InspectValues {str} {obj} arr={[1,2,3]} />
   *
   * <!-- configured with withOptions. Will inherit expandLevel from InspectValues -->
   * <DarkInspect {...obj} />
   *
   * <!-- chainable inline config -->
   * <DarkInspect.Config.Borderless.NoAnimate.Ok {str} {obj} />
   * ```
   */
  Values: Configurable<Component<Record<string, unknown>>>
  /**
   * A fixed-position panel version of {@linkcode Inspect}
   *
   * @example
   * ```svelte
   * <script>
   *  import Inspect from 'svelte-inspect-value'
   *  import data from './data.js'
   * </script>
   *
   * <Inspect.Panel
   *  value={data}
   *  name="data"
   *  position={['top', 'right']}
   *  appearance="dense"
   * />
   * ```
   */
  Panel: Component<
    PanelProps,
    object,
    'align' | 'resize' | 'open' | 'appearance' | 'opacity' | 'width' | 'height'
  >
}

export { configured } from './configurable.js'
export { default as CustomExpandable } from './CustomExpandable.svelte'
export { default as CustomLine } from './CustomLine.svelte'
export { addToPanel } from './global.svelte.js'
export { inspectElement } from './attachments/inspect-element.js'
export { default as InspectOptionsProvider } from './InspectOptionsProvider.svelte'
export {
  GLOBAL_OPTIONS_CONTEXT,
  setGlobalInspectOptions,
  type InspectOptions,
} from './options.svelte.js'
export { default as PanelValue } from './PanelValue.svelte'
export type {
  CustomComponentProps,
  CustomComponents,
  InspectProps,
  BaseProps,
  PanelProps,
  PanelSettings,
} from './types.js'
export { addComponent } from './util.js'
export default Inspect
