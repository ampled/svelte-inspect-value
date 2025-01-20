<script lang="ts">
  import { getContext, setContext } from 'svelte'
  import Node from './components/Node.svelte'
  import { createOptions, GLOBAL_OPTIONS_CONTEXT, OPTIONS_CONTEXT } from './options.svelte.js'
  import { createState, STATE_CONTEXT_KEY } from './state.svelte.js'
  import type { InspectProps } from './types.js'

  let {
    value = undefined,
    name = undefined,
    onCollapseChange,
    // options
    showLength = true,
    showTypes = true,
    showPreview = true,
    previewDepth = 1,
    showTools = true,
    quotes = 'single',
    expandAll = false,
    expandLevel = 1,
    flashOnUpdate = true,
    stringCollapse = 0,
    noanimate = false,
    borderless = false,
    theme = 'drak',
    customComponents = {},
    embedMedia = false,
    // Html Attributes
    class: classValue = '',
    ...rest
  }: InspectProps = $props()

  const inspectState = createState({}, (state) => onCollapseChange?.(state))

  let globalOptions = getContext(GLOBAL_OPTIONS_CONTEXT)

  let options = createOptions({
    showLength,
    showTypes,
    showPreview,
    previewDepth,
    showTools,
    stringCollapse,
    noanimate,
    customComponents,
    theme,
    expandAll,
    expandLevel,
    flashOnUpdate,
    quotes,
    borderless,
    embedMedia,
    ...(globalOptions ? globalOptions : {}),
  })

  // FIXME: this is dumb and not good use of reactivity
  // also global options should probably not take priority over passed props
  $effect(() => {
    options.setOptions({
      showLength,
      showTypes,
      showPreview,
      previewDepth,
      showTools,
      stringCollapse,
      noanimate,
      customComponents,
      theme,
      expandAll,
      expandLevel,
      flashOnUpdate,
      quotes,
      borderless,
      embedMedia,
      ...(globalOptions ? globalOptions : {}),
    })
  })

  setContext(STATE_CONTEXT_KEY, inspectState)
  setContext(OPTIONS_CONTEXT, options)

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

