import { getContext, setContext } from 'svelte'
import { SvelteMap } from 'svelte/reactivity'

const VALUE_CACHE = Symbol('siv.value-cache')
const SEARCH = Symbol('siv.search')
const KEY = Symbol('siv.key')

export function initValueCache() {
  return setContext(VALUE_CACHE, new SvelteMap<string, unknown>())
}

export function useValueCache<T = unknown>() {
  return getContext<SvelteMap<string, T>>(VALUE_CACHE)
}

export function getPreviewLevel(): number {
  return getContext(Symbol.for('siv.preview-level')) ?? 0
}

type SearchContext = () => {
  searching: boolean
  matchingPaths: string[]
  query: string
}

export function setSearchContext(value: SearchContext) {
  return setContext(SEARCH, value)
}

export function useSearchContext() {
  return (
    getContext<SearchContext>(SEARCH) ??
    (() => ({
      searching: false,
      matchingPaths: [],
      query: '',
    }))
  )
}

export function setIsKey() {
  return setContext(KEY, true)
}

export function getIsKey() {
  return getContext<true | undefined>(KEY) ?? false
}
