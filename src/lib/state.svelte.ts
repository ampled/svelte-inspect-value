import type { KeyName } from './types.js'
import { stringifyPath } from './util.js'

export type CollapseState = {
  collapsed: boolean
}

export type InspectState = {
  [key: string]: {
    collapsed: boolean
  }
}

export const STATE_CONTEXT_KEY = 'inspect-state'

function ensureStringPath(path: string | KeyName[]) {
  let key: string
  if (Array.isArray(path)) {
    key = stringifyPath(path)
  } else {
    key = path
  }
  return key
}

export function createState(init: InspectState, title = 'svelte-value-inspect') {
  let state: InspectState = $state(init)

  $effect(() => {
    if (state != null && Object.entries(state).length) {
      const v = JSON.stringify(state)
      localStorage.setItem(title, v)
    }
  })

  return {
    get value(): InspectState {
      return state
    },
    set value(val: InspectState) {
      state = val
    },
    setCollapse: (keyOrPath: string | KeyName[], collapsed: boolean) => {
      const key = ensureStringPath(keyOrPath)
      if (state) state[key] = { collapsed }
    },
    getCollapse: (keyOrPath: string | KeyName[]) => {

      const key = ensureStringPath(keyOrPath)
      const wasCollapsed = state?.[key]?.collapsed
      if (typeof wasCollapsed === 'boolean') {
        return wasCollapsed
      }
      return true
    },
  }
}

export type StateContext = ReturnType<typeof createState>
