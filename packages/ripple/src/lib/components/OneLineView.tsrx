import { type TypeViewProps } from '@inspect/core';
import { track, type PropsWithChildrenOptional } from 'ripple';
import { Bullet } from './Bullet.tsrx';
import { Key } from './Key.tsrx';
import Count from './Count.tsrx';
import { Type } from './Type.tsrx';
import { ctx } from '../context.js';

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
	let ctxVal = ctx.get();

	let &[{ showLength: optsShowLength }] = track(() => ctxVal.options.value);

	<div class="line">
		if (!ctxVal.previewLevel) {
			<Bullet {value} />
		}
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
		if (typeof length === 'number' && showLength && optsShowLength && !ctxVal.previewLevel) {
			<Count {length} {type} />
		}
	</div>

	<style>
		@import '../styles/line.css';
	</style>
}
