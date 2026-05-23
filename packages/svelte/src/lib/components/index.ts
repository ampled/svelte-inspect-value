import type { CustomComponents, TypeViewProps, ViewComponents } from '../types.js'
import ArrayView from './ArrayView.svelte'
import ClassView from './ClassView.svelte'
import DateView from './DateView.svelte'
import Default from './Default.svelte'
import ErrorView from './ErrorView.svelte'
import FunctionView from './FunctionView.svelte'
import HtmlImageElementView from './HTMLImageElementView.svelte'
import HtmlView from './HTMLView.svelte'
import IteratorView from './IteratorView.svelte'
import MapView from './MapView.svelte'
import ObjectView from './ObjectView.svelte'
import OneLineView from './OneLineView.svelte'
import PromiseView from './PromiseView.svelte'
import RegexpView from './RegexpView.svelte'
import SetView from './SetView.svelte'
import StringView from './StringView.svelte'
import SvelteStoreView from './SvelteStoreView.svelte'
import TypedArrayView from './TypedArrayView.svelte'
import UrlSearchParamsView from './URLSearchParamsView.svelte'
import UrlView from './URLView.svelte'
import MapEntryView from './MapEntryView.svelte'
import TemporalView from './temporal/TemporalView.svelte'
import temporal from './temporal/index.js'

const components = {
  symbol: [
    OneLineView,
    (props: TypeViewProps<symbol>) => ({ value: props.value, display: props.value.toString() }),
  ],
  number: [OneLineView],
  boolean: [OneLineView],
  undefined: [OneLineView],
  null: [OneLineView],
  regexp: [RegexpView],
  bigint: [
    OneLineView,
    (props: TypeViewProps<bigint>) => ({ display: props.value.toString() + 'n' }),
  ],
  arraybuffer: [
    OneLineView,
    (props: TypeViewProps<ArrayBuffer>) => ({ display: `ArrayBuffer(${props.value.byteLength})` }),
  ],
  setiterator: [IteratorView],
  arrayiterator: [IteratorView],
  mapiterator: [IteratorView],
  generator: [IteratorView],
  asyncgenerator: [IteratorView],
  weakset: [OneLineView, () => ({ display: ``, forceType: true })],
  weakmap: [OneLineView, () => ({ display: ``, forceType: true })],
  object: [ObjectView],
  store: [SvelteStoreView],
  array: [ArrayView],
  string: [StringView],
  function: [FunctionView],
  asyncfunction: [FunctionView],
  generatorfunction: [FunctionView],
  asyncgeneratorfunction: [FunctionView],
  class: [ClassView],
  date: [DateView],
  error: [ErrorView],
  map: [MapView],
  mapentry: [MapEntryView],
  set: [SetView],
  url: [UrlView],
  urlsearchparams: [UrlSearchParamsView],
  htmlcollection: [Default],
  htmlimageelement: [HtmlImageElementView],
  html: [HtmlView],
  promise: [PromiseView],
  typedarray: [TypedArrayView],
  ...temporal,
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
  const _type = type.toLowerCase()
  const comps = { ...components, ...custom }

  if (typedArrays.includes(_type)) return comps['typedarray']
  if (_type.includes('iterator')) return comps['arrayiterator']

  return comps[_type]
}

export function getDefaultComponent(type: string) {
  const _type = type.toLowerCase()
  if (typedArrays.includes(_type)) return components['typedarray']
  if (type.includes('iterator')) return components['arrayiterator']

  return components[_type]
}
