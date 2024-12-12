// import type { Action } from "svelte/action";

import type { KeyName } from './types.js'

export function getType(value: unknown) {
  if (typeof value === 'function') {
    if (value.toString().startsWith('class') || value.toLocaleString().startsWith('class')) {
      return 'class'
    } else {
      return 'function'
    }
  }
  // console.log({ value: value, objType: objType(value, false) })
  // console.log
  // if (!browser) return 'undefined'
  // if (!globalThis.Iterator) {
  //   return 'undefined'
  // }
  // if (typeof value === 'object' && Object.prototype.toString.) {
  //   console.log(value?.constructor.name)
  //   return 'iterator'
  // }
  const t = typeOf(value)
  // console.log({ value, type: t })

  return t
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function typeofAsFunction(value: unknown) {
  return typeof value
}

export type ValueType =
  | ReturnType<typeof typeofAsFunction>
  | 'regexp'
  | 'date'
  | 'class'
  | 'error'
  | 'array'
  | 'null'
  | 'set'
  | 'map'
  | 'url'
  | 'urlsearchparams'
  | 'promise'
  | 'iterator'

export function stringify(value: unknown, indent = 2, quotes: 'single' | 'double' = 'single') {
  if (typeof value === 'string' && quotes === 'single') {
    const str = `'${JSON.stringify(value).slice(1, -1)}'`
    return str
  }
  return JSON.stringify(
    value,
    (key, value) => {
      if (typeof value === 'bigint') {
        try {
          JSON.stringify(value)
        } catch (e: unknown) {
          if (e instanceof Error) {
            return 'Caught ' + e.name + ': ' + e.message
          }
          return JSON.stringify(e)
        }
        return '< escaped bigint to avoid TypeError >'
      }
      return value
    },
    indent
  )
}

// source: http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable/7390612#7390612
export function typeOf(obj: unknown): ValueType {
  const t = {}.toString.call(obj).slice(8, -1)

  // console.log(t)

  return (t.replace(' ', '').toLowerCase() ?? 'undefined') as unknown as ValueType
}

// export const noopAction: Action<HTMLElement, any> = (el) => { };

export const stringifyPath = (path: KeyName[]) => {
  return path
    .map((k, i) => {
      if (typeof k === 'number') {
        return `[${k}]`
      }
      const pre = i === 0 ? '' : '.'
      return pre + k.toString()
    })
    .join('$$$')
}
