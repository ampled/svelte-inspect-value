import {
	type TypeViewProps,
	stringifyPath,
	shouldInitiallyExpandNode,
	neverExpandInitial,
} from '@inspect/core';
import { track, effect, untrack, type PropsWithChildrenOptional, type Component } from 'ripple';
import { Key } from './Key.tsrx';
import { Type } from './Type.tsrx';
import { CollapseButton } from './CollapseButton.tsrx';
import { ctx } from '../context.js';
import { collapseStateCtx } from '../state.js';
import Count from './Count.tsrx';

type Props = PropsWithChildrenOptional<TypeViewProps<unknown>> & {
	valuePreview: Component<{ showPreview: boolean; value?: unknown }>;
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
	let ctxVal = ctx.get();

	let &[{ expandLevel, expandAll, expandPaths, showLength: optsShowLength }] = track(
		() => ctxVal.options.value,
	);

	let inspectState = collapseStateCtx.get();

	let &[expandingDisabled] = track(() => length === 0 || ctxVal.previewLevel > 0);
	let &[stringifiedPath] = track(() => stringifyPath(path));
	let &[collapseState] = track(() => inspectState.value[stringifiedPath]);
	let &[collapsed] = track(() => {
		if (ctxVal.previewLevel || !length) return true;

		if (typeof collapseState === 'boolean') {
			return collapseState;
		}

		return path.length > expandLevel || neverExpandInitial.includes(key);
	});

	let &[shouldRenderChildren] = track(() => {
		return length != null && length > 0 && !collapsed && !ctxVal.previewLevel;
	});

	effect(() => {
		console.log('expandable ctxVal:', ctxVal.options.value);
	});

	effect(() => {
		untrack(() => {
			if (ctxVal.previewLevel) return;

			const storedState = inspectState.getCollapse(path);
			if (typeof storedState === 'undefined') {
				console.log('set collapse state');
				inspectState.setCollapse(
					path,
					!shouldInitiallyExpandNode(path, expandLevel, expandAll, expandPaths),
				);
			}
		});
	});

	function toggleCollapse() {
		if (!expandingDisabled) {
			inspectState.setCollapse(stringifiedPath, !collapsed);
		}
	}

	<div
		data-testid="expandable"
		class={['line', !showKey && 'nokey', match && 'match']}
		aria-expanded={!collapsed}
		onClick={() => {
			console.log('click inspectState:', inspectState);
			toggleCollapse();
		}}
		{...rest}
	>
		<CollapseButton {collapsed} {value} {key} {type} />

		if (showKey) {
			<Key delim={keyDelim} prefix={keyPrefix} style={keyStyle} {key} {path} />
		}
		<Type {type} force={forceType} />

		<ValuePreview
			{value}
			showPreview={collapsed || ctxVal.previewLevel > 0 || keepPreviewOnExpand}
		/>

		<button
			style="all: unset; font-size: 10px"
			onClick={(e) => {
				e.stopPropagation();
				console.log({ path, stringifiedPath });
			}}
		>
			{'d'}
		</button>
		if (typeof length === 'number' && showLength && optsShowLength && !ctxVal.previewLevel) {
			<Count {length} {type} />
		}
	</div>

	if (children && shouldRenderChildren) {
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
