<script lang="ts">
  import { getContext, setContext } from 'svelte'
  import Root from './Root.svelte'
  import NodeActionButton from './components/NodeActionButton.svelte'
  import NodeIconButton from './components/NodeIconButton.svelte'
  import Select from './components/Select.svelte'
  import { globalValues } from './global.svelte.js'
  import CircleIcon from './icons/CircleIcon.svelte'
  import CircleSolid from './icons/CircleSolid.svelte'
  import Eye from './icons/Eye.svelte'
  import EyeOff from './icons/EyeOff.svelte'
  import Fullscreen from './icons/Fullscreen.svelte'
  import FullscreenExit from './icons/FullscreenExit.svelte'
  import {
    createOptions,
    GLOBAL_OPTIONS_CONTEXT,
    mergeOptions,
    OPTIONS_CONTEXT,
    type InspectOptions,
  } from './options.svelte.js'
  import type { InspectProps } from './types.js'

  type YPos = 'middle' | 'top' | 'bottom' | (string & {})
  type XPos = 'right' | 'left' | 'center' | (string & {})
  type PositionProp = [YPos, XPos]

  type Props = InspectProps & { position?: PositionProp }

  let {
    value,
    name,
    position = $bindable(['middle', 'left']),
    showLength,
    showTypes,
    showPreview,
    previewDepth,
    previewEntries,
    showTools,
    quotes,
    expandAll,
    expandLevel,
    flashOnUpdate,
    stringCollapse,
    noanimate,
    borderless,
    theme,
    customComponents,
    embedMedia,
    elementView,
    renderIf,
    ...props
  }: Props = $props()

  let open = $state(false)
  let opacity = $state(true)
  let moving = $state(false)
  let full = $state(false)
  let yPosition = $state(position[0])
  let xPosition = $state(position[1])

  let globalOptions = getContext<Partial<InspectOptions>>(GLOBAL_OPTIONS_CONTEXT)

  let mergedOptions = $derived(
    mergeOptions(
      {
        showLength,
        showTypes,
        showPreview,
        previewDepth,
        previewEntries,
        showTools,
        quotes,
        expandAll,
        expandLevel,
        flashOnUpdate,
        stringCollapse,
        noanimate,
        borderless,
        theme,
        customComponents,
        embedMedia,
        elementView,
        renderIf,
      },
      { ...globalOptions }
    )
  )

  let options = createOptions(() => mergedOptions)
  setContext(OPTIONS_CONTEXT, options)
  setContext('global', true)

  $effect(() => {
    options.setOptions(mergedOptions)
  })

  $effect(() => {
    globalValues.set(name, () => value)
  })

  let shouldRender = $derived(
    typeof options.value.renderIf === 'function'
      ? Boolean(options.value.renderIf())
      : Boolean(options.value.renderIf)
  )

  function onPositionChange(yPos: string, xPos: string) {
    moving = true
    setTimeout(() => {
      yPosition = yPos
      xPosition = xPos
      position = [yPos, xPos]
    }, 250)
    setTimeout(() => {
      moving = false
    }, 750)
  }

  let inspectGlobalElement = $state<HTMLDivElement>()
</script>

