/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TypeViewProps } from '$lib/types.js'
import type { Component } from 'svelte'
import ArrayIteratorView from './ArrayIteratorView.svelte'
import ArrayView from './ArrayView.svelte'
import BigIntView from './BigIntView.svelte'
import ClassView from './ClassView.svelte'
import DateView from './DateView.svelte'
import ErrorView from './ErrorView.svelte'
import FunctionView from './FunctionView.svelte'
import GeneratorView from './GeneratorView.svelte'
import HtmlImageElementView from './HTMLImageElementView.svelte'
import HtmlView from './HTMLView.svelte'
import IteratorView from './IteratorView.svelte'
import MapIteratorView from './MapIteratorView.svelte'
import MapView from './MapView.svelte'
import ObjectView from './ObjectView.svelte'
import OneLineView from './OneLineView.svelte'
import PromiseView from './PromiseView.svelte'
import RegexView from './RegexView.svelte'
import SetView from './SetView.svelte'
import StringView from './StringView.svelte'
import TypedArrayView from './TypedArrayView.svelte'
import UrlSearchParamsView from './URLSearchParamsView.svelte'
import UrlView from './URLView.svelte'

// const components = {
//   number: OneLineView,
//   boolean: OneLineView,
//   undefined: OneLineView,
//   null: OneLineView,
//   object: ObjectView,
//   array: ArrayView,
//   string: StringView,
//   function: FunctionView,
//   class: ClassView,
//   symbol: SymbolView,
//   regexp: RegexView,
//   date: DateView,
//   bigint: BigIntView,
//   error: ErrorView,
//   map: MapView,
//   set: SetView,
//   url: UrlView,
//   urlsearchparams: UrlSearchParamsView,
//   htmlimageelement: HtmlImageElementView,
//   html: HtmlView,
//   promise: PromiseView,
//   setiterator: ArrayIteratorView,
//   arrayiterator: ArrayIteratorView,
//   mapiterator: MapIteratorView,
//   generator: GeneratorView,
//   iterator: IteratorView,
//   int16array: TypedArrayView,
// } as const

// type

export type ViewComponents = Record<
  string,
  | [Component<TypeViewProps>, (props: TypeViewProps) => Partial<TypeViewProps>]
  | [Component<TypeViewProps>]
>

const components = {
  symbol: [OneLineView, (props: TypeViewProps<symbol>) => ({ display: props.value.toString() })],
  number: [OneLineView],
  boolean: [OneLineView],
  undefined: [OneLineView],
  null: [OneLineView],
  bigint: [
    OneLineView,
    (props: TypeViewProps<bigint>) => ({ display: props.value.toString() + 'n' }),
  ],
  regexp: [OneLineView, (props: TypeViewProps<RegExp>) => ({ display: props.value.toString() })],
  object: [ObjectView],
  array: [ArrayView],
  string: [StringView],
  function: [FunctionView],
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
  setiterator: [ArrayIteratorView],
  arrayiterator: [ArrayIteratorView],
  mapiterator: [MapIteratorView],
  generator: [GeneratorView],
  iterator: [IteratorView],
  int16array: [TypedArrayView],
} as ViewComponents

export default components

export function getComponent(type: string) {
  return components[type]
}

// export type ViewComponents = typeof components
