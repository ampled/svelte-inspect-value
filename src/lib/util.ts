// import type { Action } from "svelte/action";
import type { KeyName } from './types.js'

export function getType(value: unknown) {
  const t = typeOf(value)
  if (typeof value === 'function') {
    if (value.toString().startsWith('class') || value.toLocaleString().startsWith('class')) {
      return 'class'
    } else {
      return 'function'
    }
  }
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

export function stringify(value: unknown, indent = 2) {
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
function typeOf(obj: unknown): ValueType {
  return ({}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)?.[1]
    .toLowerCase() ?? 'undefined') as unknown as ValueType
}

// export const noopAction: Action<HTMLElement, any> = (el) => { };

export const stringifyPath = (path: KeyName[]) => path.map((k) => k.toString()).join('.')
