import { getContext, setContext } from 'svelte'
import { SvelteMap } from 'svelte/reactivity'

const VALUE_CACHE = Symbol('siv.value-cache')

export function initValueCache() {
  return setContext(VALUE_CACHE, new SvelteMap<string, unknown>())
}

export function useValueCache<T = unknown>() {
  return getContext<SvelteMap<string, T>>(VALUE_CACHE)
}

export function getPreviewLevel(): number {
  return getContext(Symbol.for('siv.preview-level')) ?? 0
}
