/* eslint-disable @typescript-eslint/no-unused-vars */
import { getContext } from 'svelte'
import type { KeyType } from './types.js'
import { ensureStringPath } from './util.js'

export const STATE_CONTEXT_KEY = Symbol('inspect-state')

export type NodeState = {
  collapsed: boolean
}

export type InspectState = {
  [key: string]: NodeState
}

export function createState(init: InspectState, onChange?: (value: InspectState) => void) {
  function emitChanged() {
    onChange?.($state.snapshot(init))
  }

  return {
    get value(): InspectState {
      return init
    },
    set value(val: InspectState) {
      init = val
    },
    setCollapse: (keyOrPath: string | KeyType[], newValues: NodeState) => {
      try {
        const key = ensureStringPath(keyOrPath)
        let changed = false
        if (init) {
          const existing = init[key] ?? {}
          init[key] = { ...existing, ...newValues }
          changed = true
        }
        if (changed && init) {
          emitChanged()
        }
      } catch (e) {
        console.error(e)
      }
    },
    getCollapse(keyOrPath: string | KeyType[]) {
      const key = ensureStringPath(keyOrPath)
      return init?.[key]
    },
    collapseChildren: (level: number, path: KeyType[]) => {
      if (init) {
        let changed = false
        Object.entries(init).forEach((entry) => {
          const [key] = entry
          if (key.split('.').length > level) {
            entry[1].collapsed = true
            changed = true
          }
        })
        if (changed) {
          emitChanged()
        }
      }
    },
    expandChildren: (currentLevel: number, currentPath: string | KeyType[]) => {
      if (init) {
        let changed = false

        const key = ensureStringPath(currentPath)
        init[key].collapsed = false
        Object.entries(init).forEach((entry) => {
          const [k] = entry
          const stringPath = k.split('.')
          if (k.startsWith(key) && stringPath.length === currentLevel + 1) {
            entry[1].collapsed = false
            changed = true
          }
        })

        if (changed) {
          emitChanged()
        }
      }
    },
  }
}

export type StateContext = ReturnType<typeof createState>

export function useState(): StateContext {
  return getContext<StateContext>(STATE_CONTEXT_KEY)
}

export function useNodeState(keyOrPath: () => string | KeyType[]) {
  const ctx = useState()
  const key = ensureStringPath(keyOrPath())
  return () => ctx.value?.[key]
}
