import { track } from 'ripple';
import { Bullet } from './Bullet.tsrx';

type Props = {
	collapsed?: boolean;
	onchange?: (collapsed: boolean) => void;
	value: unknown;
	key?: string | symbol | number;
	type?: string;
	disabled?: boolean;
} & JSX.IntrinsicElements['div'];

export component CollapseButton(&{
	collapsed,
	onchange,
	disabled,
	value,
	key,
	type,
	...rest
}: Props) {
	let &[flashing] = track(false);
	let &[rotation] = track(() => {
		if (collapsed) return 0;
		return 90;
	});

	<div style={`--flash-duration: 250ms`} class={['collapse', flashing && 'flashing']}>
		if (disabled) {
			<Bullet />
		} else {
			<div class="caret-transition">
				<svg
					style={{
						rotate: `${rotation}deg`,
						transition: 'rotate rotate var(--__transition-duration) var(--_back-out)',
						width: '100%',
						height: '100',
					}}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1024 1024"
				>
					<path
						fill="currentColor"
						d="M716 494 335 165c-14-12-35-1-35 19v656c0 20 21 31 35 19l381-328c11-10 11-28 0-37"
					/>
				</svg>
			</div>
		}
	</div>

	<style>
		.collapse {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			transition-duration: var(--__transition-duration);
			transition-property: color, rotate, transform, filter;
			transition-timing-function: var(--_back-out);
			aspect-ratio: 1 / 1;
			width: 1em;
			min-width: 1em;
			max-width: 1em;
			height: 1em;
			overflow: visible;
			color: var(--_caret-color);
			user-select: none;

			&:hover {
				background-color: transparent;
				color: var(--_caret-hover-color);
			}

			&:focus {
				color: var(--_caret-focus-color);
			}

			&.flashing {
				transform: scale(1.2, 1.2);
				filter: drop-shadow(0px 0px 2px var(--_update-flash-color));
				transition-duration: var(--flash-duration);
				color: var(--_update-flash-color);
			}

			&.child-flash {
				transition-duration: var(--flash-duration);
				color: var(--_child-update-flash-color);
			}

			.caret-transition {
				display: inline-flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
			}
		}
	</style>
}
