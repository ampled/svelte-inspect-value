import { getContext } from 'svelte'

export function getPreviewLevel(): number {
  return getContext(Symbol.for('siv.preview-level')) ?? 0
}
