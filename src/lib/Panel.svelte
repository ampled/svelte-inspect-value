<script module lang="ts">
  export let globalInspectState = $state({
    mounted: [] as string[],
  })
</script>

<script lang="ts">
  import { getContext, setContext, untrack } from 'svelte'
  import type { ClassValue } from 'svelte/elements'
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
  import type { PanelProps, PositionProp, XPos, YPos } from './types.js'
  import { getAllProperties, initialize, sortProps } from './util.js'
  import Wrapper from './Wrapper.svelte'

  let {
    // base props
    value,
    values,
    name,
    heading,
    // panel props
    align = $bindable('right full'),
    appearance = $bindable('solid'),
    open = $bindable(false),
    opacity = $bindable(false),
    hideToolbar = false,
    hideGlobalValues = false,
    resize = true,
    openOnHover = false,
    zIndex = 1000,
    wiggleOnUpdate = true,
    onOpenChange,
    children,
    // inspect options and element attributes
    class: className,
    ...rest
  }: PanelProps = $props()

  const id = $props.id()
  let full = $state(false)
  let hovered = $state(false)
  let flash = $state(false)
  const handleLabel = $derived(open ? 'close panel' : 'open panel')

  let shouldBeOpen = $derived.by(() => {
    if (openOnHover) {
      return hovered || open
    }
    return open
  })

  let [xPos, yPos = 'full', xPosClassname, yPosClassname] = $derived.by(() => {
    let [x, y = 'full'] = align.split(' ') as [XPos, YPos]

    if (['full', 'center'].includes(x)) {
      if (!['top', 'bottom'].includes(y)) {
        y = 'top'
      }
    }
    if (['full', 'middle'].includes(y)) {
      if (!['right', 'left'].includes(x)) {
        x = 'right'
      }
    }

    return [x, y, x === 'full' ? 'full-x' : x, y === 'full' ? 'full-y' : y]
  })

  let keys = $derived.by(() => {
    if (values) return getAllProperties(values)
    return []
  })

  let resizableHandles = $derived.by<ResizableDirections[]>(() => {
    const ret = [] as ResizableDirections[]

    if (full) return []

    if (['bottom', 'middle'].includes(yPos)) {
      ret.push('top')
    }

    if (['right', 'center'].includes(xPos)) {
      ret.push('left')
    }

    if (['left', 'center'].includes(xPos)) {
      ret.push('right')
    }

    if (['top', 'middle'].includes(yPos)) {
      ret.push('bottom')
    }

    return ret
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
  let wrapperClasses = $derived<ClassValue>([theme, borderless && 'borderless', className])

  $effect(() => {
    globalValues.keys()
    untrack(() => {
      if (wiggleOnUpdate) oninspectvaluechange()
    })
  })

  $effect(() => {
    if (!hideGlobalValues && shouldRender) untrack(() => globalInspectState.mounted.push(id))

    return () => {
      globalInspectState.mounted = globalInspectState.mounted.filter((i) => i !== id)
    }
  })

  setContext(Symbol.for('siv.fixed'), true)
  initialize(options)

  function oninspectvaluechange(): void {
    if (flash) return
    flash = true
    setTimeout(() => {
      flash = false
    }, 500)
  }

  function onAlignChange(x: XPos, y: YPos) {
    align = `${x} ${y}` as PositionProp
  }

  function onHandleClick() {
    open = !open
    hovered = false
    onOpenChange?.(open)
  }
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
      full ? 'full' : [xPosClassname, yPosClassname],
      appearance,
      borderless && 'borderless',
      noanimate && 'noanimate',
      opacity && 'opacity',
      flash && wiggleOnUpdate && !hideGlobalValues && 'flash',
      shouldBeOpen && 'open',
      openOnHover && 'hoverable',
    ]}
    use:resizable={() => ({ handles: resizableHandles, enabled: resize })}
    {...restProps}
  >
    <button
      onclick={onHandleClick}
      class="handle"
      type="button"
      aria-label={handleLabel}
      title={handleLabel}
    >
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
      <div class={['toolbar', yPos]}>
        <div class="group">
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
        </div>

        {#if !full}
          <div class="group">
            <Select
              prefix="x"
              name="x-position"
              value={xPos}
              onchange={(e) => onAlignChange(e.currentTarget.value as XPos, yPos)}
            >
              <option>left</option>
              <option disabled={['middle', 'full'].includes(yPos)}>center</option>
              <option>right</option>
              <option disabled={['middle', 'full'].includes(yPos)}>full</option>
            </Select>

            <Select
              prefix="y"
              name="y-position"
              value={yPos}
              onchange={(e) => onAlignChange(xPos, e.currentTarget.value as YPos)}
            >
              <option>top</option>
              <option disabled={['full', 'center'].includes(xPos)}>middle</option>
              <option>bottom</option>
              <option disabled={['center', 'full'].includes(xPos)}>full</option>
            </Select>
            <Select bind:value={appearance} name="appearance">
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
          class={wrapperClasses}
          {heading}
          style={hideToolbar && appearance === 'dense' ? 'border-top: none' : ''}
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
        <Wrapper class={wrapperClasses}>
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
          {#each globalValues as [key, entry] (key)}
            <Node note={entry.note} key={key as PropertyKey} value={entry.value} />
          {/each}
          <!-- <Node value={globalValues.entries()} key="globalVals" /> -->
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

  :global(.inspect-panel) {
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
    }
  }

  :global .inspect-panel.noanimate * {
    transition: none !important;
  }

  .inspect-panel.noanimate {
    transition: none !important;
  }

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
    --inspect-min-width: 100%;
    container-type: inline-size;
    box-sizing: border-box;
    position: fixed;
    display: flex;
    transition:
      background-color 250ms ease-in-out,
      color 250ms ease-in-out,
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
    width: 420px;
    background-color: transparent;
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
      z-index: 20;

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
        border: 1px double var(--_border-color);
        border-right: none;
        box-shadow: -1px 0px 1px var(--_border-color) inset;

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
        background-color: transparent;
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

      &.center .handle,
      &.full-x .handle {
        left: 50%;
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
      max-height: 100%;
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
    border-radius: 8px;
    min-height: 2em;
    flex-shrink: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0.5em;
    overflow: auto;
    flex-wrap: wrap;

    .spacer {
      width: 100%;
    }

    .group {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5em;
    }

    @container (inline-size < 220px) {
      gap: 0.25;

      .group {
        width: 100%;
        justify-content: flex-end;
        gap: 0.25em;
      }
    }
  }
</style>
