import type { TypeViewProps } from '@inspect/core';
import { OneLineView } from './OneLineView.tsrx';
import { Expandable } from './Expandable.tsrx';
import { StringValue } from './StringValue.tsrx';
import { track, effect } from 'ripple';

export component StringView(&{
	value = '',
	key,
	type,
	path,
	showKey,
	...rest
}: TypeViewProps<string>) {
	let &[isMultiline] = track(() => value.includes('\n'));

	effect(() => {
		console.log('string view:', { value, isMultiline });
	});

	if (isMultiline) {
		<Expandable
			valuePreview={component(&{ showPreview }) {
				if (showPreview) {
					<StringValue {value} />
				}
			}}
			{value}
			{key}
			{type}
			{path}
			{showKey}
			length={value.length}
			keepPreviewOnExpand
			{...rest}
		>
			<pre class="value string multi">
				{value}
			</pre>
		</Expandable>
	} else {
		<OneLineView {value} {showKey} {key} {type} {path} length={value.length} {...rest}>
			<StringValue {value} />
		</OneLineView>
	}
}
