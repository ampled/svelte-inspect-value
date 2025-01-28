<script lang="ts">
  import './app.css'

  import { DEV } from 'esm-env'

  import { onNavigate } from '$app/navigation'
  import { page } from '$app/stores'
  import Inspect from '$lib/Inspect.svelte'
  import { setGlobalInspectOptions, type JSONInspectOptions } from '$lib/options.svelte.js'

  onNavigate((navigation) => {
    if (!document.startViewTransition) return

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve()
        await navigation.complete
      })
    })
  })

  const { children } = $props()

  let options = $state<Partial<JSONInspectOptions>>({
    theme: 'drak',
    stringCollapse: 0,
    showTools: true,
    showTypes: true,
    showLength: true,
    showPreview: true,
    previewDepth: 1,
    previewEntries: 3,
    flashOnUpdate: true,
    noanimate: false,
    quotes: 'single',
    borderless: false,
    embedMedia: true,
  })

  setGlobalInspectOptions(options)

  let routes = [
    { href: '/examples', title: 'Examples' },
    { href: '/custom', title: 'Custom components', devonly: true },
    { href: '/theming', title: 'Theming', devonly: true },
    { href: '/alltypes', title: 'alltypes', devonly: true },
  ]
</script>

<svelte:boundary>
  {#snippet failed(error, reset)}
    <Inspect value={error} />

    <button onclick={reset}>reset</button>
  {/snippet}
  <main>
    <a href="/" class="title">
      <h1>
        Svelte
        <code
          >{'<'}<span class="inspect">Inspect</span>
          {'{'}<span class="value">{'value'}</span>{'}'}
          {'/>'}
        </code>
      </h1>
    </a>
    <nav>
      <ul>
        {#each routes as { href, title, devonly } (href)}
          {#if !devonly || (devonly && DEV)}
            <li>
              <a class:active={href === $page.url.pathname} {href}>{title}</a>
            </li>
          {/if}
        {/each}
        <li>
          <a
            href="https://www.npmjs.com/package/svelte-inspect-value"
            aria-label="npm"
            target="_blank"
          >
            <img alt="npm" src="https://img.shields.io/npm/v/svelte-inspect-value" />
          </a>
        </li>
        <li>
          <a href="https://github.com/ampled/svelte-inspect-value">
            <img
              alt="github"
              src="https://img.shields.io/github/stars/ampled/svelte-inspect-value?style=social"
            />
          </a>
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
        flash on update
        <input type="checkbox" bind:checked={options.flashOnUpdate} />
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

      <label>
        preview depth
        <input type="number" bind:value={options.previewDepth} style="width: 5em" />
      </label>
      <label>
        preview entries
        <input type="number" bind:value={options.previewEntries} style="width: 5em" />
      </label>
    </div>
  </main>
</svelte:boundary>

<style>
  .title {
    text-decoration: none;
    font-weight: bold;
    font-size: 0.8rem;
    width: max-content;
  }

  h1 {
    max-width: max-content;
    text-decoration: none;
  }

  main {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 1em;
    padding: 1em;
    width: 100%;
    margin-bottom: 400px;
  }

  nav {
    ul {
      padding: 0;
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 1em;

      li {
        display: inline;

        list-style-type: none;
      }
    }
  }

  .options {
    /* opacity: 0.5; */
    position: fixed;
    font-size: 10px;
    display: flex;
    overflow-y: auto;
    flex-wrap: nowrap;
    align-items: flex-end;
    justify-content: flex-start;
    margin-left: auto;
    margin-right: auto;
    bottom: 0;
    left: 1em;
    right: 1em;
    /* width: 80%; */
    background-color: var(--bg-lighter);
    gap: 2em;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 1em;
    z-index: 10;
    border: 1px solid var(--border-color);
    border-bottom: 0;
    scale: 1;
    transform-origin: center bottom;
    transition: all 100ms linear;
    transform: translateY(70%);

    &:hover,
    &:focus-within,
    &:focus-visible,
    &:has(*:focus) {
      opacity: 1;
      transform: translateY(0);
      outline: 1px solid green;
    }
  }

  .options-title {
    font-family: monospace;
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

  label {
    white-space: nowrap;
    flex-shrink: 0;
    font-family: monospace;
  }

  a {
    color: #fafafa;
    transition: color 300ms linear;
    text-decoration: none;
    font-size: 1rem;
    line-height: 1;
    white-space: nowrap;

    h1 {
      text-decoration: none;

      code {
        font-size: 0.8em;
        padding-inline: 0.2em;
        font-weight: normal;
        background: transparent;

        .inspect {
          color: var(--red);
          font-weight: bold;
        }

        .value {
          font-weight: normal;
          color: var(--blue);
        }
      }
    }
  }

  a.active {
    color: var(--red);
    text-decoration: underline;
    position: relative;
  }

  @media (min-width: 1024px) {
    main {
      width: 90%;
      padding: 1em;
      padding-inline: 3em;
    }

    .title {
      font-size: 1.5rem;
    }

    a {
      font-size: 1.5rem;
    }
  }
</style>
