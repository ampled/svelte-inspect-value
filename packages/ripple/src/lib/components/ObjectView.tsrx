import { enumerateObject, type TypeViewProps, type ValueType } from '@inspect/core';
import { Expandable } from './Expandable.tsrx';
import { Node } from '../Node.tsrx';
import Preview from './Preview.tsrx';

import { PropertyList } from './PropertyList.tsrx';
import { track, effect } from 'ripple';

export component ObjectView(&{
	value,
	key = undefined,
	type,
	path,
	showKey,
	...rest
}: TypeViewProps<object>) {
	console.log('OBJECT:', value);

	let &[namedConstructor] = track(
		() => value?.constructor?.name !== 'Object' ? value?.constructor?.name : false,
	);
	let &[objectType] = track(() => namedConstructor ? namedConstructor as ValueType : type);
	let &[properties] = track(() => enumerateObject(value) as (symbol | string)[]);
	let &[keys] = track(
		() => [...properties, namedConstructor ? 'constructor' : undefined].filter(
			(v) => v != null,
		),
	);

	effect(() => {
		console.log('obj view. props:', { value, path, showKey, rest });
	});

	component valuePreview(&{ showPreview, value }) {
		console.log('ObjectView valuePreview', { value, path, keys, namedConstructor });
		try {
			<Preview prefix="{" postfix="}" {value} {path} {keys} {showPreview} />
		} catch (e) {
			<span
				onClick={() => {
					console.log('value:', value);
				}}
			>
				{'que?'}
			</span>
		}
	}

	<Expandable
		type={objectType}
		length={keys.length}
		{key}
		{path}
		{value}
		forceType={!!namedConstructor}
		{valuePreview}
		{...rest}
	>
		<PropertyList
			{keys}
			{value}
			{type}
			item={component item({ key, descriptor }) {
				if (descriptor?.get || descriptor?.set) {
					{'getter setter'}
				} else {
					<Node value={value?.[key]} {key} {path} />
				}
			}}
		/>
	</Expandable>
}
