import { type InspectOptions } from '@inspect/core';
import { Context, type Tracked } from 'ripple';

type InspectContext = {
	previewLevel: number;
	isKey?: boolean;
	options?: Tracked<InspectOptions>;
};

export const ctx = new Context<InspectContext>({} as InspectContext);

const globalOptionsCtx = new Context<Partial<InspectOptions>>({});

export function setGlobalInspectOptions(options: Partial<InspectOptions>) {
	globalOptionsCtx.set(options);
}

export function getGlobalInspectOptions() {
	return globalOptionsCtx.get();
}
