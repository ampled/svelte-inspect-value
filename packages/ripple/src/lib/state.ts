import { ensureStringPath } from '@inspect/core';
import { Tracked, type RippleObject, Context } from 'ripple';

/** @inline */
export type CollapseState = Record<string, boolean>;

export function createCollapseState(
	init: RippleObject<CollapseState>,
	onChange?: (value: CollapseState) => void
) {
	function emitChanged() {
		onChange?.(init);
	}

	return {
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
	};
}

export const collapseStateCtx = new Context<ReturnType<typeof createCollapseState>>();
