import { getContext } from 'svelte'
import type { KeyType } from './types.js'
import { ensureStringPath } from './util.js'

export const VALUE_CACHE_KEY = Symbol('inspect-state')

export type NodeValues = {
  [key: string]: unknown
}

export function createValueCache() {
  let state: NodeValues = $state({})

  return {
    get value(): NodeValues | undefined {
      return state
    },
    set value(val: NodeValues) {
      state = val
    },
    getNode(keyOrPath: () => string | KeyType[]) {
      const key = ensureStringPath(keyOrPath())
      return this.value?.[key]
    },
    setGetterValue(keyOrPath: string | KeyType[], value: unknown) {
      const key = ensureStringPath(keyOrPath)
      if (this.value) {
        this.value[key] = value
      }
    },
  }
}

export type ValueCacheContext = ReturnType<typeof createValueCache>

export function useValueCache(): ValueCacheContext {
  return getContext<ValueCacheContext>(VALUE_CACHE_KEY)
}

export function useNodeCache(keyOrPath: () => string | KeyType[]) {
  const ctx = useValueCache()
  const key = ensureStringPath(keyOrPath())
  return () => ctx.value?.[key]
}
