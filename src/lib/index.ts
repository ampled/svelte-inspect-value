export { default as CustomExpandable } from './CustomExpandable.svelte'
export { default as CustomLine } from './CustomLine.svelte'
export { default as Inspect } from './Inspect.svelte'
export { default as InspectOptionsProvider } from './InspectOptionsProvider.svelte'
export {
  GLOBAL_OPTIONS_CONTEXT,
  setGlobalInspectOptions,
  type InspectOptions,
} from './options.svelte.js'
export type { CustomComponentProps, CustomComponents } from './types.js'
export { addComponent } from './util.js'
import Inspect from './Inspect.svelte'
export default Inspect
