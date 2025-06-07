/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ManyKeysMap from 'many-keys-map'
import memoize, { memoizeClear } from 'memoize'
import { get, type Readable, type Writable } from 'svelte/store'
import type { InspectOptions } from '../options.svelte.js'
import type { List } from '../types.js'
import {
  descriptorPrefix,
  getPropertyDescriptor,
  getType,
  isValidStore,
  stringify,
} from '../util.js'

type SearchNode = {
  path: string
  key: string
  tokens?: string[]
  type: string
}

type IndexerArgs = {
  value: any
  key: unknown
  prevPath: unknown[]
  index: SearchIndex
  visited: WeakSet<any>
  maxDepth?: number
  depth?: number
  type: string
  options: InspectOptions
}

type Indexer = (args: IndexerArgs) => SearchNode[] | void

export type SearchIndex = SearchNode[]

export const stringifyPath = (path: unknown[]) => {
  return path.map((k) => String(k)).join('.')
}

const tokenizers = {
  function: (value: Function) => {
    return String(value).replaceAll('\n', '').replaceAll('\t', '')
  },
}

const typedArrays = [
  'int8array',
  'uint8array',
  'uint8clampedarray',
  'int16array',
  'uint16array',
  'int32array',
  'uint32array',
  'float32array',
  'float64array',
  'bigint64array',
  'biguint64array',
]

function addNode(index: SearchIndex, path: unknown[], tokens: string[] | undefined, type: string) {
  index.push({
    path: stringifyPath(path),
    key: String(path[path.length - 1]),
    tokens,
    type,
  })
}

