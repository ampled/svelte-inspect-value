/* eslint-disable @typescript-eslint/no-unused-vars */
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

  // $effect(() => {
  //   if (state != null && Object.entries(state).length) {
  //     const v = JSON.stringify(state)
  //     localStorage.setItem(title, v)
  //   }
  // })

  const save = () => {
    if (state != null && Object.entries(state).length) {
      const v = JSON.stringify(state)
      localStorage.setItem(title, v)
    }
  }

  // $inspect(state);

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
      save()
    },
    getCollapse: (keyOrPath: string | KeyName[]) => {
      const key = ensureStringPath(keyOrPath)
      const wasCollapsed = state?.[key]?.collapsed
      if (typeof wasCollapsed === 'boolean') {
        return wasCollapsed
      }
      return true
    },
    hasExpandedChildren: (path: KeyName[]) => {
      const key = stringifyPath(path)
      const children = Object.entries(state).filter(([k]) => k.startsWith(key) && k !== key)
      return children.some(([k, v]) => !v.collapsed)
    },
    collapseChildren: (level: number, path: KeyName[]) => {
      // console.log('collapse under level:', level)
      Object.entries(state).forEach((entry) => {
        const [key] = entry
        if (key.split('$$$').length > level) {
          entry[1].collapsed = true
        }
      })

      save()
    },
    expandChildren: (level: number, path: string | KeyName[]) => {
      // console.log(level, path);
      const key = ensureStringPath(path)
      Object.entries(state).forEach((entry) => {
        const [k] = entry
        if (k.startsWith(key)) {
          entry[1].collapsed = false
        }
      })

      save()
    },
  }
}

export type StateContext = ReturnType<typeof createState>
