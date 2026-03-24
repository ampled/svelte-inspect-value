<script lang="ts">
  import { slide } from 'svelte/transition'
  import { globalOpts } from './globalopts.svelte'
  import OptionToggle from './OptionToggle.svelte'
</script>

<div class="global-options not-content">
  <div class="options-title">
    global options (<a href="/api/type-aliases/inspectoptions" style="text-decoration: none;">
      docs
    </a>)
  </div>
  <div class="input-row">
    <label>
      theme
      <select bind:value={globalOpts.theme} name="theme" style="width: 100%">
        <option>inspect</option>
        <option>drak</option>
        <option>stereo</option>
        <option>dark</option>
        <option>light</option>
        <option>plain</option>
      </select>
    </label>
    <OptionToggle key="borderless">borderless</OptionToggle>
  </div>
  <div class="wrap-row">
    <OptionToggle key="parseJson" title="parse json strings">parse json</OptionToggle>
    <OptionToggle key="noanimate" title="disable animation">noanimate</OptionToggle>
    <OptionToggle key="flashOnUpdate" title="enable node indicators flashing when value is updated">
      flash on update
    </OptionToggle>
    <OptionToggle key="showTypes" title="show types">types</OptionToggle>
    <OptionToggle key="showLength" title="show lengths / number of entries">lengths</OptionToggle>
    <OptionToggle key="showPreview" title="enable entry previews">preview</OptionToggle>
  </div>
  {#if globalOpts.showPreview}
    <div class="input-row" transition:slide>
      <label>
        preview depth
        <input type="number" bind:value={globalOpts.previewDepth} min="0" name="preview-depth" />
      </label>
      <label>
        preview entries
        <input
          type="number"
          bind:value={globalOpts.previewEntries}
          min="0"
          name="preview-entries"
        />
      </label>
    </div>
  {/if}
  <div class="input-row">
    {#if !globalOpts.noanimate}
      <label title="animation rate" transition:slide={{ axis: 'x' }}>
        anim rate
        <input
          type="number"
          bind:value={globalOpts.animRate}
          min="0.1"
          max="10"
          step={0.1}
          name="animation-rate"
        />
      </label>
    {/if}
    <label>
      collapse strings
      <input type="number" bind:value={globalOpts.stringCollapse} min="0" name="collapse-strings" />
    </label>
  </div>
</div>

<style>
  .global-options {
    position: relative;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    background-color: var(--sl-color-gray-4);
    padding: 8px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    font-size: 10px;
    font-family: monospace;
  }

  .input-row {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 1em;
    margin: 0 !important;
    /* background-color: hotpink; */
    padding: 0 !important;
    max-width: 100%;
  }
  .wrap-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 1ch;
    margin-top: 1ch !important;
    padding: 0 !important;
  }

  label {
    display: flex;
    flex-direction: column;
    width: 50%;
    overflow: hidden;
    text-wrap: nowrap;
  }

  input[type='number'],
  select {
    width: 100%;
    height: 16px;
  }

  .options-title {
    position: sticky;
    top: 0;
    /* border: 1px solid var(--_border-color);
    border-radius: 8px; */
    background-color: var(--_background-color);
    /* padding-inline: 1ch; */
    font-weight: bold;
    font-family: monospace;
    /* text-align: center; */
  }
</style>
