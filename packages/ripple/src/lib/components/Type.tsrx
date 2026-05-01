import type { ValueType } from '@inspect/core';
import { track } from 'ripple';

type Props = {
	type?: ValueType | 'noop' | string;
	force?: boolean;
} & JSX.IntrinsicElements['span'];

export component Type(&{ type = '', force, ...rest }: Props) {
	let &[display] = track(() => {
		switch (type) {
			case 'number':
				return 'num';
			case 'string':
				return 'str';
			case 'regexp':
				return 'regex';
			case 'function':
				return 'fn';
			case 'asyncfunction':
				return 'async fn';
			case 'generatorfunction':
				return 'fn*';
			case 'asyncgeneratorfunction':
				return 'async fn*';
			case 'boolean':
				return 'bool';
			case 'url':
				return 'URL';
			case 'urlsearchparams':
				return 'URLSearch';
			case 'map':
				return 'Map';
			case 'set':
				return 'Set';
			case 'date':
				return 'Date';
			case 'object':
				return 'obj';
			case 'array':
				return 'arr';
			case 'promise':
				return 'Promise';
			default:
				return type;
		}
	});

	const ALWAYS_VISIBLE_TYPES = [
		'undefined',
		'null',
		'class',
		'function',
		'asyncfunction',
		'generatorfunction',
		'asyncgeneratorfunction',
		'promise',
		'readable',
		'writable',
		'Entry',
		'map',
		'set',
		'date',
		'url',
	];

	let &[required] = track(() => ALWAYS_VISIBLE_TYPES.includes(type));

	if (type) {
		<span class={['type', type]}>{type}</span>
	}
}
