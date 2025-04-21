<!--
@component Panel
-->

<script module lang="ts">
  export let globalInspectState = $state({
    mounted: [] as string[],
  })
</script>

<script lang="ts">
  import { getContext, setContext, untrack } from 'svelte'
  import { resizable, type ResizableDirections } from './action/resizable.svelte.js'
  import CollapseStateProvider from './CollapseStateProvider.svelte'
  import Node from './components/Node.svelte'
  import NodeActionButton from './components/NodeActionButton.svelte'
  import NodeIconButton from './components/NodeIconButton.svelte'
  import PropertyList from './components/PropertyList.svelte'
  import Select from './components/Select.svelte'
  import { globalValues } from './global.svelte.js'
  import { logToConsole } from './hello.svelte.js'
  import CircleSolid from './icons/CircleSolid.svelte'
  import Console from './icons/Console.svelte'
  import Fullscreen from './icons/Fullscreen.svelte'
  import FullscreenExit from './icons/FullscreenExit.svelte'
  import OpacityIcon from './icons/OpacityIcon.svelte'
  import {
    createOptions,
    GLOBAL_OPTIONS_CONTEXT,
    mergeOptions,
    type InspectOptions,
  } from './options.svelte.js'
  import type { InspectPanelProps, XPos, YPos } from './types.js'
  import { getAllProperties, initialize, sortProps } from './util.js'
  import Wrapper from './Wrapper.svelte'

  let {
    children,
    value,
    values,
    heading,
    name,
    position = $bindable(['top', 'right']),
    hideToolbar = false,
    hideGlobalValues = false,
    resize = $bindable(true),
    open = $bindable(false),
    appearance = $bindable('solid'),
    opacity = $bindable(false),
    openOnHover = false,
    zIndex = 1000,
    class: className,
    ...rest
  }: InspectPanelProps = $props()

  const id = $props.id()

  let full = $state(false)
  let hovered = $state(false)

  let shouldBeOpen = $derived.by(() => {
    if (openOnHover) {
      return hovered || open
    }
    return open
  })

  let [yPosition, xPosition = 'right'] = $derived(position)
  let keys = $derived.by(() => {
    if (values) return getAllProperties(values)
    return []
  })

  let [optionsProps, restProps] = $derived(sortProps(rest))

  let globalOptions = getContext<Partial<InspectOptions> | (() => Partial<InspectOptions>)>(
    GLOBAL_OPTIONS_CONTEXT
  )

  let mergedOptions = $derived(
    mergeOptions(
      { ...optionsProps },
      typeof globalOptions === 'function' ? globalOptions() : globalOptions
    )
  )

  let options = createOptions(() => mergedOptions)
  let { theme, noanimate, borderless, onCollapseChange } = $derived(options.value)

  let shouldRender = $derived(
    typeof options.value.renderIf === 'function'
      ? Boolean(options.value.renderIf())
      : Boolean(options.value.renderIf)
  )

  function onPositionChange(yPos: YPos, xPos: XPos) {
    position = [yPos, xPos]
  }

  let flash = $state(false)
  function oninspectvaluechange(): void {
    flash = true
    setTimeout(() => {
      flash = false
    }, 500)
  }

  let resizableHandles = $derived.by<ResizableDirections[]>(() => {
    const ret = [] as ResizableDirections[]

    if (full) return []

    if (['bottom', 'middle'].includes(yPosition)) {
      ret.push('top')
    }

    if (['right', 'center'].includes(xPosition)) {
      ret.push('left')
    }

    if (['left', 'center'].includes(xPosition)) {
      ret.push('right')
    }

    if (['top', 'middle'].includes(yPosition)) {
      ret.push('bottom')
    }

    return ret
  })

  $effect(() => {
    if (!hideGlobalValues && shouldRender) untrack(() => globalInspectState.mounted.push(id))

    return () => {
      globalInspectState.mounted = globalInspectState.mounted.filter((i) => i !== id)
    }
  })

  setContext(Symbol.for('siv.fixed'), true)
  initialize(options)
</script>

