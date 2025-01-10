<script lang="ts">
  import './app.css'

  import Inspect from '$lib/Inspect.svelte'
  import { setGlobalInspectOptions, type JSONInspectOptions } from '$lib/options.svelte.js'

  const { children } = $props()

  let options = $state<Partial<JSONInspectOptions>>({
    theme: 'drak',
    stringCollapse: 0,
    showTools: true,
    showTypes: true,
    showLength: true,
    showPreview: true,
    noanimate: false,
    quotes: 'single',
    borderless: false,
    embedMedia: true,
  })

  setGlobalInspectOptions(options)
</script>

<svelte:boundary>
  {#snippet failed(error, reset)}
    <Inspect value={error} />

    <button onclick={reset}>reset</button>
  {/snippet}
  <main>
    <a href="/">
      <h1>Svelte Value Inspect</h1>
    </a>
    <nav>
      <ul>
        <li>
          <a href="/examples">examples</a>
        </li>
        <!-- <li>
            <a href="/theming">theming</a>
          </li> -->
        <li>
          <a href="/custom">custom components</a>
        </li>
      </ul>
    </nav>
    {@render children()}

    <div class="options" data-testid="options">
      <span class="options-title"> global options </span>
      <label>
        lengths
        <input type="checkbox" bind:checked={options.showLength} />
      </label>

      <label>
        types
        <input type="checkbox" bind:checked={options.showTypes} />
      </label>

      <label>
        tools
        <input type="checkbox" bind:checked={options.showTools} />
      </label>

      <label>
        previews
        <input type="checkbox" bind:checked={options.showPreview} />
      </label>

      <label>
        noanimate
        <input type="checkbox" bind:checked={options.noanimate} />
      </label>

      <label>
        borderless
        <input type="checkbox" bind:checked={options.borderless} />
      </label>

      <label>
        embed media
        <input type="checkbox" bind:checked={options.embedMedia} />
      </label>

      <label>
        theme
        <select bind:value={options.theme}>
          <option>drak</option>
          <option>stereo</option>
          <option>dark</option>
          <option>light</option>
          <option></option>
        </select>
      </label>

      <label>
        quotes
        <select bind:value={options.quotes}>
          <option>single</option>
          <option>double</option>
        </select>
      </label>

      <label>
        collapse strings
        <input type="number" bind:value={options.stringCollapse} style="width: 5em" />
      </label>
    </div>
  </main>
</svelte:boundary>

<style>
  main {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 1em;
    padding: 1em;
    padding-inline: 3em;
    width: 100%;
    padding-bottom: 25em;
    border: 1px solid green;
  }

  nav {
    display: flex;
    flex-direction: row;

    ul {
      padding: 0;

      li {
        display: inline;

        list-style-type: none;
      }
    }
  }

  .options {
    /* opacity: 0.5; */
    position: fixed;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    bottom: 0;
    left: 0;
    right: 0;
    /* width: 80%; */
    background-color: var(--bg);
    gap: 2em;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 1em;
    z-index: 10;
    border: 1px solid var(--border-color);
    border-bottom: 0;
    scale: 0.75;
    transform-origin: center bottom;
    transition: all 100ms linear;
    transform: translateY(40px);

    &:hover {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .options-title {
    position: absolute;
    top: 2px;
    left: 5px;
  }

  label:has(input:checked) {
    background-color: #b4d455;
    color: black;
  }

  label:has(input[type='checkbox']) {
    outline: 1px solid #b4d455;
    transition: all 200ms ease-in-out;
    user-select: none;
    /* outline: 1px solid red; */
    border-radius: 8px;
    padding: 0.25em;
    max-height: 1.6em;
    display: flex;
    flex-direction: row;
    gap: 1em;

    input {
      display: none;
    }
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
</style>
