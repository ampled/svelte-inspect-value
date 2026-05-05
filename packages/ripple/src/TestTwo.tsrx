import { track, bindValue, type Component } from 'ripple';
import { Inspect } from './lib/Inspect.tsrx';

type Props = {
	Count: Component;
};

export component Test2(&{ Count }: Props) {
	<Count />
}
