import { type TypeViewProps, stringify } from '@inspect/core';
import { track } from 'ripple';

export component StringValue({ value, display, type = 'string' }: TypeViewProps<string>) {
	let &[displayOrValue] = track(() => display != null ? display : value);
	let &[isUrlOrPath] = track(
		() => (type === 'string' || type === 'url') &&
			(URL.canParse(displayOrValue) || displayOrValue.startsWith('/') ||
				value.startsWith('data:')),
	);
	let &[ele] = track(() => isUrlOrPath ? 'a' : 'span');
	let &[stringified] = track(() => stringify(value, 0, 'single'));

	<@ele
		class={['stringvalue', 'value', type, isUrlOrPath && 'url-or-path']}
		title={stringify(value)}
	>
		{stringified}
	</@ele>
	<style>
		.stringvalue {
			display: inline-flex;
			align-items: center;
			overflow: hidden;
			text-overflow: ellipsis;
			text-wrap: nowrap;
			white-space: pre !important;
			white-space-collapse: preserve-spaces;
		}

		.url-or-path {
			cursor: pointer;
		}
	</style>
}
