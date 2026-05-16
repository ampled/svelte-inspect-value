import { type ValueType, getPropertyDescriptor } from '@inspect/core';
import { track, type Component } from 'ripple';
import { Node } from '../Node.tsrx';
import { GetterSetter } from './GetterSetter.tsrx';

type Props<T extends unknown = unknown> = {
  value: T;
  type?: ValueType;
  keys?: PropertyKey[];
  path?: PropertyKey[];
  item?: Component<{
    key: PropertyKey;
    value?: unknown;
    index: number;
    descriptor?: PropertyDescriptor;
  }>;
};

export component PropertyList(&{ value, keys = [], item: Item, path }: Props) {
  const paging = 50;
  let &[max] = track(paging);

  let &[slicedKeys] = track(() => keys.length > max ? keys.slice(0, max) : keys);

  for (const k of slicedKeys; index i; key k) {
    const descriptor = getPropertyDescriptor(value, k);
    if (Item) {
      <Item key={k} index={i} {descriptor} {value} />
    } else if (descriptor?.get || descriptor?.set) {
      <GetterSetter {value} {descriptor} key={k} {path} />
    } else {
      <Node value={value?.[k as keyof typeof value]} key={k} {path} />
    }
  }
}
