<script lang="ts">
  import type { OptionsContext } from '$lib/options.svelte.js'
  import { getContext } from 'svelte'
  import { fade } from 'svelte/transition'

  let options: OptionsContext = getContext('json-inspect')

  // type OptionsProps = {
  //   open: boolean
  // }

  // let { open = $bindable(true) }: OptionsProps = $props()

  // $inspect(options)

  // $inspect(options)
  const themes = ['drak', 'monokai', 'default-dark', 'default-light', 'solarized-dark', 'none']
</script>

{#if options.value.open}
  <div class="options" transition:fade>
    <div class="header" style="display: flex; justify-items: space-between;">
      <span>Options</span>
      <button style="margin-left: 100%" onclick={() => (options.value.open = false)}>x</button>
    </div>

    <div class="controls">
      <label>
        show lengths
        <input type="checkbox" bind:checked={options.value.showLength} />
      </label>

      <label>
        show types
        <input type="checkbox" bind:checked={options.value.showTypes} />
      </label>

      <label>
        collapse strings
        <input type="number" bind:value={options.value.stringCollapse} />
      </label>

      <label>
        draggable
        <input type="checkbox" bind:checked={options.value.draggable} />
      </label>

      <label>
        disable animations
        <input type="checkbox" bind:checked={options.value.noanimate} />
      </label>

      <label>
        theme
        <select bind:value={options.value.theme}>
          {#each themes as theme}
            <option>{theme}</option>
          {/each}
        </select>
      </label>
    </div>
  </div>
{/if}

<style>
  .options {
    z-index: 10;
    border-radius: 8px;
    background-color: var(--bg);
    position: absolute;
    inset: 0.5em;
    overflow: auto;
    max-width: 300px;
    /* margin: auto; */
    border: 1px solid var(--border-color);
    max-height: max-content;
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 1em;

    .header {
      max-width: 100px;
    }

    .controls {
      display: flex;
      flex-flow: row wrap;
      gap: 1em;

      input[type='number'] {
        width: 3em;
      }

      label {
        flex: 1 0 auto;
      }
    }
  }
</style>
