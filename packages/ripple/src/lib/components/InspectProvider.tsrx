import {
  track,
  effect,
  type PropsWithChildren,
  type Tracked,
  RippleObject,
  RippleMap,
} from 'ripple';
import { ctx, valueCacheCtx } from '../context.js';
import { createCollapseState, type CollapseState, collapseStateCtx } from '../state';
import { type InspectOptions } from '@inspect/core';

type Props = PropsWithChildren<{
  options: Tracked<InspectOptions>;
}>;

export component InspectProvider(&{ options, children }: Props) {
  const ctxVal = ctx.get();
  let stateInit = new RippleObject<CollapseState>({});
  let collapseState = createCollapseState(stateInit, (s) => options.value.onCollapseChange?.(s));
  collapseStateCtx.set(collapseState);

  ctxVal.options = options;

  const valueCache = new RippleMap<string, unknown>();
  valueCacheCtx.set(valueCache);

  effect(() => {
    // console.log('provider options:', options.value);
  });

  effect(() => {
    // console.log('collapse state:');
    // console.log(JSON.stringify(stateInit))
  });

  {children}
}
