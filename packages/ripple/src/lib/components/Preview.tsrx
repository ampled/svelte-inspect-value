import { getPropertyDescriptor, getType, type TypeViewProps } from '@inspect/core';
import { Node } from '../Node.tsrx';
import { Key } from './Key.tsrx';
import { Type } from './Type.tsrx';
import { ctx } from '../context.js';
import { track, effect } from 'ripple';

type PreviewProps = {
	prefix?: string;
	postfix?: string;
	list?: unknown[];
	keyValue?: [PropertyKey, unknown][];
	keys?: PropertyKey[];
	value?: unknown;
	singleValue?: { value: unknown };
	startLevel?: number;
	showPreview?: boolean;
	path?: TypeViewProps['path'];
	keyDelim?: string;
	keyStyle?: string;
	showKey?: boolean;
	bracketStyle?: string;
	usedefaults?: boolean;
} & JSX.IntrinsicElements['div'];

export default component(&{
	value,
	list: previewList,
	keyValue: previewKeyValue,
	keys: previewKeys,
	singleValue,
	path,
	prefix,
	postfix,
	showKey = true,
	keyDelim = ':',
	keyStyle = '',
	startLevel = 1,
	showPreview = false,
	class: classValue,
	bracketStyle = '',
	usedefaults,
	...rest
}: PreviewProps) {
	const ctxVal = ctx.get();
	let &[{ previewEntries, previewDepth, showPreview: optsShowPreview }] = track(
		() => ctxVal.options.value,
	);
	const previewLevel = ctxVal.previewLevel ?? startLevel;
	ctx.set({ ...ctxVal, previewLevel: previewLevel + 1 });

	let &[list] = track(() => previewList?.slice(0, previewEntries));
	let &[keyValue] = track(() => previewKeyValue?.slice(0, previewEntries));
	let &[keys] = track(() => previewKeys?.slice(0, previewEntries));

	effect(() => {
		console.log('PREVIEW', { keys, value, showPreview });
	});

	let &[hasMore] = track(() => {
		if (list && previewList) {
			return list.length < previewList.length;
		} else if (keyValue && previewKeyValue) {
			return keyValue.length < previewKeyValue.length;
		} else if (keys && previewKeys) {
			return keys.length < previewKeys.length;
		}
		return false;
	});

	function alwaysRender(type: string) {
		return [
			'boolean',
			'string',
			'number',
			'bigint',
			'symbol',
			'regexp',
			'class',
			'undefined',
			'null',
			'store',
		].includes(type);
	}

	component ValuePreview(&{ value, key }: { value: unknown; key?: PropertyKey }) {
		const valType = getType(value);
		const newPath =
			path && key ? [...path, key] : undefined;
		if (alwaysRender(valType) || previewLevel < previewDepth) {
			<Node {path} {key} {value} {showKey} {keyDelim} {keyStyle} {usedefaults} />
		} else {
			<div class="key-type-preview">
				if (showKey) {
					<Key
						disabled
						path={newPath}
						{key}
						delim={keyDelim}
						style={keyStyle}
						allowUndefined
					/>
				}
				<Type type={valType} force />
			</div>
		}
	}

	component PreviewValue(&{
		key,
		_force = false,
		descriptor,
	}: {
		key: PropertyKey;
		_force?: boolean;
		descriptor?: PropertyDescriptor;
	}) {
		if (descriptor?.get || descriptor?.set) {
			{'getterSetter'}
		} else {
			<ValuePreview value={value?.[key]} {key} />
		}
	}

	if (optsShowPreview && previewEntries > 0 && showPreview) {
		<div class={['preview', classValue]} {...rest}>
			if (prefix) {
				<span class={['pre', `level-${previewLevel}`]} style={bracketStyle}>
					{prefix}
				</span>
			}
			<div class="inner">
				if (keys && value) {
					for (const k of keys; index i; key k) {
						const descriptor = getPropertyDescriptor(value, k);
						<PreviewValue key={k} {descriptor} />
						if (i < keys.length - 1) <span class="comma">{','}</span>
					}
				} else if (keyValue) {
					for (const [k, value] of keyValue; index i; key k) {
						<ValuePreview {value} key={k} />
						if (i < keyValue.length - 1) <span class="comma">{','}</span>
					}
				} else if (list) {
					for (const value of list; index i; key i) {
						<ValuePreview {value} key={i} />
						if (i < list.length - 1) <span class="comma">{','}</span>
					}
				} else if (singleValue) {
					<ValuePreview value={singleValue.value} />
				}
				if (hasMore) {
					<span class="comma">{','}</span>
					<span class="ellipsis">{'&hellip'}</span>
				}
				if (postfix) {
					<span class={['post', `level-${previewLevel}`]} style={bracketStyle}>
						{postfix}
					</span>
				}
			</div>
		</div>
	}
	<style>
		.comma {
			margin-right: 0.5em;
			margin-left: 0;
			color: var(--_text-color);
		}

		.ellipsis {
			color: var(--_preview-ellipsis-color);
		}

		.preview {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			align-items: center;
			transform-origin: bottom right;
			min-width: 0;
			overflow: hidden;
			color: var(--_text-color);
			font-size: var(--inspect-font-size);
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.inner {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			align-items: center;
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.key-type-preview {
			display: inline-flex;
			justify-content: flex-start;
			align-items: center;
			gap: 0.25em;
		}

		.pre {
			margin-right: 0.25em;
		}

		.post {
			margin-left: 0.25em;
		}

		.pre,
		.post {
			color: var(--_text-color);

			&.level-0 {
				color: var(--_comment-color);
			}
			&.level-1 {
				color: var(--_text-color);
			}
			&.level-2 {
				color: var(--green);
			}
			&.level-3 {
				color: var(--blue);
			}
			&.level-4 {
				color: var(--red);
			}
			&.level-5 {
				color: var(--green);
			}
			&.level-6 {
				color: var(--blue);
			}
			&.level-7 {
				color: var(--red);
			}
			&.level-8 {
				color: var(--green);
			}
			&.level-9 {
				color: var(--blue);
			}
			&.level-10 {
				color: var(--red);
			}
			&.level-11 {
				color: var(--green);
			}
			&.level-12 {
				color: var(--blue);
			}
			&.level-13 {
				color: var(--red);
			}
			&.level-14 {
				color: var(--green);
			}
			&.level-15 {
				color: var(--blue);
			}
			&.level-16 {
				color: var(--red);
			}
			&.level-17 {
				color: var(--green);
			}
			&.level-18 {
				color: var(--blue);
			}
			&.level-19 {
				color: var(--red);
			}
		}
	</style>
}