{#if shouldRender}
  <div
    bind:this={inspectGlobalElement}
    class={[
      'inspect-global',
      full ? 'full' : [xPosition, yPosition],
      options.value.theme,
      options.value.noanimate && 'noanimate',
      open && globalValues.size > 0 && 'open',
      opacity && 'opacity',
      moving && 'moving',
      globalValues.size === 0 && 'hidden',
    ]}
    class:open={open && globalValues.size > 0}
  >
    <div class="toolbar">
      {#if !full}
        <NodeIconButton title="toggle open" onclick={() => (open = !open)}>
          {#if open}
            <CircleSolid />
          {:else}
            <CircleIcon />
          {/if}
        </NodeIconButton>
        <NodeIconButton
          title="toggle opacity"
          onclick={() => (opacity = !opacity)}
          style="border-radius: 9999px"
        >
          {#if opacity}
            <Eye />
          {:else}
            <EyeOff />
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

      <NodeActionButton onclick={() => globalValues.clear()}>clear</NodeActionButton>
      {#if !full}
        <div class="group">
          <Select
            name="y-position"
            value={yPosition}
            onchange={(e) => onPositionChange(e.currentTarget.value, xPosition)}
          >
            <option>top</option>
            <option>middle</option>
            <option>bottom</option>
          </Select>
          <Select
            name="x-position"
            value={xPosition}
            onchange={(e) => onPositionChange(yPosition, e.currentTarget.value)}
          >
            <option>left</option>
            <option>center</option>
            <option>right</option>
          </Select>
        </div>
      {/if}
    </div>

    {#each globalValues as [key, value] (key)}
      <Root {...props} borderless name={key?.toString()} value={value()} />
    {/each}
  </div>
{/if}

<style>
  @import './themes.css';

  .inspect-global {
    --cyan: var(--base0C, #00c1be);
    --yellow: var(--base0A, #e1ff7f);
    --green: var(--base0B, #5faa70);
    --red: var(--base08, #b03a3a);
    --purple: var(--base0E, #8f42ae);
    --blue: var(--base0D, #6a6ace);
    --orange: var(--base09, #c6903a);

    --bg: var(--base00, #0e0026);
    --bg-lighter: var(--base01, #250060);
    --bg-light: var(--base07);
    --selection: var(--base02);
    --comments: var(--base03, #59456e);
    --border-color: var(--base03, var(--comments));
    --dark-fg: var(--base04);
    --fg: var(--base05, #b9a9be);
    --fg-light: var(--base06);

    --error: var(--red);
    --delimiter: var(--red);
    --keyword: var(--red);
    --number: var(--purple);
    --number-type: var(--red);
    --boolean: var(--purple);
    --class: var(--blue);
    --string: var(--yellow);
    --string-type: var(--purple);
    --regex: var(--cyan);
    --symbol: var(--cyan);
    --function: var(--green);
    --object-type: var(--cyan);
    --object: var(--cyan);
    --interactive: var(--base0E);
    --deprecated: var(--base0F);

    --indent: 0.5em;
  }

  :global .inspect-global.noanimate * {
    transition: none !important;
  }

  :global .inspect-global:not(.noanimate) {
    transition: all 250ms ease-in-out;
  }

  .inspect-global {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5em;
    padding: 1em;
    background-color: rgb(255 255 255 / 0.1);
    backdrop-filter: blur(5px);
    z-index: 9999;
    max-height: 100vh;
    overflow-y: auto;
    overflow-x: visible;
    width: 100%;
    max-width: calc(540px + 2em);
    position: fixed;
    font-family: var(--inspect-font, monospace);
    font-size: var(--inspect-font-size, 12px);
    transform: translate(var(--translate-x), var(--translate-y));
    border-radius: 8px;
    opacity: 1;

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
      resize: unset;
    }

    &.opacity {
      opacity: 0.5;
    }

    &:hover {
      opacity: 1;
    }

    &.top {
      top: 0;
      /* margin-bottom: 100%; */
      flex-direction: column-reverse;
      --translate-y: -0.5em;

      &.center {
        --translate-y: calc(-100% + 2.5em);
      }

      &:hover,
      &.open {
        --translate-y: -0.5em;
      }
    }

    &.middle {
      top: 50%;
      /* margin-top: 0;
      margin-bottom: 0; */
      --translate-y: -50%;

      &:hover,
      &.open {
        --translate-y: -50%;
      }
    }

    &.bottom {
      bottom: 0;
      /* margin-top: 100%; */

      --translate-y: 0.5em;

      &.center {
        --translate-y: calc(100% - 2.5em);
      }

      &:hover,
      &.open {
        --translate-y: 0.5em;
      }
    }

    &.right {
      right: 0;
      /* margin-left: 100%; */

      /* left: 10%; */
      --translate-x: calc(100% - 2.5em);

      &:hover,
      &.open {
        --translate-x: 0.5em;
      }
    }

    &.left {
      left: 0;
      /* margin-right: 50%; */
      align-items: flex-end;

      /* right: 10%; */
      --translate-x: calc(-100% + 2.5em);

      &:hover,
      &.open {
        --translate-x: -0.5em;
      }

      .toolbar {
        /* justify-content: flex-end; */
        flex-direction: row-reverse;
      }
    }

    &.center {
      left: 50%;
      align-items: center;
      /* margin-right: 0; */
      /* margin-left: 0; */

      --translate-x: -50%;
    }

    &.open {
      /* opacity: 0.5; */

      &:hover {
        opacity: 1;
      }
    }

    &.hidden {
      opacity: 0;
    }

    &.moving {
      opacity: 0;
      /* opacity: 1;
      transition:
        transform 0ms ease-in-out,
        margin 1000ms ease-in-out,
        opacity 100ms ease-in-out !important; */
    }
  }

  .toolbar {
    background-color: var(--bg);
    border: 1px solid var(--border-color);
    padding: 0.25em;
    transition: all 100ms ease-in-out;
    border-radius: 8px;
    /* justify-content: space-between; */
    width: 100%;
    /* max-width: max-content; */
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
