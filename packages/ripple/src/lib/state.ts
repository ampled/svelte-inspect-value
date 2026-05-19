import { ensureStringPath } from '@inspect/core';
import { Tracked, RippleObject, Context, effect } from 'ripple';

/** @inline */
export type CollapseState = Record<string, boolean>;

type Subscriber = (state: CollapseState) => void;

export function createCollapseState(
  init: RippleObject<CollapseState>,
  onChange?: (value: CollapseState) => void
) {
  let subscribers: Subscriber[] = [];
  function emitChanged() {
    onChange?.(init);
    subscribers.forEach((s) => {
      s(init);
    });
  }

  return {
    getValue() {
      return init;
    },
    get value() {
      return init;
    },
    set value(val: CollapseState) {
      init = val;
    },
    get valueAsJson() {
      return JSON.stringify(init);
    },
    setCollapse: (keyOrPath: string | PropertyKey[], collapsed: boolean) => {
      try {
        const key = ensureStringPath(keyOrPath);
        let changed = false;
        if (init) {
          init[key] = collapsed;
          changed = true;
          // init = new RippleObject({ ...init });
        }
        if (changed && init) {
          emitChanged();
        }
      } catch (e) {
        console.error(e);
      }
    },
    getCollapse(keyOrPath: string | PropertyKey[]) {
      const key = ensureStringPath(keyOrPath);
      return init?.[key];
    },
    subscribe(subscriber: Subscriber) {
      subscribers.push(subscriber);
      subscriber(init);
      return () => {
        subscribers = subscribers.filter((s) => s !== subscriber);
      };
    },
  };
}

export const collapseStateCtx = new Context<ReturnType<typeof createCollapseState>>();
