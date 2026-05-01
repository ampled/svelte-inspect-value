import { track, effect, type PropsWithChildren, type Tracked, RippleObject } from 'ripple';
import { ctx } from '../context.js';
import { createCollapseState, type CollapseState } from '../state';
import { type InspectOptions } from '@inspect/core';

type Props = PropsWithChildren<{
	options: Tracked<InspectOptions>;
}>;

export component InspectProvider(&{ options, children }: Props) {
	const ctxVal = ctx.get();
	let state = new RippleObject<CollapseState>({});

	ctxVal.options = options;
	ctxVal.collapseState = createCollapseState(state);

	effect(() => {
		console.log('provider options:', options);
	});

	{children}
}