const indexers = {
  default({ index, prevPath, value, type }) {
    addNode(index, prevPath, [String(value)], type)
  },
  string: (args) => {
    const { index, prevPath, options } = args
    const v = args.value as string

    addNode(
      index,
      prevPath,
      [`${stringify(v, 0, options.quotes)}`, v, v.length ? 'chars' : 'empty'],
      'string'
    )

    return index
  },
  object: ({ value, prevPath, index, visited, maxDepth, depth = 0, type, options }) => {
    if (visited.has(value)) {
      return index
    }
    visited.add(value)

    const tokens: string[] = ['entries']

    const descriptors = Object.getOwnPropertyDescriptors(value)
    const symbolProps = Object.getOwnPropertySymbols(value)

    for (const key of Object.keys(descriptors)) {
      const descriptor = descriptors[key]

      if (descriptor.get || descriptor.set) {
        buildSearchIndex({
          value: descriptor,
          key,
          prevPath,
          index,
          maxDepth,
          depth: depth + 1,
          visited,
          descriptor,
          options,
        })
        continue
      } else {
        buildSearchIndex({
          value: value[key],
          key,
          prevPath,
          index,
          maxDepth,
          depth: depth + 1,
          visited,
          options,
        })
      }
    }

    for (const key of symbolProps) {
      buildSearchIndex({
        value: value[key],
        key,
        prevPath,
        index,
        maxDepth,
        depth: depth + 1,
        visited,
        options,
      })
    }

    addNode(index, prevPath, tokens, type)

    return index
  },
  array: ({ value, prevPath, index, visited, maxDepth, depth = 0, type, options }) => {
    if (visited.has(value)) return index
    visited.add(value)
    const array = value as unknown[]

    addNode(index, prevPath, [array.length ? 'items' : 'empty'], type)

    if (Array.isArray(array)) {
      array.forEach((v, i) => {
        buildSearchIndex({
          value: v,
          key: i,
          prevPath,
          index,
          maxDepth,
          depth: depth + 1,
          visited,
          options,
        })
      })
    }

    return index
  },
  typedarray: ({ value, prevPath, index, visited, maxDepth, depth = 0, type, options }) => {
    if (visited.has(value)) return index
    visited.add(value)
    const array = value as List

    addNode(index, prevPath, [array.length ? 'items' : 'empty'], type)

    const internalKeys = ['buffer', 'byteLength', 'byteOffset', 'length'] as (keyof typeof array)[]

    for (const [k, v] of array.entries()) {
      buildSearchIndex({
        value: v,
        key: k,
        prevPath,
        index,
        maxDepth,
        depth: depth + 1,
        visited,
        options,
      })
    }

    internalKeys.forEach((key) =>
      buildSearchIndex({
        value: array[key],
        key,
        prevPath,
        index,
        maxDepth,
        depth: depth + 1,
        visited,
        options,
      })
    )

    return index
  },
  map({ value, prevPath, index, visited, maxDepth, depth = 0, options }) {
    if (visited.has(value)) return index
    const map = value as Map<unknown, unknown>
    addNode(index, prevPath, [map.size ? 'entries' : 'empty'], 'map')
    ;[...map.entries()].forEach(([key, value], i) => {
      this.object({
        value: { key, value },
        key: i,
        prevPath: [...prevPath, i],
        maxDepth,
        depth: depth + 1,
        type: 'mapentry',
        index,
        visited,
        options,
      })
    })
    return index
  },
  set({ value, prevPath, index, visited, maxDepth, depth = 0, options }) {
    if (visited.has(value)) return index
    const set = value as Set<unknown>

    addNode(index, prevPath, [set.size > 0 ? 'entries' : 'empty'], 'set')
    ;[...set.entries()].forEach(([key, value], i) => {
      this.object({
        value: { key, value },
        key: i,
        prevPath: [...prevPath, i],
        maxDepth,
        depth: depth + 1,
        type: 'mapentry',
        index,
        visited,
        options,
      })
    })
    return index
  },
  descriptor: ({ value, index, prevPath }) => {
    addNode(index, prevPath, [descriptorPrefix(value)], 'descriptor')

    if (value.get) {
      addNode(index, [...prevPath, 'getter'], [tokenizers.function(value.get)], 'function')
    }
    if (value.set) {
      addNode(index, [...prevPath, 'setter'], [tokenizers.function(value.set)], 'function')
    }

    return index
  },
  function: ({ value, index, prevPath, type }) => {
    addNode(index, prevPath, [tokenizers.function(value)], type)
    return index
  },
  promise: ({ index, prevPath, type }) => {
    addNode(index, prevPath, ['state', 'result'], type)

    return index
  },
  bigint: ({ value, prevPath, index }) => {
    addNode(index, prevPath, [String(value) + 'n'], 'bigint')
    return index
  },
  iterator: ({ prevPath, index, type }) => {
    addNode(index, prevPath, [], type)
    return index
  },
  date: ({ value, prevPath, index, visited }) => {
    visited.add(value)
    const date = value as Date
    addNode(
      index,
      prevPath,
      [
        'year',
        'month',
        'day',
        'date',
        'hour',
        'minutes',
        'seconds',
        'milliseconds',
        'time',
        date.toString(),
      ],
      'date'
    )
    return index
  },
  url: ({ value, prevPath = [], index, type, depth = 0, maxDepth, options }) => {
    const url = value as URL

    const { hash, host, hostname, href, origin, password, pathname, port, protocol, username } =
      value

    const entries = Object.entries({
      protocol,
      username,
      password,
      host,
      port,
      pathname,
      hash,
      hostname,
      origin,
      href,
    }).filter((prop) => !!prop[1].toString())

    addNode(index, prevPath, [url.toString()], type)

    entries.forEach(([key, value]) => {
      buildSearchIndex({ value, key, index, prevPath, options, maxDepth, depth: depth + 1 })
    })

    if (url.searchParams.size) {
      buildSearchIndex({
        value: url.searchParams,
        index,
        prevPath,
        key: 'searchParams',
        depth: depth + 1,
        maxDepth,
        options,
      })
    }

    return index
  },
  error: (args) => {
    const { index, prevPath, value, visited, depth = 0, maxDepth, options } = args
    const err = value as Error

    addNode(index, prevPath, [err.name], 'error')

    buildSearchIndex({
      value: err.name,
      prevPath,
      key: 'name',
      visited,
      depth: depth + 1,
      maxDepth,
      options,
    })

    buildSearchIndex({
      value: err.message,
      prevPath,
      key: 'message',
      visited,
      depth: depth + 1,
      maxDepth,
      options,
    })

    if (err.stack) {
      buildSearchIndex({
        value: err.stack,
        prevPath,
        key: 'stack',
        visited,
        depth: depth + 1,
        maxDepth,
        options,
      })
    }

    if (err.cause) {
      buildSearchIndex({
        value: err.cause,
        prevPath,
        key: 'cause',
        visited,
        depth: depth + 1,
        maxDepth,
        options,
      })
    }
  },
  urlsearchparams: ({ value, prevPath, index, type }) => {
    const params = value as URLSearchParams
    if (params.size > 0) {
      addNode(index, prevPath, [params.toString(), params.size ? 'entries' : 'empty'], type)
    }
    return index
  },
  store(args) {
    const { value, index, prevPath, maxDepth, depth = 0, visited, options } = args
    const store = value as Readable<unknown>

    const isValid = isValidStore(store)

    if (isValid) {
      const storeType =
        typeof (value as Writable<unknown>).set === 'function' ? 'writable' : 'readable'
      addNode(index, prevPath, ['store', 'subscribe'], storeType)
      visited.add(value)

      try {
        const storeValue = get(store)

        buildSearchIndex({
          value: storeValue,
          key: 'Symbol($).value',
          prevPath,
          index,
          maxDepth,
          depth: depth + 1,
          options,
        })
      } catch (e) {
        console.error('failed indexing store:', e)
      }
    } else {
      this.object({ ...args, type: 'object' })
    }

    return index
  },
  regexp({ index, prevPath, value, type, options, depth = 0, maxDepth }) {
    const regexp = value as RegExp
    const keys = [
      'lastIndex',
      'dotAll',
      'flags',
      'global',
      'hasIndices',
      'ignoreCase',
      'multiline',
      'source',
      'sticky',
      'unicode',
      'unicodeSets',
    ] as (keyof RegExp)[]

    addNode(index, prevPath, [String(value)], type)

    keys.forEach((key) => {
      const descriptor = getPropertyDescriptor(regexp, key)
      buildSearchIndex({
        value: regexp[key],
        descriptor,
        key,
        index,
        options,
        depth: depth + 1,
        maxDepth,
        prevPath,
      })
    })

    return index
  },
} as const satisfies Record<string, Indexer>

