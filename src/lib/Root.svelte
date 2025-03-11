<script lang="ts">
  import { setContext } from 'svelte'
  import { SvelteMap } from 'svelte/reactivity'
  import InspectErrorView from './components/InspectErrorView.svelte'
  import Node from './components/Node.svelte'
  import InspectOptionsProvider from './InspectOptionsProvider.svelte'
  import { DEFAULT_OPTIONS, useOptions } from './options.svelte.js'
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
  let { theme, noanimate, borderless } = $derived(options.value)

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
    {@const inspectError = new InspectError(
      `Inspect instance failed. A possible cause is a hydration mismatch error.`,
      value,
      {
        cause: error,
      }
    )}
    <div class="svelte-inspect-value">
      <div class="body">
        <InspectOptionsProvider options={{ ...DEFAULT_OPTIONS, expandLevel: 0 }}>
          <InspectErrorView value={inspectError} key="inspectRootError" path={[]} {reset} />
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
        </InspectOptionsProvider>
      </div>
    </div>
  {/snippet}

  <div
    data-testid="inspect"
    class={[
      'svelte-inspect-value',
      classValue,
      theme,
      noanimate && 'noanimate',
      borderless && 'borderless',
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

  .svelte-inspect-value {
    /* commonly placed colors in base16 themes */
    --cyan: var(--base0C);
    --yellow: var(--base0A);
    --green: var(--base0B);
    --red: var(--base08);
    --purple: var(--base0E);
    --blue: var(--base0D);
    --orange: var(--base09);

    /* 
      overrideable roles (somewhat accurately mapped to base16 roles) 
      https://github.com/chriskempson/base16/blob/main/styling.md
    */
    --_background: var(--inspect-background, none);
    --_background-color: var(--background-color, var(--base00));

    --_hover-color: var(--hover-color, var(--base01));
    --_text-selection-background: var(--text-selection-background, var(--base02));
    --_length-color: var(--length-color, var(--base03));
    --_bullet-color: var(--bullet-color, var(--base03));
    --_comment-color: var(--comment-color, var(--base03));
    --_caret-color: var(--caret-color, var(--base03));
    --_caret-focus-color: var(--caret-focus-color, var(--base05));
    --_caret-hover-color: var(--caret-hover-color, var(--base05));
    --_text-color: var(--text-color, var(--base05));
    --_child-update-flash-color: var(--child-update-flash-color, var(--base05));
    --_update-flash-color: var(--update-flash-color, var(--base06));
    --_delimiter-color: var(--delimiter-color, var(--base08));
    --_note-color: var(--note-color, var(--base08));
    --_button-color: var(--button-color, var(--base0E));
    --_button-disabled-color: var(--button-disabled-color, var(--base03));
    --_button-success-color: var(
      --button-success-color,
      var(--base0B)
    ); /* e.g. copy to clipboard */
    --_promise-pending-color: var(--promise-pending-color, var(--base0A));
    --_promise-fulfilled-color: var(--promise-fulfilled-color, var(--base0B));
    --_promise-rejected-color: var(--promise-rejected-color, var(--base0E));
    --_promise-bracket-color: var(--promise-bracket-color, var(--base03));

    /* key */
    --_key-whitespace-color: var(--key-whitespace-color, var(--base03));
    --_key-whitespace-opacity: var(--key-whitespace-opacity, 0.5);
    --_key-prefix-color: var(--key-prefix-color, var(--base08));

    /* border */
    --_border-radius: var(--border-radius, 8px);
    --_border-color: var(--border-color, var(--base03));

    /* tools */
    --_tools-background-color: var(--tools-background-color, var(--base00));
    --_tools-background-color-borderless: var(--tools-background-color-borderless, transparent);
    --_tools-border-color: var(--tools-border-color, var(--base03));

    /* value colors */
    --_error-color: var(--error-color, var(--base08));
    --_string-value-color: var(--string-value-color, var(--base0A));
    --_function-name-color: var(--function-name-color, var(--base0B));
    --_symbol-value-color: var(--symbol-value-color, var(--base0C));
    --_regex-value-color: var(--regex-value-color, var(--base0C));
    --_number-value-color: var(--number-value-color, var(--base0E));
    --_bigint-value-color: var(--bigint-value-color, var(--base0E));
    --_boolean-value-color: var(--boolean-value-color, var(--base0E));
    --_class-name-color: var(--class-name-color, var(--base0D));

    /* type colors */
    --_niltype-bg-color: var(--niltype-bg-color, var(--base01));
    --_niltype-text-color: var(--niltype-text-color, var(--base05));
    --_number-type-color: var(--number-type-color, var(--base08));
    --_bigint-type-color: var(--bigint-type-color, var(--base08));
    --_boolean-type-color: var(--boolean-type-color, var(--base08));
    --_symbol-type-color: var(--symbol-type-color, var(--base09));
    --_regex-type-color: var(--regex-type-color, var(--base0B));
    --_array-type-color: var(--array-type-color, var(--base0C));
    --_date-type-color: var(--date-type-color, var(--base0C));
    --_map-type-color: var(--map-type-color, var(--base0C));
    --_set-type-color: var(--set-type-color, var(--base0C));
    --_url-type-color: var(--url-type-color, var(--base0C));
    --_urlsearchparams-type-color: var(--urlsearchparams-type-color, var(--base0C));
    --_object-type-color: var(--object-type-color, var(--base0C));
    --_class-type-color: var(--class-type-color, var(--base08));
    --_function-type-color: var(--function-type-color, var(--base08));
    --_string-type-color: var(--string-type-color, var(--base0E));

    /* indent */
    --_indent: var(--indent, 0.75em);
    --_indent-compact: var(--indent-compact, 0.5em);
    --_indent-color: var(--indent-color, var(--base03));

    /* body */
    --_padding: var(--padding, 0.25em);
    --_padding-compact: var(--padding-compact, 0.25em);
  }

  :global .svelte-inspect-value::selection {
    background-color: var(--_text-selection-background);
  }

  :global .svelte-inspect-value ::selection {
    background-color: var(--selection);
  }

  :global .svelte-inspect-value:not(.noanimate) {
    transition: all 250ms linear;
  }

  :global .svelte-inspect-value {
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
    }
  }

  :global .svelte-inspect-value.noanimate * {
    transition: none !important;
  }

  .svelte-inspect-value {
    container-type: inline-size;
    background: var(--_background);
    background-color: var(--_background-color);
    border: 1px solid var(--_border-color);
    border-radius: var(--_border-radius);
    font-size: var(--inspect-font-size, 12px);
    box-sizing: border-box;
    color: var(--_text-color);
    font-family: var(--inspect-font, monospace);
    line-height: 1.5em;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    min-width: var(--inspect-min-width, 360px);
    width: var(--inspect-width, 100%);
    max-width: var(--inspect-max-width, 100%);
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

  .body {
    /** compact */
    transition: all 200ms linear;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    padding: var(--_padding-compact);
    --__indent: var(--_indent-compact, 0.5em);
    --line-gap: 0.375em;
    --unit-display: none;

    @container (inline-size > 400px) {
      padding: var(--_padding);
      --__indent: var(--_indent, 0.75em);
      --line-gap: 0.5em;
      --unit-display: inline-flex;
    }
  }

  .svelte-inspect-value :global(.indent) {
    &.string {
      border-color: var(--_string-value-color);
      overflow-x: auto;
    }

    &.function,
    &.asyncfunction,
    &.asyncgeneratorfunction,
    &.generatorfunction {
      border-color: var(--_function-name-color);
      overflow-x: auto;
    }

    &.error {
      border-color: var(--_error-color);
    }
  }

  .svelte-inspect-value :global(.type) {
    color: var(--_object-type-color);
    font-size: 0.857em;

    &.null,
    &.undefined {
      background-color: var(--_niltype-bg-color);
      color: var(--_niltype-text-color);
      padding-inline: 0.5em;
      height: 1.3em;
      line-height: 1.3em;
      border-radius: 2px;
    }

    &.string {
      color: var(--_string-type-color);
    }

    &.number {
      color: var(--_number-type-color);
    }

    &.boolean {
      color: var(--_boolean-type-color);
    }

    &.array {
      color: var(--_array-type-color);
    }

    &.object {
      color: var(--_object-type-color);
    }

    &.bigint {
      color: var(--_bigint-type-color);
    }

    &.error,
    &.InspectError {
      color: var(--_error-color);
    }

    &.regexp {
      color: var(--_regex-type-color);
    }

    &.date {
      color: var(--_date-type-color);
    }

    &.function,
    &.asyncfunction,
    &.asyncgeneratorfunction,
    &.generatorfunction {
      color: var(--_function-type-color);
    }

    &.symbol {
      color: var(--_symbol-type-color);
    }

    &.map {
      color: var(--_map-type-color);
    }

    &.url {
      color: var(--_url-type-color);
    }

    &.urlsearchparams {
      color: var(--_urlsearchparams-type-color);
    }

    &.set {
      color: var(--_set-type-color);
    }

    &.class {
      color: var(--_class-type-color);
    }
  }

  .svelte-inspect-value :global(.value) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &.string {
      color: var(--_string-value-color);
    }

    &.multi {
      padding: var(--_indent);
      padding-left: 0.75em;
      white-space: pre;
      line-height: 1;
      text-overflow: unset;
      overflow-x: auto;
      overflow-y: clip;
    }

    &.number {
      color: var(--_number-value-color);
    }

    &.boolean {
      color: var(--_boolean-value-color);
    }

    &.array {
      color: var(--_array-type-color);
    }

    &.object {
      color: var(--_object-type-color);
    }

    &.bigint {
      color: var(--_bigint-value-color);
    }

    &.url {
      color: var(--_url-type-color);
    }

    &.urlsearchparams {
      color: var(--_urlsearchparams-type-color);
    }

    &.error {
      color: var(--_error-color);
    }

    &.regexp {
      color: var(--_regex-value-color);
    }

    &.date {
      color: var(--_date-type-color);
    }

    &.function {
      color: var(--_function-name-color);
    }

    &.symbol {
      color: var(--_symbol-value-color);
    }

    &.map {
      color: var(--_map-type-color);
    }

    &.class {
      color: var(--_class-name-color);
    }

    &.html {
      padding-inline: 0.5em;
    }

    &.promise {
      &.rejected {
        color: var(--_promise-rejected-color);
      }
      &.pending {
        color: var(--_promise-pending-color);
      }
      &.fulfilled {
        color: var(--_promise-fulfilled-color);
      }
    }
  }

  .svelte-inspect-value :global(a) {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .svelte-inspect-value :global(code) {
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
