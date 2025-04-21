<!--
 @component
 Wrapper for different variants of Inspect
-->
<script lang="ts">
  import { getContext, type Snippet } from 'svelte'
  import type { SvelteHTMLElements } from 'svelte/elements'
  import { slide } from 'svelte/transition'
  import CollapseButton from './components/CollapseButton.svelte'
  import NodeActionButton from './components/NodeActionButton.svelte'

  type Props = {
    children: Snippet
    oninspectvaluechange?: () => void
    heading?: string | Snippet
    onhandleclick?: () => void
  } & SvelteHTMLElements['div']

  let {
    children,
    class: classValue,
    oninspectvaluechange,
    heading,
    onhandleclick,
    ...rest
  }: Props = $props()

  let collapsed = $state(false)

  const inFixed = getContext(Symbol.for('siv.fixed'))
</script>

<div class={['svelte-inspect-value', inFixed && 'in-fixed', classValue]} {...rest}>
  {#if heading}
    <div class="heading" class:collapsed>
      <CollapseButton
        onclick={() => (collapsed = !collapsed)}
        onchange={(c) => (collapsed = c)}
        value
        {collapsed}
      />
      {#if typeof heading === 'string'}
        {heading}
      {:else}
        {@render heading()}
      {/if}
    </div>
  {/if}
  {#if !collapsed}
    <div class="body" transition:slide>
      <svelte:boundary onerror={console.error}>
        {#snippet failed(_, reset)}
          root error (see console) <NodeActionButton onclick={reset}>reset</NodeActionButton>
        {/snippet}
        {@render children()}
      </svelte:boundary>
    </div>
  {/if}
</div>

<style>
  @import './themes.css';
  @import './vars.css';
  @import './action/resize.css';

  :global .svelte-inspect-value::selection {
    background-color: var(--_text-selection-background);
  }

  :global .svelte-inspect-value ::selection {
    background-color: var(--_text-selection-background);
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
    overflow: hidden;
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

      .heading {
        padding-inline: 0.25em;
        font-weight: bold;
      }
    }

    &.dense {
      border: none;
      border-radius: 0;

      .body {
        padding: 0;
        border: none;
      }

      .heading {
        border-bottom: none;
        padding-inline: 0.25em;
      }

      &.in-fixed {
        .body,
        .heading {
          border-top: 1px solid var(--_border-color);
        }
      }
    }

    .heading {
      color: var(--_text-color);
      font-size: calc(var(--inspect-font-size, 12px) - 0px);
      padding-inline: 0.5em;
      padding-block: 0.25em;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.25em;
      border-bottom: 1px solid var(--_border-color);

      &.collapsed {
        border: none;
      }
    }

    /* hr {
      border-color: var(--_border-color);
      margin: 0 -1em;
    } */
  }

  .svelte-inspect-value.in-fixed {
    display: flex;
    flex-direction: column;
    /* outline: 1px solid hotpink; */
    /* flex-grow: 0; */
    /* flex-shrink: 0; */
    /* min-height: min-content%; */
  }

  .body {
    /** compact */
    transition: all 200ms linear;
    position: relative;
    overflow: auto;
    /* overflow-x: clip; */
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
</style>