type BuildSearchIndexArgs = {
  value: unknown
  key?: unknown
  prevPath?: unknown[]
  maxDepth?: number
  depth?: number
  visited?: WeakSet<WeakKey>
  descriptor?: PropertyDescriptor

  index?: SearchIndex
  options: InspectOptions
}

export const buildSearchIndex = (indexArgs: BuildSearchIndexArgs) => {
  const {
    value,
    key = 'root',
    prevPath = [],
    index = [],
    descriptor,
    maxDepth = 20,
    depth = 0,
    visited = new WeakSet(),
    options,
  } = indexArgs

  if (depth > maxDepth) return index

  let indexerId: keyof typeof indexers | undefined = undefined
  const type = getType(value, options.stores)

  if (typedArrays.includes(type)) indexerId = 'typedarray'
  if (type.includes('function')) indexerId = 'function'
  if (['iterator', 'generator'].some((t) => type.includes(t))) indexerId = 'iterator'
  if (descriptor && (descriptor.set || descriptor.get)) {
    indexerId = 'descriptor'
  }

  //@ts-expect-error - yeah
  const indexer = indexers[indexerId ?? type]

  const args: IndexerArgs = {
    value,
    key,
    prevPath: [...prevPath, key].filter((k) => k != null && k !== ''),
    index,
    maxDepth,
    depth,
    visited,
    type,
    options,
  }

  try {
    indexer.call(indexers, args)
  } catch {
    // retry with default indexer
    try {
      indexers.default(args)
    } catch (err) {
      console.error(`[Inspect] error while indexing value with type ${type}:`, err)
    }
  }

  return index
}

export const build_search_index = memoize(buildSearchIndex, {
  cacheKey: ([args]) => [args.value, args.key, args.options, args.depth, args.maxDepth],
  cache: new ManyKeysMap(),
  maxAge: 10 * 1000,
})

export function clearSearchCache() {
  memoizeClear(build_search_index)
}

export function searchStructuredIndex(
  index: SearchNode[],
  searchString: string,
  mode: 'and' | 'or' = 'or'
): string[] {
  if (!searchString.trim()) return []
  const terms = parseSearchTerms(searchString)

  if (mode === 'and') {
    return index.filter((node) => terms.every((term) => matchTerm(node, term))).map((n) => n.path)
  } else {
    return index.filter((node) => terms.some((term) => matchTerm(node, term))).map((n) => n.path)
  }
}

export type SearchTerm = {
  field: 'value' | 'path' | 'key' | 'type' | 'any'
  value: string
  exact: boolean
}

export function parseSearchTerms(input: string, lowercase = true): SearchTerm[] {
  const termRegex = /(?:(\w+):)?(?:"([^"]+)"|(\S+))/g
  const terms: SearchTerm[] = []

  let match: RegExpExecArray | null
  while ((match = termRegex.exec(input))) {
    const fieldRaw = match[1]
    const quoted = match[2]
    const unquoted = match[3]

    const field = (fieldRaw?.toLowerCase() ?? 'any') as SearchTerm['field']
    const value = quoted ?? unquoted
    const exact = !!quoted

    terms.push({
      field: ['value', 'path', 'type', 'key'].includes(field) ? field : 'any',
      value: lowercase ? value.toLowerCase() : value,
      exact,
    })
  }

  return terms
}

function matchTerm(node: SearchNode, term: SearchTerm) {
  const tokens = node.tokens?.map((t) => t.toLowerCase()) ?? []
  const path = node.path.toLowerCase()
  const type = node.type.toLowerCase()
  const key = node.key.toLowerCase()

  const { field, exact, value } = term
  const matchToken = (t: string) => (exact ? t === value : t.includes(value.toLowerCase()))

  switch (field) {
    case 'any':
      return (
        tokens.some(matchToken) ||
        [path, path.split('.').at(-1)].some((p) => matchToken(p ?? '')) ||
        matchToken(type)
      )
    case 'key':
      return matchToken(key)
    case 'type':
      return matchToken(type)
    case 'value':
      return tokens.some(matchToken)
    case 'path':
      return [path, path.split('.').at(-1)].some(() => matchToken(path))
  }
}

export function getAncestorPaths(path: string): string[] {
  const parts = path.split('.')
  const ancestors: string[] = []

  for (let i = 1; i < parts.length; i++) {
    const ancestor = parts.slice(0, i).join('.')
    ancestors.push(ancestor)
  }

  return ancestors
}
