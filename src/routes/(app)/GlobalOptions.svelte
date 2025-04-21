<script lang="ts">
  import type { InspectOptions } from '$lib/options.svelte.js'
  import ToggleButton from './ToggleButton.svelte'

  let { options = $bindable() }: { options: Partial<InspectOptions> } = $props()
</script>

<div class="options">
  <div class="options-title">global options</div>

  <label>
    theme
    <select bind:value={options.theme}>
      <option>inspect</option>
      <option>drak</option>
      <option>stereo</option>
      <option>dark</option>
      <option>light</option>
      <option>plain</option>
    </select>
  </label>

  <ToggleButton bind:checked={options.showLength}>lengths</ToggleButton>

  <ToggleButton bind:checked={options.showTypes}>types</ToggleButton>

  <ToggleButton bind:checked={options.showTools}>tools</ToggleButton>

  <ToggleButton bind:checked={options.showPreview}>previews</ToggleButton>

  <ToggleButton bind:checked={options.noanimate}>noanimate</ToggleButton>

  <ToggleButton bind:checked={options.borderless}>borderless</ToggleButton>

  <ToggleButton bind:checked={options.flashOnUpdate}>flash on update</ToggleButton>

  <ToggleButton bind:checked={options.embedMedia}>embed media</ToggleButton>

  <label>
    store
    <select bind:value={options.stores}>
      <option>full</option>
      <option value="value-only">value only</option>
      <option value={false}>off</option>
    </select>
  </label>
  <ToggleButton bind:checked={options.parseJson}>parse json</ToggleButton>

  <label>
    elementview
    <select bind:value={options.elementView}>
      <option>simple</option>
      <option>full</option>
    </select>
  </label>

  <label>
    quotes
    <select bind:value={options.quotes}>
      <option>single</option>
      <option>double</option>
      <option>none</option>
    </select>
  </label>

  <label>
    collapse strings
    <input type="number" bind:value={options.stringCollapse} min="0" style="width: 5em" />
  </label>

  <label>
    preview depth
    <input type="number" bind:value={options.previewDepth} min="0" style="width: 5em" />
  </label>
  <label>
    preview entries
    <input type="number" bind:value={options.previewEntries} min="0" style="width: 5em" />
  </label>
</div>

<style>
  .options {
    position: relative;
    width: 100%;
    max-width: 500px;
    font-size: 10px;
    display: flex;
    overflow: visible;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: flex-start;
    background-color: var(--_background-color);
    color: var(--_text-color);
    gap: 1.245em;
    border-radius: 8px;
    padding: 1em;
    z-index: 10;
    border: 1px solid var(--_border-color);
    transition: all 100ms linear;
    margin-top: 1em;
  }

  .options-title {
    font-family: monospace;
    position: absolute;
    text-align: center;
    top: -0.75em;
    /* left: 1em; */
    padding-inline: 1ch;
    background-color: var(--_background-color);
    border-radius: 8px;
    border: 1px solid var(--_border-color);
  }

  label:has(input:checked) {
    background-color: #b4d455;
    color: black;
  }

  input[type='number'],
  select {
    max-height: 1.5em;
  }

  label:has(input[type='number']),
  label:has(select) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  label {
    white-space: nowrap;
    flex-shrink: 0;
    font-family: monospace;
    font-size: 10px;
  }
</style>
