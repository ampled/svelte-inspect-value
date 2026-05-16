import { type InspectOptions } from '@inspect/core';
import { Context, type RippleMap, type Tracked } from 'ripple';

type InspectContext = {
  isKey?: boolean;
  options?: Tracked<InspectOptions>;
};

export const ctx = new Context<InspectContext>({} as InspectContext);
export const previewLevelCtx = new Context<number>();
export const valueCacheCtx = new Context<RippleMap<string, unknown>>();
export const debug = new Context(false);

const globalOptionsCtx = new Context<Partial<InspectOptions>>({});

export function setGlobalInspectOptions(options: Partial<InspectOptions>) {
  globalOptionsCtx.set(options);
}

export function getGlobalInspectOptions() {
  return globalOptionsCtx.get();
}
