/* eslint-disable @typescript-eslint/no-unused-vars */
import type { KeyType } from './types.js'
import { stringifyPath } from './util.js'

export const STATE_CONTEXT_KEY = Symbol('inspect-state')

export type NodeState = {
  collapsed: boolean
}

export type InspectState = {
  [key: string]: {
    collapsed: boolean
  }
}

export function createState(init: InspectState, onChange?: (value: InspectState) => void) {
  let state: InspectState = $state(init)

  function emitChanged() {
    onChange?.($state.snapshot(state))
  }

  return {
    get value(): InspectState | undefined {
      return state
    },
    set value(val: InspectState) {
      state = val
    },
    setCollapse: (keyOrPath: string | KeyType[], collapsed: boolean) => {
      const key = ensureStringPath(keyOrPath)
      let changed = false
      if (state) {
        state[key] = { collapsed }
        changed = true
      }
      if (changed && state) {
        emitChanged()
      }
    },
    getCollapse: (keyOrPath: string | KeyType[]) => {
      const key = ensureStringPath(keyOrPath)
      return state?.[key]
    },
    hasExpandedChildren: (path: KeyType[]) => {
      if (state) {
        const key = stringifyPath(path)
        const children = Object.entries(state).filter(([k]) => k.startsWith(key) && k !== key)
        return children.some(([k, v]) => !v.collapsed)
      }
      return false
    },
    collapseChildren: (level: number, path: KeyType[]) => {
      if (state) {
        let changed = false
        Object.entries(state).forEach((entry) => {
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
      if (state) {
        let changed = false

        const key = ensureStringPath(currentPath)
        Object.entries(state).forEach((entry) => {
          const [k] = entry
          const stringPath = k.split('.')
          if (k.startsWith(key)) {
            // debugger
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

export function ensureStringPath(path: string | KeyType[]) {
  let key: string
  if (Array.isArray(path)) {
    key = stringifyPath(path)
  } else {
    key = path
  }
  return key
}
