<script lang="ts">
  import type { DragOptions } from '@neodrag/svelte'
  import { getContext, setContext } from 'svelte'
  import type { Action } from 'svelte/action'
  import JsonViewer from './components/Node.svelte'
  import Options from './components/Options.svelte'
  // import './inspect.css'
  import { createOptions, GLOBAL_OPTIONS_CONTEXT, OPTIONS_CONTEXT } from './options.svelte.js'
  import { type InspectState } from './state.svelte.js'
  import StateProvider from './StateContextProvider.svelte'
  import type { InspectProps } from './types.js'

  let {
    value = undefined,
    name = undefined,
    onCollapseChange,
    // options
    showLength = true,
    showTypes = true,
    showPreview = true,
    showTools = true,
    quotes = 'single',
    expandAll = false,
    stringCollapse = 0,
    noanimate = false,
    theme = 'drak',
    expandLevel = 0,
    draggable = false,
    customComponents = {},
    // Html Attributes
    class: classValue = '',
    ...rest
  }: InspectProps = $props()

  let globalOptions = getContext(GLOBAL_OPTIONS_CONTEXT)

  $inspect(globalOptions)

  let options = createOptions({
    showLength,
    showTypes,
    showPreview,
    showTools,
    stringCollapse,
    draggable,
    noanimate,
    customComponents,
    theme,
    expandAll,
    expandLevel,
    quotes,
    ...(globalOptions ? globalOptions : {}),
  })

  $effect(() => {
    options.setOptions({
      showLength,
      showTypes,
      showPreview,
      showTools,
      stringCollapse,
      draggable,
      noanimate,
      customComponents,
      theme,
      expandAll,
      expandLevel,
      quotes,
      ...(globalOptions ? globalOptions : {}),
    })
  })

  // const opts = $derived({
  //   get current() {
  //     return {
  //       showLength,
  //       showTypes,
  //       showPreview,
  //       showTools,
  //       stringCollapse,
  //       draggable,
  //       noanimate,
  //       customComponents,
  //       theme,
  //       expandAll,
  //       expandLevel,
  //       quotes,
  //     }
  //   },
  // })

  // setContext(OPTIONS_CONTEXT, {
  //   get current() {
  //     return {
  //       showLength,
  //       showTypes,
  //       showPreview,
  //       showTools,
  //       stringCollapse,
  //       draggable,
  //       noanimate,
  //       customComponents,
  //       theme,
  //       expandAll,
  //       expandLevel,
  //       quotes,
  //     }
  //   },
  // })

  setContext(OPTIONS_CONTEXT, options)

  let initialState: InspectState | undefined = $state({})

  let dragAction: typeof import('@neodrag/svelte').draggable | undefined = $state()
  let actReturn: ReturnType<typeof import('@neodrag/svelte').draggable>

  let getAction: Action<HTMLElement, () => DragOptions | undefined> = (el, params) => {
    $effect(() => {
      if (dragAction) {
        if (!actReturn) {
          actReturn = dragAction(el, params())
        } else {
          actReturn.update?.(params())
        }
        return () => {
          actReturn?.destroy?.()
          actReturn = undefined
        }
      }
    })
  }

  async function loadDraggable() {
    const module = await import('@neodrag/svelte')
    dragAction = module.draggable
  }

  $effect(() => {
    if (options.value.draggable && !dragAction) {
      loadDraggable()
    }
  })

  let fixedBottom = $state(false)
</script>

