// import type { Action } from "svelte/action";

import type { KeyType } from './types.js'

export function getType(value: unknown) {
  if (typeof value === 'function') {
    if (value.toString().startsWith('class') || value.toLocaleString().startsWith('class')) {
      return 'class'
    } else {
      return 'function'
    }
  }

  return typeOf(value)
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

export function isObject(value: unknown): value is object {
  return getType(value) === 'object'
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
    (_key, value) => {
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

export function stringifyOrToString(val: unknown): string {
  const stringified = stringify(val, 0)
  if (stringified !== '{}') {
    return stringified
  }
  try {
    return getType(val)
    // return (val as object).toString()
  } catch {
    return getType(val)
  }
}

// source: http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable/7390612#7390612
export function typeOf(obj: unknown): ValueType {
  const t = {}.toString.call(obj).slice(8, -1)

  // console.log(t)

  return (t.replace(' ', '').toLowerCase() ?? 'undefined') as unknown as ValueType
}

// export const noopAction: Action<HTMLElement, any> = (el) => { };

export const stringifyPath = (path: KeyType[]) => {
  return path.map((k) => k.toString()).join('.')
}

export function collapseString(value: string, length: undefined | number) {
  if (length === 0) {
    return value
  }
  return length && length < value.length
    ? value.slice(0, length).trimEnd().trimStart() + '…'
    : value
}
