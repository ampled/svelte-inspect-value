import { track, bindValue } from 'ripple';
import { Inspect } from './lib/Inspect.tsrx';
import { Test2 } from './TestTwo.tsrx';

type Props = {
	value: { current: number };
};

export component Test(&{ value }: Props) {
	<Test2
		Count={component() {
			<span>{value.current}</span>
		}}
	/>
}
