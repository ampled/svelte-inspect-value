import { type TypeViewProps } from '@inspect/core';
import { track, type PropsWithChildrenOptional } from 'ripple';
import { Bullet } from './Bullet.tsrx';
import { Key } from './Key.tsrx';
import { Type } from './Type.tsrx';

export component OneLineView(&{
	value,
	display,
	key,
	showKey = true,
	keyDelim = ':',
	keyPrefix,
	keyStyle,
	type,
	forceType,
	path,
	length,
	showLength = true,
	note,
	match,
	children,
	...rest
}: PropsWithChildrenOptional<TypeViewProps>) {
	let &[displayOrValue] = track(() => display != null ? display : value?.toString?.() ?? '');

	<div class="line">
		<Bullet {value} />
		if (showKey) {
			<Key
				disabled
				{key}
				{path}
				prefix={keyPrefix}
				delim={keyDelim}
				style={keyStyle as JSX.IntrinsicElements['div']['style']}
			/>
		}
		<Type {type} />
		if (children) {
			{children}
		} else if (displayOrValue) {
			<span class={['value', type]}>{displayOrValue}</span>
		}
	</div>

	<style>
		@import '../styles/line.css';
	</style>
}
