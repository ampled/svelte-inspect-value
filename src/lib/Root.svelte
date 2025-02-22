<script lang="ts">
  import { setContext } from 'svelte'
  import { SvelteMap } from 'svelte/reactivity'
  import Node from './components/Node.svelte'
  import NodeActionButton from './components/NodeActionButton.svelte'
  import { useOptions } from './options.svelte.js'
  import Inspect from './Root.svelte'
  import { createState, STATE_CONTEXT_KEY } from './state.svelte.js'
  import { InspectError, type InspectProps } from './types.js'

  let {
    value = undefined,
    name = undefined,
    onCollapseChange,
    debug = false,
    // Html Attributes
    class: classValue = '',
    ...rest
  }: InspectProps = $props()

  const options = useOptions()

  let initState = $state({})

  const inspectState = createState(initState, (state) => onCollapseChange?.(state))

  const valueCache = new SvelteMap<string, unknown>()
  setContext('value-cache', valueCache)
  setContext(STATE_CONTEXT_KEY, inspectState)

  function setAllNodes(collapsed: boolean) {
    if (inspectState.value) {
      inspectState.value = Object.fromEntries(
        Object.entries(inspectState.value).map(([key]) => [key, { collapsed }])
      )
    }
  }

  export function setAllCollapsed() {
    options.value.expandAll = false
    setAllNodes(true)
  }
  export function setAllExpanded() {
    options.value.expandAll = true
    setAllNodes(false)
  }
</script>

