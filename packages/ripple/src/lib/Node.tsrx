import { getType, stringifyPath, type TypeViewProps, type ValueType } from '@inspect/core';
import { effect, track, type Tracked } from 'ripple';
import { getComponent, type ViewComponent } from './components/type-view-components.tsrx';
import { Default } from './components/Default.tsrx';

export component Node(&{
	value = undefined,
	key,
	keyDelim = ':',
	path: prevPath = [],
	usedefaults,
	forceView,
	...rest
}: TypeViewProps & { usedefaults?: boolean; forceView?: string }) {
	let &[type] = track(() => forceView ? forceView : getType(value));

	function getTypeComponent(value: unknown, type: ValueType) {
		let entry = getComponent(type);

		if (entry) {
			return entry[0];
		}
		return Default;
	}

	let &[_, TrackedTypeComponent] = track(() => getTypeComponent(value, type));
	let &[path] = track(() => key != null && prevPath ? [...prevPath, key] : ['root']);
	let &[stringifiedPath] = track(() => stringifyPath(path));

	<@TrackedTypeComponent {value} {key} {path} {type} {keyDelim} {...rest} />
}
