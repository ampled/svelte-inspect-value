export { type Configurable, configured, type InlineConfig } from './configurable.js'
export { addToPanel, removeFromPanel } from './global.svelte.js'
export { inspectElement } from './attachments/inspect-element.js'
export {
  type InspectOptions,
  setGlobalInspectOptions,
  type InspectHotkeys,
} from './options.svelte.js'
export type { CollapseState } from './state.svelte.js'
export type {
  CustomComponentEntry,
  CustomComponentPredicate,
  CustomComponentProps,
  CustomComponentPropsTransformFn,
  CustomComponents,
  CustomEntryComponentOnly,
  CustomEntryWithPredicate,
  CustomEntryWithTransform,
  InspectProps,
  InspectValuesOptions,
  PanelProps,
  PanelPersistProps,
  PanelSettings,
  TypeViewProps,
} from './types.js'
export { addComponent, type ValueType } from './util.js'