<svelte:boundary>
  {#snippet failed(error, reset)}
    {#if error instanceof Error}
      {error.name}<br />
      {error.message}<br />
    {/if}
    <button onclick={reset}>retry</button>
  {/snippet}

  <StateProvider {name} {initialState} options={options.value} onChange={onCollapseChange}>
    <div
      class:noanimate={options.value.noanimate}
      class={[
        'ampled-json-inspect',
        { classValue },
        options.value.theme,
        fixedBottom ? 'fixedBottom' : '',
      ]}
      use:getAction={() => ({ handle: '.handle', disabled: !options.value.draggable })}
      {...rest}
    >
      <Options />
      <div class="body">
        <!-- <button
            style="position: absolute; top:0; left: 0;"
            onclick={() => (fixedBottom = !fixedBottom)}>&#x21d2;</button> -->
        {#if options.value.draggable}
          <div class="handle">&#x22ee;</div>
        {/if}
        <JsonViewer {value} key={name} />
      </div>
    </div>
  </StateProvider>
</svelte:boundary>

<style>
  /* :root { */
  .dracula {
    /* dracula */
    --base00: #282a36;
    --base01: #3a3c4e;
    --base02: #44475a;
    --base03: #6272a4;
    --base04: #8be9fd;
    --base05: #f8f8f2;
    --base06: #f1f2f8;
    --base07: #f7f7fb;
    --base08: #ea51b2;
    --base09: #bd93f9;
    --base0A: #62d6e8;
    --base0B: #f1fa8c;
    --base0C: #a1efe4;
    --base0D: #00f769;
    --base0E: #bd93f9;
    --base0F: #009e45;
  }

  .monokai {
    /* monokai */
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

  .solarized-dark {
    /** solarized dark */
    --base00: #002b36;
    --base01: #073642;
    --base02: #586e75;
    --base03: #657b83;
    --base04: #839496;
    --base05: #93a1a1;
    --base06: #eee8d5;
    --base07: #fdf6e3;
    --base08: #dc322f;
    --base09: #cb4b16;
    --base0A: #b58900;
    --base0B: #859900;
    --base0C: #2aa198;
    --base0D: #268bd2;
    --base0E: #6c71c4;
    --base0F: #d33682;
  }

  .default-dark {
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
    /* drak */
    --base00: #282a36;
    --base01: #3a3c4e;
    --base02: #44475a;
    --base03: #6272a4;
    --base04: #8be9fd;
    --base05: #f8f8f2;
    --base06: #f1f2f8;
    --base07: #f7f7fb;
    --base08: #ea51b2; /* red */
    --base09: #ffb86c; /* orange */
    --base0A: #f1fa8c; /* yellow */
    --base0B: #50fa7b; /* green */
    --base0C: #a1efe4; /* cyan */
    --base0D: #62d6e8; /* blue */
    --base0E: #bd93f9; /* purp */
    --base0F: #009e45;
  }

  .default-light {
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

    /* --indent-multiplier: 1; */
    --indent: calc(0.5em * var(--indent-multiplier, 1));

    --stagger-delay: 20ms;
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

    /* --indent-multiplier: 1; */
    --indent: calc(0.5em * var(--indent-multiplier, 1));

    --stagger-delay: 20ms;
  }

  :global .ampled-json-inspect {
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
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

  .ampled-json-inspect {
    font-size: 12px;
    box-sizing: border-box;
    color: var(--fg);
    font-family: monospace;
    line-height: 1.5em;
    white-space: nowrap;
    background-color: var(--bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    text-overflow: ellipsis;
    /* max-width: max-content; */
    position: relative;
    min-width: 360px;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    overflow-y: auto;
    overflow-x: hidden;
    resize: horizontal;
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
    overflow: hidden;
    width: 100%;
    height: 100%;
    padding: 1em;
    /* overflow-y: auto; */
    /* padding-left: 2em; */
  }

  /* .ampled-json-inspect :global(button) {
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
  } */

  /* :global(.ampled-json-inspect) {
    .title-bar,
    .line {
      :global(.tools) {
        opacity: 0;
      }

      &:hover,
      &:focus-within {
        :global(.tools) {
          opacity: 1;
        }
      }
    }
  } */

  .ampled-json-inspect :global(.indent) {
    /* margin-block: calc(var(--indent) * 0.5); */
    margin-left: calc(var(--indent) * 1.5);
    padding-block: calc(var(--indent) * 0.5);
    border-left: 1px solid var(--border-color);
    /* border-radius: 2px; */
    /* overflow-x: clip; */
    /* max-width: 100%; */
    overflow: hidden;

    &.string {
      --border-color: var(--string);
      overflow-x: auto;
    }

    &.function {
      --border-color: var(--function);
      overflow-x: auto;
    }

    &.error {
      --border-color: var(--error);
    }
  }

  .ampled-json-inspect :global(.key) {
    &.number {
      color: var(--number);
    }

    &.string {
      color: var(--fg);
    }

    &.symbol {
      color: var(--symbol);
    }
  }

  .ampled-json-inspect :global(.type) {
    color: var(--class);
    margin-top: 1px;
    font-size: 0.857em;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1.5em;
    padding-block: 2px;
    height: 1em;
    border-radius: 2px;
    vertical-align: bottom;

    &.null,
    &.undefined {
      background-color: var(--bg-lighter);
      color: var(--fg);
      padding: 4px 0.5em;
      height: 1.25em;
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

    &.function {
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
  }

  .ampled-json-inspect :global(.value) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* max-width: 1000px; */

    &.string {
      color: var(--string);
    }

    &.multi {
      /* margin: 0; */
      /* padding: 0; */
      padding: var(--indent);
      padding-left: calc(var(--indent) * 2);
      white-space: pre;
      text-overflow: unset;
      overflow-x: auto;
      overflow-y: clip;
      /* transition: 0.2s ease-in-out; */
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
      color: var(--function);

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
</style>
