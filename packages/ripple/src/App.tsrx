import { track, bindValue, RippleObject } from 'ripple';
import { Inspect } from './lib/Inspect.tsrx';
import { Test } from './Test.tsrx';

export component App() {
	let &[count] = track(0);
	let &[counter] = track({ current: 0 });
	let &[theme, themeTracked] = track('inspect');
	let &[div] = track();
	let values = new RippleObject({
		symb: Symbol.for('s'),
		foo: 1,
		count,
		baz: 'three',
		multiLineString: 'a\na',
		obj: {
			bing: 'bong',
			bong: {
				msg: 'ding',
			},
		},
	});

	<Inspect {theme} expandLevel={0} values={{ ...values, count }} />

	<button
		onClick={() => {
			counter.current++;
			count++;
		}}
	>
		{'+'}
	</button>
	<button
		onClick={() => {
			counter.current--;
			count--;
		}}
	>
		{'-'}
	</button>

	<label>
		{'theme'}
		<select {ref bindValue(themeTracked)}>
			<option>{'inspect'}</option>
			<option>{'drak'}</option>
			<option>{'stereo'}</option>
		</select>
	</label>

	if (count === 1) {
		<div
			{ref (node: HTMLDivElement) => {
				div = node;
				node.style.transition = 'opacity 500ms';
				node.style.opacity = '0';
				setTimeout(() => {
					node.style.opacity = '1';
				}, 500);
				console.log('mounted', node);
				return () => {
					console.log('bye div');
					div = undefined;
				};
			}}
		>
			{'hello'}
		</div>
	}

	<h1>{'Test'}</h1>
	<Test value={counter} />
}
