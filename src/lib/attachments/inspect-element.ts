import { addToPanel } from '../global.svelte.js'
import type { Attachment } from 'svelte/attachments'

/**
 * Inspect an element with `Inspect.Panel`
 *
 * @param name key of element in `Inspect.Panel` global values. Defaults to `node.nodeName`
 *
 * @example
 * ```svelte
 * <input bind:value={amount} type="number" {@attach inspectElement('amountInput')} />
 * ```
 */
export const inspectElement = (name?: string): Attachment => {
  return (node) => addToPanel(name ?? node.nodeName, () => node)
}
