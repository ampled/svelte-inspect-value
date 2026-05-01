import { track, effect } from 'ripple';
import { getAllProperties, type InspectProps, sortProps, mergeOptions } from '@inspect/core';
import { Node } from './Node.tsrx';
import { PropertyList } from './components/PropertyList.tsrx';
import { Wrapper } from './Wrapper.tsrx';
import { InspectProvider } from './components/InspectProvider.tsrx';
import { getGlobalInspectOptions } from './context';

export component Inspect(&{
	values,
	value,
	name,
	class: className,
	...props
}: InspectProps & JSX.IntrinsicElements['div']) {
	let &[[optionsProps, restProps]] = track(() => sortProps(props));
	const globalOptions = getGlobalInspectOptions();
	let &[mergedOptions, trackedOptions] = track(() => mergeOptions(optionsProps, globalOptions));

	let &[{ theme, noanimate, borderless, onCollapseChange, onLog, heading }] = track(
		() => mergedOptions,
	);

	let &[keys] = track(() => {
		if (values) {
			if (Array.isArray(values)) {
				return [
					...values.keys(),
					...getAllProperties(values).filter((prop) => {
						if (typeof prop === 'string') {
							return /\d+/.test(prop) === false && prop !== 'length';
						}
						return true;
					}),
				];
			}

			return getAllProperties(values);
		}
		return [];
	});

	<InspectProvider options={trackedOptions}>
		<Wrapper class={[className, theme]}>
			if (values && keys.length) {
				<PropertyList value={values} {keys} />
			} else if (name || value) {
				<Node {value} key={name} />
			}
		</Wrapper>
	</InspectProvider>
}
