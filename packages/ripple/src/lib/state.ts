import { ensureStringPath } from '@inspect/core';
import { Tracked, type RippleObject } from 'ripple';

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
	};
}
