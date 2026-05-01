import { type TypeViewProps, getAllProperties } from '@inspect/core';
import { track } from 'ripple';
import { OneLineView } from './OneLineView.tsrx';

export component Default({ value, key, path, ...rest }: TypeViewProps) {
	let &[keys] = track(() => getAllProperties(value));

	if (keys.length) {
		<div>{'expandable'}</div>
	} else {
		<OneLineView {key} {path} {value} {...rest} />
	}
}
