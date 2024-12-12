/* eslint-disable @typescript-eslint/no-unused-vars */
import type { KeyName } from './types.js'
import { stringifyPath } from './util.js'
import LZ from 'lz-string'

export type CollapseState = {
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

export function createState(init: InspectState | undefined, title = 'svelte-value-inspect') {
  let state: InspectState | undefined = $state(init)

  // $effect(() => {
  //   if (state != null && Object.entries(state).length) {
  //     const v = JSON.stringify(state)
  //     localStorage.setItem(title, v)
  //   }
  // })

  const save = () => {
    // console.log(`${title} SAVE`)
    if (state != null && Object.entries(state).length) {
      const v = JSON.stringify(state)
      try {
        // localStorage.setItem(title, LZ.compress(v))
        localStorage.setItem(title, v)
      } catch (e) {
        if (e instanceof Error) {
          console.error('saving state to localstorage failed because:', e)
        }
      }
    }
  }

  // $inspect(state);

  return {
    get value(): InspectState | undefined {
      // console.trace('get collapse state value')
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
      if (changed) {
        save()
      }
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
      if (state) {
        const key = stringifyPath(path)
        const children = Object.entries(state).filter(([k]) => k.startsWith(key) && k !== key)
        return children.some(([k, v]) => !v.collapsed)
      }
      return false
    },
    collapseChildren: (level: number, path: KeyName[]) => {
      // console.log('collapse under level:', level)
      if (state) {
        let changed = false
        Object.entries(state).forEach((entry) => {
          const [key] = entry
          if (key.split('$$$').length > level) {
            changed = true
            entry[1].collapsed = true
          }
        })
        if (changed) {
          save()
        }
      }
    },
    expandChildren: (level: number, path: string | KeyName[]) => {
      // console.log(level, path);
      if (state) {
        let changed = false

        const key = ensureStringPath(path)
        Object.entries(state).forEach((entry) => {
          const [k] = entry
          if (k.startsWith(key)) {
            changed = true
            entry[1].collapsed = false
          }
        })

        if (changed) {
          save()
        }
      }
    },
  }
}

export type StateContext = ReturnType<typeof createState>
