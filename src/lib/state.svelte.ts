/* eslint-disable @typescript-eslint/no-unused-vars */
import type { KeyName } from './types.js'
import { stringifyPath } from './util.js'

export type NodeState = {
  collapsed: boolean
}

export type InspectState = {
  [key: string]: {
    collapsed: boolean
  }
}

export const STATE_CONTEXT_KEY = Symbol('inspect-state')

function ensureStringPath(path: string | KeyName[]) {
  let key: string
  if (Array.isArray(path)) {
    key = stringifyPath(path)
  } else {
    key = path
  }
  return key
}

export function createState(
  init: InspectState,
  title = 'svelte-value-inspect',
  onChange?: (value: InspectState) => void
) {
  let state: InspectState | undefined = $state(init)

  return {
    get value(): InspectState | undefined {
      return state
    },
    set value(val: InspectState) {
      state = val
    },
    setCollapse: (keyOrPath: string | KeyName[], collapsed: boolean) => {
      const key = ensureStringPath(keyOrPath)
      let changed = false
      if (state) {
        state[key] = { collapsed }
        changed = true
      }
      if (changed && state) {
        onChange?.(state)
      }
    },
    getCollapse: (keyOrPath: string | KeyName[]) => {
      const key = ensureStringPath(keyOrPath)
      return state?.[key]
    },
    hasExpandedChildren: (path: KeyName[]) => {
      if (state) {
        const key = stringifyPath(path)
        const children = Object.entries(state).filter(([k]) => k.startsWith(key) && k !== key)
        return children.some(([k, v]) => !v.collapsed)
      }
      return false
    },
    collapseChildren: (level: number, path: KeyName[]) => {
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
          onChange?.(state)
        }
      }
    },
    expandChildren: (currentLevel: number, currentPath: string | KeyName[]) => {
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
          onChange?.(state)
        }
      }
    },
  }
}

export type StateContext = ReturnType<typeof createState>