<svelte:boundary>
  {#snippet failed(error, reset)}
    {#if error instanceof Error}
      {error.name}<br />
      {error.message}<br />
    {/if}
    <button onclick={reset}>retry</button>
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
      <!-- <Options /> -->
      <Node {value} key={name} />
    </div>
  </div>
</svelte:boundary>

<style>
  /*
        base00  #181818  Default Background
        base01  #282828  Lighter Background (Used for status bars, line number and folding marks)
        base02  #383838  Selection Background
        base03  #585858  Comments, Invisibles, Line Highlighting
        base04  #b8b8b8  Dark Foreground (Used for status bars)
        base05  #d8d8d8  Default Foreground, Caret, Delimiters, Operators
        base06  #e8e8e8  Light Foreground (Not often used)
        base07  #f8f8f8  Light Background (Not often used)
        base08  #ab4642  Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
        base09  #dc9656  Integers, Boolean, Constants, XML Attributes, Markup Link Url
        base0A  #f7ca88  Classes, Markup Bold, Search Text Background
        base0B  #a1b56c  Strings, Inherited Class, Markup Code, Diff Inserted
        base0C  #86c1b9  Support, Regular Expressions, Escape Characters, Markup Quotes
        base0D  #7cafc2  Functions, Methods, Attribute IDs, Headings
        base0E  #ba8baf  Keywords, Storage, Selector, Markup Italic, Diff Changed
        base0F  #a16946  Deprecated, Opening/Closing Embedded Language Tags, e.g. <?php ?>
    */
  .plain {
    --base00: #ffffff;
    --base01: #ffffff;
    --base02: #ffffff;
    --base03: #ffffff;
    --base04: #ffffff;
    --base05: #000000;
    --base06: #ffffff;
    --base07: #ffffff;
    --base08: #ffffff;
    --base09: #ffffff;
    --base0A: #ffffff;
    --base0B: #ffffff;
    --base0C: #ffffff;
    --base0D: #ffffff;
    --base0E: #ffffff;
    --base0F: #ffffff;
  }

  .stereo {
    --base00: #272822;
    --base01: #383830;
    --base02: #49483e;
    --base03: #75715e;
    --base04: #a59f85;
    --base05: #f8f8f2;
    --base06: #f5f4f1;
    --base07: #f9f8f5;
    --base08: #f92672;
    --base09: #fd971f;
    --base0A: #f4bf75;
    --base0B: #a6e22e;
    --base0C: #a1efe4;
    --base0D: #66d9ef;
    --base0E: #ae81ff;
    --base0F: #cc6633;
  }

  .dark {
    --base00: #181818;
    --base01: #282828;
    --base02: #383838;
    --base03: #585858;
    --base04: #b8b8b8;
    --base05: #d8d8d8;
    --base06: #e8e8e8;
    --base07: #f8f8f8;
    --base08: #ab4642;
    --base09: #dc9656;
    --base0A: #f7ca88;
    --base0B: #a1b56c;
    --base0C: #86c1b9;
    --base0D: #7cafc2;
    --base0E: #ba8baf;
    --base0F: #a16946;
  }

  .drak {
    --base00: #282a36;
    --base01: #3a3c4e;
    --base02: #44475a;
    --base03: #6272a4;
    --base04: #8be9fd;
    --base05: #f8f8f2;
    --base06: #f1f2f8;
    --base07: #f7f7fb;
    --base08: #ea51b2;
    --base09: #ffb86c;
    --base0A: #f1fa8c;
    --base0B: #50fa7b;
    --base0C: #a1efe4;
    --base0D: #62d6e8;
    --base0E: #bd93f9;
    --base0F: #009e45;
  }

  .light {
    --base00: #e8e8e8;
    --base01: #d8d8d8;
    --base02: #f8f8f8;
    --base03: #b8b8b8;
    --base04: #585858;
    --base05: #383838;
    --base06: #282828;
    --base07: #181818;
    --base08: #ab4642;
    --base09: #dc9656;
    --base0A: #9d5e00;
    --base0B: #75834e;
    --base0C: #5f8681;
    --base0D: #3e9cbe;
    --base0E: #ba8baf;
    --base0F: #a16946;
  }

  .cotton-candy {
    --base00: #ca71c6;
    --base01: #fa71ed;
    --base02: #f8f8f8;
    --base03: #e7a6ff;
    --base04: #fca8ff;
    --base05: #8732a5;
    --base06: #282828;
    --base07: #181818;
    --base08: #ab4642;
    --base09: #dc9656;
    --base0A: #d1c58b;
    --base0B: #a1b56c;
    --base0C: #86c1b9;
    --base0D: #7cafc2;
    --base0E: #ba8baf;
    --base0F: #a16946;
  }

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
    --object: var(--blue);
    --interactive: var(--base0E);
    --deprecated: var(--base0F);

    --indent: calc(0.5em * var(--indent-multiplier, 1));
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
    font-size: var(--inspect-font-size, 12px);
    box-sizing: border-box;
    color: var(--fg);
    font-family: var(--inspect-font, monospace);
    line-height: 1.5em;
    white-space: nowrap;
    background-color: var(--bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    text-overflow: ellipsis;
    position: relative;
    min-width: 360px;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    overflow-y: auto;
    overflow-x: hidden;

    &.borderless {
      background-color: transparent;
      border: none;
      border-radius: 0;

      .body {
        padding: 0;
      }
    }
  }

  .handle {
    aspect-ratio: 1/1;
    z-index: 20;
    border: 1px solid var(--border-color);
    border-top-width: 0;
    border-right-width: 0;
    background-color: var(--bg-lighter);
    padding: 0.5em;
    height: 2em;
    width: 2em;
    text-align: center;
    font-size: 0.8em;
    line-height: 1;
    position: absolute;
    top: 0;
    right: 0;
    cursor: move;
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
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    padding: 0.5em;
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

    /* &.function {

      :global(&.hl) {
        color: var(--fg);
        white-space: pre;
        padding: var(--indent);
        padding-left: calc(var(--indent) * 2);

        .title.function_ {
          color: var(--function);
        }

        .title.class_ {
          color: var(--class);
        }

        .tag {
          color: var(--fg);
        }

        .keyword {
          color: var(--red);
        }

        .name {
          color: var(--red);
        }

        .attr {
          color: var(--green);
        }

        .number {
          color: var(--purple);
        }

        .string {
          color: var(--yellow);
        }
      }
    } */

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
</style>
