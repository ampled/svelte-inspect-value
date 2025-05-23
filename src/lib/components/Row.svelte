<script lang="ts">
  import {
    enterFocusScope,
    exitFocusScope,
    focusNext,
    focusPrev,
    focusTarget,
  } from '../action/focus.svelte.js'
  import { tick, type Snippet } from 'svelte'
  import { type } from '../typingbuffer.svelte.js'

  type Props = {
    collapsed?: boolean
    disabled?: boolean
    isFocusTarget?: boolean
    previewLevel?: number
    borderless?: boolean
    children: Snippet
    onchange?: (collapsed: boolean) => void
  }

  let {
    collapsed,
    disabled = true,
    children,
    onchange,
    isFocusTarget,
    previewLevel = 0,
    borderless = false,
  }: Props = $props()

  function onclick() {
    onchange?.(!collapsed)
  }

  function onkeydown(event: KeyboardEvent) {
    console.log('key:', event.key)
    let shouldPreventDefault = true
    if (event.metaKey) {
      return
    }
    switch (event.code) {
      case 'Space': {
        onchange?.(!collapsed)
        break
      }
      case 'ArrowUp': {
        focusPrev()
        break
      }
      case 'ArrowDown': {
        focusNext()
        break
      }
      case 'ArrowLeft': {
        if (!collapsed) {
          onchange?.(true)
        } else {
          exitFocusScope()
        }
        break
      }
      case 'Enter': {
        if (!disabled) {
          if (collapsed) {
            onchange?.(false)
            tick().then(enterFocusScope)
          } else {
            const didFocus = enterFocusScope()
            if (!didFocus) {
              onchange?.(true)
            }
          }
        } else {
          focusNext()
        }
        break
      }
      case 'ArrowRight': {
        if (collapsed && !disabled) {
          onchange?.(false)
        } else {
          if (!enterFocusScope()) {
            focusNext()
          }
        }
        break
      }
      default: {
        shouldPreventDefault = false
        if (event.key.length === 1) {
          type(event.key)
        }
        break
      }
    }
    if (shouldPreventDefault) {
      event.preventDefault()
    }
  }
</script>

<div
  data-testid="row"
  role="button"
  class={['row-target', disabled && 'disabled', !borderless && 'full-width']}
  aria-disabled={disabled}
  tabindex={previewLevel > 0 ? -1 : 0}
  {onclick}
  {onkeydown}
  use:focusTarget={isFocusTarget}
>
  {@render children()}
</div>

<style>
  .row-target {
    all: unset;
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: var(--line-gap, 0.5em);
    transform-origin: 0% 50%;
    cursor: default;
    box-sizing: border-box;
    height: 100%;
    max-height: 1.5em;

    &:hover {
      background-color: transparent;
    }
  }

  .row-target.full-width {
    width: 100%;
  }

  :global .row-target:focus {
    .collapse {
      color: var(--_caret-focus-color);
    }

    .bullet .dash {
      border-radius: 4px;
      background-color: var(--_caret-focus-color);
      width: 8px;
      /* height: 4px; */
    }
  }

  :global .row-target:hover {
    .collapse {
      color: var(--_caret-hover-color);
    }

    .bullet .dash {
      border-radius: 4px;
      background-color: var(--_caret-hover-color);
      /* width: 8px; */
      height: 2px;
    }
  }
</style>
