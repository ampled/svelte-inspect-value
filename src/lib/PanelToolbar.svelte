<script lang="ts">
  import NodeIconButton from './components/NodeIconButton.svelte'
  import Select from './components/Select.svelte'
  import * as icons from './components/icons/index.js'
  import type { PanelAppearance, XPos, YPos } from './types.js'

  type VoidCallback = () => void

  type ToolbarProps = {
    full: boolean
    opacity: boolean
    toggleOpacity: VoidCallback
    xPos: XPos
    yPos: YPos
    onAlignChange: (xPos: XPos, yPos: YPos) => void
    appearance: PanelAppearance
    settingsChanged: VoidCallback
  }

  let {
    full,
    opacity,
    xPos,
    yPos,
    appearance = $bindable('solid'),
    toggleOpacity,
    settingsChanged,
    onAlignChange,
  }: ToolbarProps = $props()
</script>

<div class={['toolbar', yPos]}>
  <div class="group">
    {#if !full}
      <NodeIconButton title="toggle opacity" onclick={toggleOpacity}>
        {#if opacity}
          <icons.Opacity />
        {:else}
          <icons.Circle />
        {/if}
      </NodeIconButton>
    {/if}
    <NodeIconButton title="toggle full" onclick={() => (full = !full)}>
      {#if full}
        <icons.FullscreenExit />
      {:else}
        <icons.Fullscreen />
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
      <Select bind:value={appearance} name="appearance" onchange={settingsChanged}>
        <option>solid</option>
        <option>dense</option>
        <option>glassy</option>
        <option>floating</option>
      </Select>
    </div>
  {/if}
</div>

<style>
  .toolbar {
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.5em;
    box-sizing: border-box;
    border: 1px solid var(--_border-color);
    border-radius: 8px;
    background-color: var(--_background-color);
    padding: 0.375em 0.5em;
    width: 100%;
    min-height: 2em;
    overflow: auto;

    .group {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5em;
    }

    @container (inline-size < 220px) {
      gap: 0.25;

      .group {
        justify-content: flex-end;
        gap: 0.25em;
        width: 100%;
      }
    }
  }
</style>
