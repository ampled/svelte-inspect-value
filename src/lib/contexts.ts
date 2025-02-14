import { getContext } from 'svelte'

export function getPreviewLevel(): number {
  return getContext('preview') ?? 0
}
