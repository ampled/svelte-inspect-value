import type { Children } from 'ripple';

type Props = {
  children: Children;
  success?: boolean;
} & JSX.IntrinsicElements['button'];

export component IconButton(&{ children, success = false, ...rest }: Props) {
  <button class={['node-icon-button', success && 'success']} type="button" {...rest}>
    {children}
  </button>

  <style>
    :global(.node-icon-button svg) {
      min-width: 1.5em;
      min-height: 1.5em;
    }

    .node-icon-button {
      all: unset;
      transform-origin: bottom center;
      scale: 1;
      transition:
        color 250ms ease-in-out,
        background-color 250ms ease-in-out,
        transform 100ms ease-in-out,
        scale 100ms ease-in-out;
      cursor: pointer;
      width: 1.5em;
      min-width: 1.5em;
      height: 1.5em;
      color: var(--_button-color);
      font-size: 1em;
      line-height: 1.5em;
      font-family: var(--inspect-font);
      text-align: center;

      @starting-style {
        scale: 0;
      }

      &.success {
        color: var(--_button-success-color) !important;
      }

      &:disabled {
        cursor: default;
        color: var(--_button-disabled-color) !important;
      }

      &:active:not(:disabled) {
        transform: scaleY(0.85);
        background-color: transparent;
        color: var(--_button-color);
      }

      &:hover:not(:disabled):not(:active),
      &:focus-visible {
        background-color: transparent;
        color: var(--_text-color);
      }
    }
  </style>
}
