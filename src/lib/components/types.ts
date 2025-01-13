import type { CustomComponents, TypeViewProps } from '$lib/types.js'
import type { Component } from 'svelte'
import ArrayView from './ArrayView.svelte'
import ClassView from './ClassView.svelte'
import DateView from './DateView.svelte'
import ErrorView from './ErrorView.svelte'
import FunctionView from './FunctionView.svelte'
import HtmlImageElementView from './HTMLImageElementView.svelte'
import HtmlView from './HTMLView.svelte'
import MapView from './MapView.svelte'
import ObjectView from './ObjectView.svelte'
import OneLineView from './OneLineView.svelte'
import PromiseView from './PromiseView.svelte'
import SetView from './SetView.svelte'
import StringView from './StringView.svelte'
import TypedArrayView from './TypedArrayView.svelte'
import UrlSearchParamsView from './URLSearchParamsView.svelte'
import UrlView from './URLView.svelte'

// type
type ViewComponent<T> = Component<TypeViewProps<T>>

export type CustomComponentEntry<T = unknown> =
  | [ViewComponent<T>, (props: TypeViewProps<T>) => Partial<TypeViewProps<T>>]
  | [ViewComponent<T>]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ViewComponents = Record<string, CustomComponentEntry<any>>

const components = {
  symbol: [
    OneLineView,
    (props: TypeViewProps<symbol>) => ({ value: props.value, display: props.value.toString() }),
  ],
  number: [OneLineView],
  boolean: [OneLineView],
  undefined: [OneLineView],
  null: [OneLineView],
  bigint: [
    OneLineView,
    (props: TypeViewProps<bigint>) => ({ display: props.value.toString() + 'n' }),
  ],
  arraybuffer: [
    OneLineView,
    (props: TypeViewProps<ArrayBuffer>) => ({ display: `ArrayBuffer(${props.value.byteLength})` }),
  ],
  setiterator: [
    OneLineView,
    (_props: TypeViewProps<SetIterator<unknown>>) => ({ display: `SetIterator` }),
  ],
  arrayiterator: [
    OneLineView,
    (_props: TypeViewProps<ArrayIterator<unknown>>) => ({ display: `ArrayIterator` }),
  ],
  mapiterator: [
    OneLineView,
    (_props: TypeViewProps<MapIterator<unknown>>) => ({ display: `MapIterator` }),
  ],
  regexp: [OneLineView, (props: TypeViewProps<RegExp>) => ({ display: props.value.toString() })],
  object: [ObjectView],
  array: [ArrayView],
  string: [StringView],
  function: [FunctionView],
  asyncfunction: [FunctionView],
  class: [ClassView],
  date: [DateView],
  error: [ErrorView],
  map: [MapView],
  set: [SetView],
  url: [UrlView],
  urlsearchparams: [UrlSearchParamsView],
  htmlimageelement: [HtmlImageElementView],
  html: [HtmlView],
  promise: [PromiseView],
  typedarray: [TypedArrayView],
} as ViewComponents

export default components

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

export function getComponent(type: string, custom: CustomComponents) {
  const comps = { ...components, ...custom }

  if (typedArrays.includes(type)) return comps['typedarray']

  return comps[type]
}

// export type ViewComponents = typeof components
