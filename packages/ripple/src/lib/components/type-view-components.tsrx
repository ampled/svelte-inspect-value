import type { TypeViewProps } from '@inspect/core';
import { OneLineView } from './OneLineView.tsrx';
import { StringView } from './StringView.tsrx';
import { ArrayView } from './ArrayView.tsrx';
import { RegexpView } from './RegexpView.tsrx';
import { MapView } from './MapView.tsrx';
import { SetView } from './SetView.tsrx';
import { FunctionView } from './FunctionView.tsrx';
import { MapEntryView } from './MapEntryView.tsrx';
import { type Component, type PropsWithChildrenOptional } from 'ripple';
import { ObjectView } from './ObjectView.tsrx';

export type ViewComponent<T> = Component<PropsWithChildrenOptional<TypeViewProps<T>>>;

export type ComponentEntry<T = unknown> = [ViewComponent<T>, (props: TypeViewProps<T>) => Partial<TypeViewProps<T>>] | [ViewComponent<T>];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ViewComponents = Record<string, ComponentEntry<any>>;

const components = {
  // one line
  number: [OneLineView],
  bigint: [
    OneLineView,
    (props: TypeViewProps<bigint>) => ({ display: props.value.toString() + 'n' }),
  ],
  boolean: [OneLineView],
  undefined: [OneLineView],
  null: [OneLineView],
  symbol: [
    OneLineView,
    (props: TypeViewProps<symbol>) => ({ display: props.value.toString() }),
  ],
  weakset: [OneLineView, () => ({ display: ``, forceType: true })],
  weakmap: [OneLineView, () => ({ display: ``, forceType: true })],
  // expandables
  object: [ObjectView],
  array: [ArrayView],
  string: [StringView],
  regexp: [RegexpView],
  map: [MapView],
  mapentry: [MapEntryView],
  set: [SetView],
  function: [FunctionView],
  asyncfunction: [FunctionView],
  generatorfunction: [FunctionView],
  asyncgeneratorfunction: [FunctionView],
} as ViewComponents;

export function getComponent(type: string): ComponentEntry<any> | undefined {
  if (type in components) {
    return components[type];
  }
}
