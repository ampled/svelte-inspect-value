import { getType, stringify, type TypeViewProps } from '@inspect/core';
import { track, effect, type PropsWithChildrenOptional, type Component } from 'ripple';
import { Key } from './Key.tsrx';
import { CollapseButton } from './CollapseButton.tsrx';
import { ctx } from '../context.js';

type Props = PropsWithChildrenOptional<TypeViewProps<unknown>> & {
	valuePreview: Component<{ showPreview: boolean }>;
	forceType?: boolean;
	keyDelim?: string;
	showKey?: boolean;
	keepPreviewOnExpand?: boolean;
} & JSX.IntrinsicElements['div'];

export component Expandable(&{
	key,
	keyPrefix,
	keyDelim = ':',
	keyStyle,
	showKey = true,
	type,
	length,
	value,
	valuePreview: ValuePreview,
	forceType = false,
	keepPreviewOnExpand = false,
	path = [],
	showLength = true,
	children,
	note,
	match,
	...rest
}: Props) {
	let &[collapsed] = track(true);

	let ctxVal = ctx.get();

	effect(() => {
		console.log('expandable ctxVal:', ctxVal.options.value);
	});

	<div
		data-testid="expandable"
		class={['line', !showKey && 'nokey', match && 'match']}
		aria-expanded={!collapsed}
		{...rest}
	>
		<CollapseButton {collapsed} {value} {key} {type} />

		<Key delim={keyDelim} prefix={keyPrefix} style={keyStyle} {key} {path} />

		<ValuePreview showPreview={false} />
	</div>

	if (children) {
		<div role="list" data-testid="indent" class={['indent', type, match && 'match']}>
			{children}
		</div>
	}

	<style>
		@import '../styles/line.css';

		.indent {
			position: relative;
			transition-duration: var(--__transition-duration);
			transition-property: margin-left, border-color;
			margin-left: var(--__indent);
			border-left: 1px solid var(--_indent-color);
			max-height: calc(102 * 1.5em);
			overflow-x: clip;
			overflow-y: auto;

			&.match {
				border-color: var(--base0A);
			}
		}

		:global .indent:has(.highlight):not(.match) {
			border-color: color-mix(
				in srgb,
				var(--_indent-color),
				var(--_text-search-highlight-color) 50%
			);
		}
	</style>
}
