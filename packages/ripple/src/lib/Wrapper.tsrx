import { track, type PropsWithChildrenOptional, type Children } from 'ripple';

type WrapperProps = PropsWithChildrenOptional<{
	showExpandCollapse?: boolean;
	onlog?: () => void;
	oninspectvaluechange?: () => void;
	onhandleclick?: () => void;
	headingExtra?: Children;
	heading?: string | Children;
}> & JSX.IntrinsicElements['div'];

export component Wrapper(&{
	onlog,
	oninspectvaluechange,
	showExpandCollapse = false,
	headingExtra,
	onhandleclick,
	heading,
	children,
	class: classValue,
	...rest
}: WrapperProps) {
	<div class={['ripple-inspect-value', classValue]} {...rest}>
		<div class="body">
			{children}
		</div>
	</div>

	<style>
		@import './vars.css';
		@import './themes.css';

		@keyframes markback {
			from {
				scale: 2;
			}
			to {
				scale: 1;
			}
		}

		@keyframes block {
			from {
				transform: scale(1, 1.2);
				color: var(--_text-color);
			}
			to {
				transform: scale(1, 1);
				color: currentColor;
			}
		}

		:global .ripple-inspect-value::selection {
			background-color: var(--_text-selection-background);
			color: var(--_text-color);
		}

		:global .ripple-inspect-value ::selection {
			background-color: var(--_text-selection-background);
			color: var(--_text-color);
		}

		.ripple-inspect-value:not(.noanimate) {
			transition-duration: var(--__transition-duration);
			transition-property: color, background-color, border-color, border;
			transition-timing-function: ease-in-out;
		}

		:global .ripple-inspect-value {
			*,
			*::before,
			*::after {
				box-sizing: border-box;
				margin: 0;
			}
		}

		:global .ripple-inspect-value.noanimate * {
			animation: none !important;
			transition: none !important;
		}

		.ripple-inspect-value {
			position: relative;
			box-sizing: border-box;
			box-sizing: border-box;
			container-type: inline-size;
			margin: 0;
			border: 1px solid var(--_border-color);
			border-radius: var(--_border-radius);
			background: var(--_background);
			background-color: var(--_background-color);
			width: var(--inspect-width, 100%);
			min-width: var(--inspect-min-width, 360px);
			max-width: var(--inspect-max-width, 100%);
			overflow: hidden;
			color: var(--_text-color);
			font-size: var(--inspect-font-size, 12px);
			line-height: 1.5em;
			font-family: var(--inspect-font, monospace);
			text-overflow: ellipsis;
			white-space: nowrap;
			-webkit-font-smoothing: subpixel-antialiased;
			-moz-osx-font-smoothing: grayscale;

			.heading {
				display: flex;
				position: relative;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				gap: 1ch;
				border-bottom: 1px solid var(--_border-color);
				padding-inline: 0.25em;
				padding-block: 0.25em;
				min-height: 2em;
				max-height: 2em;
				overflow: hidden;
				color: var(--_text-color);
				font-weight: bold;
				font-size: calc(var(--inspect-font-size, 12px) - 0px);

				.heading-collapse-button {
					all: unset;
					display: flex;
					flex: 0 1 50%;
					align-items: center;
					gap: 0.5em;
					box-sizing: border-box;
					padding-right: 0.25em;
					overflow: hidden;

					&:hover {
						background-color: transparent;
					}

					.heading-text {
						text-overflow: ellipsis;
					}
				}

				.heading-extra {
					display: flex;
					flex: 1 0 60%;
					justify-content: flex-end;
					align-items: center;
					gap: 0.5em;
					max-width: 26em;
				}

				&.collapsed {
					border: none;
				}
			}

			&.borderless {
				border: none;
				border-radius: 0;
				background-color: transparent;

				.body {
					border: none;
					background-color: transparent;
					padding: 0;
				}

				.heading {
					padding-inline: 0.25em;
					font-weight: bold;
				}
			}

			&.dense {
				border: none;
				border-radius: 0;

				.body {
					border: none;
					padding: 0;
				}

				.heading {
					border-bottom: none;
					padding-inline: 0.25em;
				}

				&.in-fixed {
					.body,
					.heading {
						border-top: 1px solid var(--_border-color);
					}
				}
			}

			.typebuffer {
				display: none;
				position: absolute;
				bottom: 0;
				left: 50%;
				justify-content: flex-start;
				align-items: center;
				gap: 0.5em;
				transform: translate(-50%, 0);
				z-index: 1;
				border: 1px solid var(--_border-color);
				border-bottom: none;
				border-radius: var(--_border-radius) var(--_border-radius) 0 0;
				background-color: var(--_background-color);
				padding: 1ch;
				width: 90%;
				max-width: 360px;
				overflow: clip;
				color: var(--_button-color);
				font-size: 1em;
				line-height: 1;
				text-align: left;

				.block {
					transform-origin: center 150%;
					animation-duration: 250ms;
					animation-timing-function: ease-in;
					animation-iteration-count: 1;
					animation-name: block;
					line-height: 1;
				}
			}

			&:focus-within .typebuffer {
				display: flex;
			}
		}

		.ripple-inspect-value.in-fixed {
			display: flex;
			flex-direction: column;
		}

		.ripple-inspect-value:has(.heading) {
			min-height: 26px;

			.body {
				padding-top: 0;
			}
		}

		.body {
			/** compact */
			position: relative;
			transition: padding-top var(--__transition-duration) ease-in-out;
			padding: var(--_padding-compact);
			width: 100%;
			height: 100%;
			overflow: auto;
			--__indent: var(--_indent-compact, 0.5em);
			--line-gap: 0.375em;
			--unit-display: none;

			@container (inline-size > 360px) {
				padding: var(--_padding-compact);
				--__indent: var(--_indent, 0.75em);
				--line-gap: 0.5em;
				--unit-display: inline-flex;
			}
		}

		.ripple-inspect-value :global(.indent) {
			&.string {
				border-color: var(--_string-value-color);
				overflow-x: auto;
			}

			&.function,
			&.asyncfunction,
			&.asyncgeneratorfunction,
			&.generatorfunction {
				border-color: var(--_function-name-color);
				overflow-x: auto;
			}

			&.error {
				border-color: var(--_error-color);
			}
		}

		.ripple-inspect-value :global(.type) {
			flex-shrink: 0;
			transition: color var(--__transition-duration) ease-in-out;
			color: var(--_object-type-color);
			font-weight: 900;
			font-size: 0.857em;

			&.null,
			&.undefined {
				border-radius: 2px;
				background-color: var(--_niltype-bg-color);
				padding-inline: 0.5em;
				height: 1.3em;
				color: var(--_niltype-text-color);
				line-height: 1.3em;
			}

			&.string {
				color: var(--_string-type-color);
			}

			&.number {
				color: var(--_number-type-color);
			}

			&.boolean {
				color: var(--_boolean-type-color);
			}

			&.array {
				color: var(--_array-type-color);
			}

			&.object {
				color: var(--_object-type-color);
			}

			&.bigint {
				color: var(--_bigint-type-color);
			}

			&.error,
			&.InspectError {
				color: var(--_error-color);
			}

			&.regexp {
				color: var(--_regex-type-color);
			}

			&.date {
				color: var(--_date-type-color);
			}

			&.function,
			&.asyncfunction,
			&.asyncgeneratorfunction,
			&.generatorfunction {
				color: var(--_function-type-color);
			}

			&.symbol {
				color: var(--_symbol-type-color);
			}

			&.map {
				color: var(--_map-type-color);
			}

			&.url {
				color: var(--_url-type-color);
			}

			&.urlsearchparams {
				color: var(--_urlsearchparams-type-color);
			}

			&.set {
				color: var(--_set-type-color);
			}

			&.class {
				color: var(--_class-type-color);
			}
		}

		.ripple-inspect-value :global(.value) {
			transition: color var(--__transition-duration) ease-in-out;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			&.string {
				color: var(--_string-value-color);
			}

			&.multi {
				padding: var(--_indent);
				padding-left: 0.75em;
				overflow-x: auto;
				overflow-y: clip;
				line-height: 1;
				text-overflow: unset;
				white-space: pre;
			}

			&.number {
				color: var(--_number-value-color);
			}

			&.boolean {
				color: var(--_boolean-value-color);
			}

			&.array {
				color: var(--_array-type-color);
			}

			&.object {
				color: var(--_object-type-color);
			}

			&.bigint {
				color: var(--_bigint-value-color);
			}

			&.url {
				color: var(--_url-type-color);
			}

			&.urlsearchparams {
				color: var(--_urlsearchparams-type-color);
			}

			&.error {
				color: var(--_error-color);
			}

			&.regexp {
				color: var(--_regex-value-color);
			}

			&.date {
				color: var(--_date-type-color);
			}

			&.function {
				color: var(--_function-name-color);
			}

			&.symbol {
				color: var(--_symbol-value-color);
			}

			&.map {
				color: var(--_map-type-color);
			}

			&.class {
				color: var(--_class-name-color);
			}

			&.html {
				padding-inline: 0.5em;
			}
		}

		.ripple-inspect-value :global(a) {
			color: inherit;
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}

		.ripple-inspect-value :global(code) {
			font-size: inherit;
			font-family: inherit;
		}

		.ripple-inspect-value :global(mark) {
			all: unset;
			box-sizing: border-box;
			/* outline: 1px solid black; */
			border-radius: 2px;
			background-color: var(--_text-search-highlight-color);
			height: 1em;
			height: 100%;
			overflow: visible;
			color: var(--_background-color);
			line-height: 1.5;
			/* text-decoration: underline; */
			/* text-decoration-style: wavy; */
			/* text-decoration-color: var(--_text-search-highlight-color); */
			/* text-decoration */
			/* text-decoration-thickness: 1px; */
		}

		.collapse {
			all: unset;
			all: unset;
			display: inline-flex;
			justify-content: center;
			align-items: center;
			transition: color var(--__transition-duration) ease-in-out;
			cursor: pointer;
			margin: 0;
			border: none;
			padding: 0;
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

			&:focus-visible {
				transform: scale(1.2);
				color: var(--_caret-focus-color);
			}

			&:disabled {
				cursor: default;
			}

			* {
				display: inline-flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
			}
		}
	</style>
}
