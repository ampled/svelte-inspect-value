<script lang="ts">
  import type { InspectOptions } from '$lib/options.svelte.js'
  import ToggleButton from './ToggleButton.svelte'

  let { options = $bindable() }: { options: Partial<InspectOptions> } = $props()
</script>

<div class="options">
  <span class="options-title"> global options </span>
  <ToggleButton bind:checked={options.showLength}>lengths</ToggleButton>

  <ToggleButton bind:checked={options.showTypes}>types</ToggleButton>

  <ToggleButton bind:checked={options.showTools}>tools</ToggleButton>

  <ToggleButton bind:checked={options.showPreview}>previews</ToggleButton>

  <ToggleButton bind:checked={options.noanimate}>noanimate</ToggleButton>

  <ToggleButton bind:checked={options.borderless}>borderless</ToggleButton>

  <ToggleButton bind:checked={options.flashOnUpdate}>flash on update</ToggleButton>

  <ToggleButton bind:checked={options.embedMedia}>embed media</ToggleButton>
  <ToggleButton bind:checked={options.stores}>stores</ToggleButton>
  <ToggleButton bind:checked={options.parseJson}>parse json</ToggleButton>

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
    <input type="number" bind:value={options.stringCollapse} style="width: 5em" />
  </label>

  <label>
    preview depth
    <input type="number" bind:value={options.previewDepth} style="width: 5em" />
  </label>
  <label>
    preview entries
    <input type="number" bind:value={options.previewEntries} style="width: 5em" />
  </label>
</div>

<style>
  .options {
    /* opacity: 0.5; */
    position: fixed;
    font-size: 10px;
    display: flex;
    overflow-y: visible;
    overflow-x: auto;
    flex-wrap: nowrap;
    align-items: flex-end;
    justify-content: flex-start;
    margin-left: auto;
    margin-right: auto;
    bottom: 0;
    left: 1em;
    right: 1em;
    /* width: 80%; */
    background-color: var(--bg);
    gap: 1.245em;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 1em;
    z-index: 10;
    border: 1px solid var(--border-color);
    border-bottom: 0;
    scale: 1;
    transform-origin: center bottom;
    transition: all 100ms linear;
    transform: translateY(calc(100% - 15px));
    view-transition-name: globalopts;

    &:hover,
    &:focus-within,
    &:focus-visible,
    &:has(*:focus) {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .options-title {
    font-family: monospace;
    position: absolute;
    top: 0;
    left: 10px;
    width: 100%;
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
  }
</style>