{#if shouldRender}
  <aside
    {oninspectvaluechange}
    onpointerenter={() => (hovered = true)}
    onpointerleave={() => (hovered = false)}
    style:z-index={zIndex}
    class={[
      'inspect-panel',
      theme,
      full ? 'full' : [xPosition, yPosition],
      appearance,
      borderless && 'borderless',
      noanimate && 'noanimate',
      opacity && 'opacity',
      flash && 'flash',
      shouldBeOpen && 'open',
      openOnHover && 'hoverable',
    ]}
    use:resizable={() => ({ handles: resizableHandles, enabled: resize })}
    {...restProps}
  >
    <button onclick={() => (open = !open)} class="handle" type="button" aria-label="toggle panel">
      <div class="caret">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
          ><path
            stroke="currentColor"
            stroke-width={openOnHover ? (open ? 0 : 80) : 0}
            stroke-linecap="butt"
            stroke-linejoin="bevel"
            fill={openOnHover ? (open ? 'currentColor' : 'transparent') : 'currentColor'}
            d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37"
          /></svg
        >
      </div>
    </button>
    {#if !hideToolbar}
      <div class={['toolbar', yPosition]}>
        {#if !full}
          <NodeIconButton title="toggle opacity" onclick={() => (opacity = !opacity)}>
            {#if opacity}
              <OpacityIcon />
            {:else}
              <CircleSolid />
            {/if}
          </NodeIconButton>
        {/if}
        <NodeIconButton title="toggle full" onclick={() => (full = !full)}>
          {#if full}
            <FullscreenExit />
          {:else}
            <Fullscreen />
          {/if}
        </NodeIconButton>
        {#if !full}
          <div class="spacer"></div>
        {/if}

        {#if !full}
          <div class="group">
            <Select
              prefix="y"
              name="y-position"
              value={yPosition}
              onchange={(e) => onPositionChange(e.currentTarget.value, xPosition)}
            >
              <option>top</option>
              <option disabled={xPosition === 'full-x' || xPosition == 'center'}>middle</option>
              <option>bottom</option>
              <option value="full-y" disabled={['center', 'full-x'].includes(xPosition)}
                >full</option
              >
            </Select>

            <Select
              prefix="x"
              name="x-position"
              value={xPosition}
              onchange={(e) => onPositionChange(yPosition, e.currentTarget.value)}
            >
              <option>left</option>
              <option disabled={yPosition === 'full-y' || yPosition === 'middle'}>center</option>
              <option>right</option>
              <option value="full-x" disabled={['middle', 'full-y'].includes(yPosition)}
                >full</option
              >
            </Select>
            <Select bind:value={appearance}>
              <option>solid</option>
              <option>dense</option>
              <option>glassy</option>
              <option>floating</option>
            </Select>
          </div>
        {/if}
      </div>
    {/if}

    {#if value || name || (keys.length && values)}
      <CollapseStateProvider {onCollapseChange}>
        <Wrapper
          class={[theme, borderless && 'borderless', className]}
          {heading}
          style={hideToolbar ? 'border-top: none' : ''}
        >
          {#if values && keys.length}
            <PropertyList value={values} {keys} />
          {:else if name || value}
            <Node {value} key={name} />
          {:else}
            <div style="color: var(--_comment-color); text-align: center">no value</div>
          {/if}
        </Wrapper>
      </CollapseStateProvider>
    {/if}
    {#if globalValues.size > 0 && !hideGlobalValues}
      <CollapseStateProvider {onCollapseChange}>
        <Wrapper class={[theme, borderless && 'borderless', className]}>
          {#snippet heading()}
            global values
            <div
              style="display: flex; align-items: center; justify-content: flex-end; gap: 0.5em; flex-basis: 100%"
            >
              <NodeIconButton
                onclick={() => logToConsole(['global values'], globalValues, 'map')}
                style="width: 2em; height: 2em"
              >
                <Console />
              </NodeIconButton>
              <NodeActionButton onclick={() => globalValues.clear()}>clear</NodeActionButton>
            </div>
          {/snippet}
          {#each globalValues as [key, { note, value }] (key)}
            <Node {note} key={key as PropertyKey} value={value()} />
          {/each}
        </Wrapper>
      </CollapseStateProvider>
    {/if}
    {#if children}
      {@render children?.()}
    {/if}
  </aside>
{/if}

<style>
  @import './action/resize.css';
  @import './themes.css';
  @import './vars.css';

  @keyframes wiggle {
    0%,
    100% {
      translate: 0;
    }
    25% {
      translate: -1%;
    }
    50% {
      translate: 1%;
    }
    75% {
      translate: -1%;
    }
  }

  .inspect-panel {
    --closed-percent: 100%;
  }

  .inspect-panel.hoverable {
    --closed-percent: calc(100% - 0.5em);
  }

  .inspect-panel {
    --border-radius: 8px;
    --handle-offset: 0;
    position: fixed;
    display: flex;
    transition:
      background-color 400ms ease-in-out,
      width 400ms ease-in-out,
      height 400ms ease-in-out,
      top 400ms ease-in-out,
      left 400ms ease-in-out,
      bottom 400ms ease-in-out,
      right 400ms ease-in-out,
      opacity 400ms ease-in-out,
      border 400ms ease-in-out,
      outline 400ms ease-in-out,
      outline-color 200ms ease-in-out,
      transform 400ms ease-in-out;

    flex-direction: column;
    align-items: flex-start;
    gap: 0.5em;
    padding: 0.5em;
    min-width: 425px;
    background-color: transparent;
    /* z-index: 9998; */
    min-height: 100px;
    max-height: 100vh;
    overflow: visible;
    font-family: var(--_inspect-font, monospace);
    font-size: var(--inspect-font-size, 12px);
    transform: translateX(var(--translate-x, 0)) translateY(var(--translate-y, 0));

    .handle {
      all: unset;
      transition:
        all 400ms ease-in-out,
        background-color 0ms,
        border 0ms;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      /* z-index: 20; */

      .caret {
        color: var(--_button-color);
        transition: all 400ms ease-in-out 200ms;
        width: 100%;
        height: 100%;
        rotate: 180deg;
      }

      svg {
        height: 100%;
        width: 100%;
      }
    }

    &.open .handle .caret {
      rotate: none;
    }

    &.resizing {
      outline: 1px solid var(--_button-color);
      transition: none;

      .handle {
        transition: none;
        border-color: var(--_button-color) !important;
      }
    }

    &.dense {
      padding: 0;
      gap: 0;
      border-radius: 0 !important;
      background-color: var(--_background-color);
      border: 1px solid var(--_border-color);

      .handle {
        background-color: inherit;
        width: 20px;
        height: 40px;
        transform-origin: 100% 50%;
        border-radius: 0;
        border: 1px solid var(--_border-color);
        border-right: none;

        &:hover,
        &:focus {
          background-color: var(--_hover-color);
        }
      }

      .toolbar {
        background-color: transparent;
        border: none;
      }

      :global .svelte-inspect-value {
        padding: 0;
        background-color: none;
        border-radius: 0;
        border: none;
        border-top: 1px solid var(--_border-color);
      }
    }

    &.solid {
      --solid-bg: color-mix(in srgb, var(--_background-color), black 20%);
      background-color: var(--solid-bg);
      border: 1px solid var(--_border-color);

      &.borderless {
        background-color: var(--_background-color);

        .toolbar {
          background-color: transparent;
          border: none;
        }

        .handle {
          &:hover,
          &:focus {
            background: linear-gradient(
              to right,
              var(--_hover-color) 20%,
              var(--_background-color) 90%
            );
          }
        }
      }

      .handle {
        background-color: inherit;
        width: 20px;
        height: 40px;
        transform-origin: 100% 50%;
        border-radius: var(--border-radius) 0 0 var(--border-radius);
        border: 1px solid var(--_border-color);
        border-right: none;

        &:hover,
        &:focus {
          background: linear-gradient(to right, var(--_hover-color) 20%, var(--solid-bg) 90%);
        }
      }
    }

    &.glassy {
      background-color: color-mix(in srgb, var(--_background-color), rgba(255 255 255 / 0.1) 50%);
      backdrop-filter: blur(5px);

      .handle {
        background-color: inherit;
        width: 20px;
        height: 40px;
        transform-origin: 100% 50%;
        border-radius: var(--border-radius) 0 0 var(--border-radius);
        border-right: none;

        &:hover,
        &:focus {
          background-color: color-mix(in srgb, var(--_hover-color), rgba(255 255 255 / 0.1) 50%);
        }
      }
    }

    &.floating {
      --handle-offset: -1em;
      background-color: transparent;
      outline: 1px solid transparent;

      &:hover {
        outline-color: var(--_button-color);
      }

      .handle {
        transform-origin: 100% 50%;
        background-color: var(--_background-color);
        height: 30px;
        width: 30px;
        border-radius: 9999px;
        border: 1px solid var(--_border-color);

        .caret {
          width: 15px;
          height: 15px;
        }

        &:hover,
        &:focus {
          background-color: var(--_hover-color);
        }
      }
    }

    &.full {
      transition: all 0ms ease-in-out;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      max-width: 100%;
      width: 100%;
      border-radius: 0;
      opacity: 1 !important;
      border: none;

      .handle {
        display: none;
      }
    }

    &.flash:not(.open) {
      animation-name: wiggle;
      animation-duration: 0.5s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }

    &.opacity {
      opacity: 0.5;
    }

    &:hover,
    &:focus-within {
      opacity: 1;
    }

    &.top {
      border-top: none;
      top: 0;
      max-height: calc(100% - 30px);

      &.right .handle,
      &.left .handle {
        top: 12px;
      }

      &.center .handle {
        bottom: var(--handle-offset);
        transform: rotate(-90deg) translate(-100%, -50%);
      }

      &.center {
        border-bottom-left-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
      }

      &.full-x,
      &.center {
        --translate-y: calc(var(--closed-percent) * -1);
      }

      &.open {
        --translate-y: 0;
      }
    }

    &.middle {
      top: 50%;
      --translate-y: -50%;

      &.open {
        --translate-y: -50%;
        --translate-x: 0;
      }

      .handle {
        top: calc(50% - 40px);
      }
    }

    &.bottom {
      justify-content: flex-end;
      max-height: calc(100% - 30px);
      bottom: 0;
      border-bottom: none;

      &.right .handle,
      &.left .handle {
        bottom: 12px;
      }

      &.center .handle,
      &.full-x .handle {
        top: var(--handle-offset);
        left: 50%;
        transform: rotate(90deg) translate(-100%, 50%);
      }

      &.center {
        border-top-left-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
      }

      &.full-x,
      &.center {
        --translate-y: var(--closed-percent);
      }

      &.open.center,
      &.open.full-x {
        --translate-y: 0;
      }
    }

    &.right {
      --translate-x: var(--closed-percent);
      /* left: calc(100% - 425px); */
      right: 0;
      border-right: none;
      max-width: calc(100vw - 30px);

      .handle {
        left: var(--handle-offset);
        transform: translateX(-100%);
      }

      &.open {
        --translate-x: 0;
      }

      &.top,
      &.middle {
        border-bottom-left-radius: var(--border-radius);
      }

      &.bottom,
      &.middle {
        border-top-left-radius: var(--border-radius);
      }
    }

    &.left {
      --translate-x: calc(var(--closed-percent) * -1);
      left: 0;
      border-left: none;

      .handle {
        right: var(--handle-offset);
        transform: rotate(180deg);
      }

      &.open {
        --translate-x: 0;
      }

      &.top,
      &.middle {
        border-bottom-right-radius: var(--border-radius);
      }

      &.bottom,
      &.middle {
        border-top-right-radius: var(--border-radius);
      }

      .toolbar {
        flex-direction: row-reverse;
      }
    }

    &.center {
      left: 50%;
      align-items: center;
      --translate-x: -50%;
      /* transform: translateX(-50%); */
    }

    &.hidden {
      opacity: 0;
    }

    &.full-y {
      top: 0;
      bottom: 0;
      height: 100%;
      flex-direction: column;
      border-radius: 0;
      border-top: none;
      border-bottom: none;

      .handle {
        top: 12px;
      }

      &.open {
        --translate-y: 0;
        --translate-x: 0;
      }
    }

    &.full-x {
      width: 100%;
      left: 0;
      right: 0;
      border-radius: 0;
      border-left: none;
      border-right: none;
    }
  }

  .toolbar {
    background-color: var(--_background-color);
    border: 1px solid var(--_border-color);
    padding: 0.375em 0.5em;
    transition: margin 150ms ease-in-out;
    transition-delay: 100ms;
    border-radius: 8px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;

    .spacer {
      width: 100%;
    }

    .group {
      display: flex;
      flex-direction: row;
      gap: 0.5em;
    }
  }
</style>