<svelte:boundary onerror={(error) => console.error(error)}>
  {#snippet failed(error, reset)}
    ERROR (root)
    {@const inspectError = new InspectError(
      `Inspect instance failed. A likely cause is a hydration mismatch error.`,
      undefined,
      {
        cause: error,
      }
    )}
    {#if error instanceof Error}
      {error.name}<br />
      {error.message}<br />
    {:else}
      <Inspect value={inspectError} />
    {/if}
    <NodeActionButton onclick={reset}>retry</NodeActionButton>
  {/snippet}

  <div
    data-testid="inspect"
    class={[
      'ampled-json-inspect',
      classValue,
      options.value.theme,
      options.value.noanimate && 'noanimate',
      options.value.borderless && 'borderless',
    ]}
    {...rest}
  >
    <div class="body">
      <Node {value} key={name} />
      {#if debug}
        <hr />
        <Node
          key="DEBUG"
          value={{
            state: inspectState.value,
            options: options,
            valueCache,
          }}
        />
      {/if}
    </div>
  </div>
</svelte:boundary>

<style>
  @import './themes.css';

  .ampled-json-inspect {
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

  :global .ampled-json-inspect::selection {
    background-color: var(--selection);
  }

  :global .ampled-json-inspect ::selection {
    background-color: var(--selection);
  }

  :global .ampled-json-inspect:not(.noanimate) {
    transition: all 250ms linear;
    /* *,
    *::before,
    *::after {
      transition: all 250ms linear;
    } */
  }

  :global .ampled-json-inspect {
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
    }
  }

  :global .ampled-json-inspect.noanimate * {
    transition: none !important;
  }

  .ampled-json-inspect {
    container-type: inline-size;
    background-color: var(--bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: var(--inspect-font-size, 12px);
    box-sizing: border-box;
    color: var(--fg);
    font-family: var(--inspect-font, monospace);
    line-height: 1.5em;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    min-width: 360px;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: grayscale;

    &.borderless {
      background-color: transparent;
      border: none;
      border-radius: 0;

      .body {
        padding: 0;
        background-color: transparent;
        border: none;
      }
    }
  }

  .ampled-json-inspect.fixedBottom {
    position: fixed;
    max-width: 40vw;
    bottom: 0;
    left: 0;
    max-height: 100vh;
    height: max-content;
    opacity: 0.8;
    z-index: 9999;

    &:hover {
      opacity: 1;
    }

    :global(.indent) {
      max-height: calc(1.5rem * 20);
      overflow-y: auto;
    }
  }

  .body {
    /** compact */
    transition: all 200ms linear;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    padding: 0.25em;
    --indent: 0.25em;
    --line-gap: 0.25em;
    --unit-display: none;
    --dash-display: inline-flex;

    @container (min-width: 400px) {
      /* Sparse styles here */
      padding: 0.5em;
      --indent: 0.5em;
      --line-gap: 0.5em;
      --unit-display: inline;
      --dash-display: inline-flex;
    }
  }

  .ampled-json-inspect :global(.indent) {
    &.string {
      --border-color: var(--string);
      overflow-x: auto;
    }

    &.function,
    &.asyncfunction,
    &.asyncgeneratorfunction,
    &.generatorfunction {
      --border-color: var(--function);
      overflow-x: auto;
    }

    &.error {
      --border-color: var(--error);
    }
  }

  .ampled-json-inspect :global(.type) {
    color: var(--class);
    font-size: 0.857em;

    &.null,
    &.undefined {
      background-color: var(--bg-lighter);
      color: var(--fg);
      padding-inline: 0.5em;
      height: 1.3em;
      line-height: 1.3em;
      border-radius: 2px;
    }

    &.string {
      color: var(--string-type);
    }

    &.number {
      color: var(--number-type);
    }

    &.boolean {
      color: var(--number-type);
    }

    &.array {
      color: var(--object-type);
    }

    &.object {
      color: var(--object-type);
    }

    &.bigint {
      color: var(--number-type);
    }

    &.error,
    &.InspectError {
      color: var(--error);
    }

    &.regexp {
      color: var(--function);
    }

    &.date {
      color: var(--cyan);
    }

    &.function,
    &.asyncfunction,
    &.asyncgeneratorfunction,
    &.generatorfunction {
      color: var(--keyword);
    }

    &.symbol {
      color: var(--orange);
    }

    &.map {
      color: var(--class);
    }

    &.url {
      color: var(--class);
    }

    &.urlsearchparams {
      color: var(--class);
    }

    &.set {
      color: var(--class);
    }

    &.class {
      color: var(--keyword);
    }

    &.noop {
      color: var(--deprecated);
      padding-inline: 0.5em;
      outline: 2px solid var(--border-color);
      border-radius: 2px;
    }
  }

  .ampled-json-inspect :global(.value) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &.string {
      color: var(--string);
    }

    &.multi {
      padding: var(--indent);
      padding-left: calc(var(--indent) * 2);
      white-space: pre;
      line-height: 1;
      text-overflow: unset;
      overflow-x: auto;
      overflow-y: clip;
    }

    &.number {
      color: var(--number);
    }

    &.boolean {
      color: var(--boolean);
    }

    &.array {
      color: var(--object);
    }

    &.object {
      color: var(--object);
    }

    &.bigint {
      color: var(--number);
    }

    &.url {
      color: var(--class);
    }

    &.urlsearchparams {
      color: var(--class);
    }

    &.error {
      color: var(--error);
    }

    &.regexp {
      color: var(--regex);
    }

    &.date {
      color: var(--object);
    }

    &.function {
      color: var(--green);
    }

    &.arraybuffer {
      color: var(--object);
    }

    &.symbol {
      color: var(--symbol);
    }

    &.map {
      color: var(--object);
    }

    &.class {
      color: var(--class);
    }

    &.html {
      padding-inline: 0.5em;
      border-radius: 4px;
    }

    &.promise {
      &.rejected {
        color: var(--red);
      }
      &.pending {
        color: var(--yellow);
      }
      &.fulfilled {
        color: var(--green);
      }
    }
  }

  .ampled-json-inspect :global(a) {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .ampled-json-inspect :global(code) {
    font-family: inherit;
    font-size: inherit;
  }

  hr {
    all: unset;
    display: block;
    border-top: 2px solid var(--red);
    min-height: 1px;
    margin-block: 3px;
    width: 100%;
  }
</style>
