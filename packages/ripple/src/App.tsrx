import { track, bindValue } from 'ripple';
import { Inspect } from './lib/Inspect.tsrx';

export component App() {
	let &[count] = track(0);
	let &[theme, themeTracked] = track('inspect');

	<Inspect
		{theme}
		values={{
			symb: Symbol.for('s'),
			foo: 1,
			bar: 2,
			baz: 'three',
			bing: 'a\na',
			obj: { bing: 'bong' },
		}}
	/>

	<button
		onClick={() => {
			count++;
		}}
	>
		{'+'}
	</button>

	<Inspect {theme} value={count} name="count" />
	<label>
		{'theme'}
		<select {ref bindValue(themeTracked)}>
			<option>{'inspect'}</option>
			<option>{'drak'}</option>
			<option>{'stereo'}</option>
		</select>
	</label>
}
