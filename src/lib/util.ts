import { setContext, type Component } from 'svelte'
import type { Readable } from 'svelte/store'
import { initValueCache } from './contexts.js'
import {
  OPTIONS_CONTEXT,
  OPTIONS_KEYS,
  type InspectOptions,
  type OptionsContext,
} from './options.svelte.js'
import { STATE_CONTEXT_KEY, type StateContext } from './state.svelte.js'
import type {
  CustomComponentEntry,
  CustomComponentPredicate,
  CustomComponentPropsTransformFn,
  InspectProps,
  KeyType,
} from './types.js'

export function initialize(opts: OptionsContext, state: StateContext) {
  setContext(OPTIONS_CONTEXT, opts)
  setContext(STATE_CONTEXT_KEY, state)
  initValueCache()
}

export function getType(value: unknown, stores: boolean = false) {
  const t = typeOf(value)

  if (t === 'function') {
    if (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      (value as Function).toString().startsWith('class') ||
      // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      (value as Function).toLocaleString().startsWith('class')
    ) {
      return 'class'
    }
  } else if (t === 'object') {
    if (stores && isStore(value)) {
      return 'store'
    }
    return 'object'
  }
  return t
}

// source: http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable/7390612#7390612
export function typeOf(obj: unknown): ValueType {
  const t = {}.toString.call(obj).slice(8, -1)

  return (t.replace(' ', '').toLowerCase() ?? 'undefined') as unknown as ValueType
}

export function ofType(obj: unknown) {
  return {}.toString.call(obj)
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

export function isStore(value: unknown): value is Readable<unknown> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return typeof (value as any).subscribe === 'function'
}

export function isPromise(value: unknown): value is Promise<unknown> {
  return getType(value) === 'promise'
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
  | 'asyncfunction'
  | 'generatorfunction'
  | 'asyncgeneratorfunction'
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
  | 'NaN'
  | 'store'

export function stringify(
  value: unknown,
  indent: number | string = 2,
  quotes: 'single' | 'double' | 'none' = 'single'
) {
  if (typeof value === 'string' && quotes === 'single') {
    const str = `'${JSON.stringify(value, null, indent).slice(1, -1)}'`
    return str
  } else if (typeof value === 'string' && quotes === 'none') {
    return `${JSON.stringify(value, null, indent).slice(1, -1)}`
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
  // TODO ??
  try {
    return getType(val)
    // return (val as object).toString()
  } catch {
    return getType(val)
  }
}

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

export function descriptorPrefix(descriptor?: PropertyDescriptor) {
  return [descriptor?.set ? 'set' : undefined, descriptor?.get ? 'get' : undefined]
    .filter(Boolean)
    .join('|')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getAllProperties(object: any) {
  const enumerableKeys = []
  for (const enumerableKey in object) {
    enumerableKeys.push(enumerableKey)
  }
  return [
    ...new Set([
      ...enumerableKeys,
      ...Object.getOwnPropertyNames(object),
      ...Object.getOwnPropertySymbols(object),
      // ...(object['__proto__'] ? ['__proto__'] : []),
    ]),
  ]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getPropertyDescriptor(object: any, prop: PropertyKey) {
  if (!object) {
    return {}
  }
  // else if (prop === '__proto__') {
  //   return {
  //     value: Object.getPrototypeOf(object),
  //   }
  // }
  else {
    const ownPropertyDescriptor = Object.getOwnPropertyDescriptor(object, prop)
    if (ownPropertyDescriptor) {
      return ownPropertyDescriptor
    } else {
      const prototype = Object.getPrototypeOf(object)
      return getPropertyDescriptor(prototype, prop)
    }
  }
}

export function ensureStringPath(path: string | KeyType[]) {
  let key: string
  if (Array.isArray(path)) {
    key = stringifyPath(path)
  } else {
    key = path
  }
  return key
}

// Source: https://github.com/tanhauhau/svelte-json-tree/blob/1f8a2d8b52810c416020235dd9a2dc9b1a964742/src/lib/svelte-json-tree/SvelteJsonTree/utils/expand.ts#L11
function matchPath(keyPath: string[], expandPaths: string[]) {
  const expandPathParts = expandPaths.map((path) => path.split('.'))
  outer: for (const parts of expandPathParts) {
    if (keyPath.length > parts.length) continue
    const length = Math.min(keyPath.length, parts.length)
    for (let i = 0; i < length; i++) {
      if (parts[i] !== '*' && parts[i] !== String(keyPath[i])) continue outer
    }
    return true
  }
  return false
}

export const neverExpandInitial = ['constructor', 'prototype'] as (KeyType | undefined)[]

export function shouldInitiallyExpandNode(
  currentPath: KeyType[],
  expandLevel: number,
  expandAll: boolean,
  expandPaths: string[]
) {
  if (neverExpandInitial.includes(currentPath[currentPath.length - 1])) return false // avoid infinite loops
  if (expandAll) return true
  if (currentPath.length <= expandLevel) {
    return true
  }
  if (expandPaths.length) {
    const pathParts = stringifyPath(currentPath).split('.')
    return matchPath(pathParts, expandPaths)
  }

  return false
}

/**
 * Helper-function for adding custom components with a props transform function.
 *
 * The function ensures proper typing for the props parameter of the transform function
 *
 * @param component Custom component
 * @param transformProps Function modifying props passed to component
 * @param predicate Function returning boolean value. If false, use default component.
 *
 * @example
 * <script lang="ts">
 *  import {Inspect, addComponent} from 'svelte-inspect-value';
 *  import CustomNumber from './CustomNumber.svelte';
 *  import CustomString from './CustomString.svelte';
 * </script>
 *
 * <Inspect value={1234} customComponents={{
 *   number: addComponent(
 *    CustomNumber,
 *    // props here is properly typed with props of CustomNumber
 *    (props) => ({ value: Math.floor(props.value) })
 *    // third parameter is a predicate function that decides if custom component should be used
 *    // if false is returned, the default component will be used instead for this type
 *    (props) => props.value < 1000
 *   ),
 *   // custom component without props transform function or predicate
 *   string: [CustomString]
 *  }}
 * />
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addComponent<TComponent extends Component<any> = Component<any>>(
  component: TComponent,
  transformProps?: CustomComponentPropsTransformFn<TComponent>,
  predicate?: CustomComponentPredicate<TComponent>
): CustomComponentEntry<TComponent> {
  if (predicate) return [component, transformProps, predicate]
  if (transformProps) return [component, transformProps]
  return [component]
}

export function sortProps(props: InspectProps) {
  const out = {} as Partial<InspectOptions>
  const restProps = {} as Partial<InspectProps>

  Object.entries(props).forEach(([key, value]) => {
    if (OPTIONS_KEYS.includes(key as keyof InspectOptions)) {
      out[key as keyof InspectOptions] = value
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      restProps[key as any] = value
    }
  })

  return [out, restProps]
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
