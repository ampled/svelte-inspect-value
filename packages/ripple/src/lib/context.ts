import { type InspectOptions } from '@inspect/core';
import { Context, type Tracked } from 'ripple';
import { type createCollapseState } from './state';

type InspectContext = {
	collapseState: ReturnType<typeof createCollapseState>;
	previewLevel: number;
	isKey?: boolean;
	options?: Tracked<InspectOptions>;
};

export const ctx = new Context<InspectContext>();

const globalOptionsCtx = new Context<Partial<InspectOptions>>({});

export function setGlobalInspectOptions(options: Partial<InspectOptions>) {
	globalOptionsCtx.set(options);
}

export function getGlobalInspectOptions() {
	return globalOptionsCtx.get();
}
