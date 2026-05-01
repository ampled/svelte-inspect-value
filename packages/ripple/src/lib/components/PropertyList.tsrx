import { type ValueType } from '@inspect/core';
import { track, type Children } from 'ripple';
import { Node } from '../Node.tsrx';

type Props<T extends unknown = unknown> = {
	value: T;
	type?: ValueType;
	keys?: PropertyKey[];
	path?: PropertyKey[];
	item?: Children;
};

export component PropertyList(&{ value, keys = [], item, path }: Props) {
	const paging = 50;
	let &[max] = track(paging);

	let &[slicedKeys] = track(() => keys.length > max ? keys.slice(0, max) : keys);

	for (const k of slicedKeys; key k) {
		<Node value={value?.[k as keyof typeof value]} key={k} {path} />
	}
}
