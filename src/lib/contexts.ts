import { getContext, setContext } from 'svelte'
import { SvelteMap } from 'svelte/reactivity'
import type { SearchTerm } from './util/search.js'

const VALUE_CACHE = Symbol('siv.value-cache')
const SEARCH = Symbol('siv.search')
const KEY = Symbol('siv.key')
const ADD_DESTROY_CALLBACKS = Symbol('siv.add-destroy-callbacks')

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
  terms: SearchTerm[]
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

type OnDestroyCallback = () => void

type AddDestroyCallback = (cb: OnDestroyCallback) => void

export function setAddDestroyCallback(cb: AddDestroyCallback) {
  return setContext(ADD_DESTROY_CALLBACKS, cb)
}

export function getAddDestroyCallbackFn() {
  return getContext<AddDestroyCallback>(ADD_DESTROY_CALLBACKS)
}
