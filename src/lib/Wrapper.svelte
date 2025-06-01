<!--
 @component
 Wrapper for different variants of Inspect
-->
<script lang="ts">
  import { getContext, onDestroy, setContext, type Snippet } from 'svelte'
  import type { SvelteHTMLElements } from 'svelte/elements'
  import { fly, slide } from 'svelte/transition'
  import NodeActionButton from './components/NodeActionButton.svelte'
  import NodeIconButton from './components/NodeIconButton.svelte'
  import { createTypingBufferContext } from './typingbuffer.svelte.js'
  import { setAddDestroyCallback, setSearchContext } from './contexts.js'
  import Caret from './icons/Caret.svelte'
  import { useState } from './state.svelte.js'
  import * as i from './icons/index.js'
  import { useOptions } from './options.svelte.js'
  import Search from './components/Search.svelte'
  import { wait } from './util.js'
  import ExpandCollapseIcon from './icons/ExpandCollapseIcon.svelte'
  import { clearSearchCache, parseSearchTerms } from './util/search.js'
  import { scope } from './action/focus.svelte.js'
  import Console from './icons/Console.svelte'

  type Props = {
    showExpandCollapse?: boolean

    onlog?: () => void
    oninspectvaluechange?: () => void
    onhandleclick?: () => void
    headingExtra?: Snippet
    heading?: string | Snippet<[boolean]> | boolean
    children: Snippet
  } & SvelteHTMLElements['div']

  let {
    onlog,
    oninspectvaluechange,
    showExpandCollapse = false,
    headingExtra,
    onhandleclick,
    heading,
    children,
    class: classValue,
    ...rest
  }: Props = $props()

  const id = $props.id()
  const inFixed = getContext(Symbol.for('siv.fixed'))
  const collapseState = useState()
  const options = useOptions()
  const destroyCallbacks: (() => void)[] = []

  let { search } = $derived(options.value)
  let collapsed = $state(false)
  let searchInput = $state('')
  let matchingPaths = $state([])
  let terms = $derived(search && searchInput.length ? parseSearchTerms(searchInput) : [])
  const typingBuffer = createTypingBufferContext(id)
  let container = $state<HTMLDivElement>()
  let searchEle = $state<Search>()
  let settingCollapse = $state<false | 'expanding' | 'collapsing'>(false)

  setSearchContext(() => ({
    searching: searchInput.length > 1,
    matchingPaths,
    query: searchInput,
    terms,
  }))

  setContext(Symbol.for('siv.focus-id'), id)
  setAddDestroyCallback((cb) => {
    destroyCallbacks.push(cb)
  })

  onDestroy(() => {
    for (const callback of destroyCallbacks) {
      callback()
    }
  })

  let lastFocusedEle = $state<HTMLElement | null>()
  function onKeyDown(event: KeyboardEvent & { currentTarget: EventTarget & Window }) {
    lastFocusedEle = document.activeElement as HTMLElement
    if (container?.contains(document.activeElement)) {
      if (event.metaKey || event.ctrlKey) {
        if (event.key === 'f') {
          event.preventDefault()
          event.stopPropagation()
          if (search) {
            searchEle?.focus()
          }
        } else if (event.key === 'e') {
          event.preventDefault()
          event.stopPropagation()
          setCollapse(false)
        } else if (event.key === 'c') {
          event.preventDefault()
          event.stopPropagation()
          setCollapse(true)
        }
      }
    }
  }

  function onSearchKeyDown(
    event: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    if (event.key === 'Escape' && lastFocusedEle != null) {
      lastFocusedEle.focus()
      lastFocusedEle = null
    }
  }

  let hasExpandedTopLevel = $derived.by(() => {
    if (!showExpandCollapse) return false
    if (settingCollapse) return true
    const paths = Object.entries(collapseState.value).map((e) => e[0])
    for (const p of paths) {
      if (p.split('.').length === 1 && collapseState.value[p].collapsed === false) {
        return true
      }
    }
    return false
  })
  async function setCollapse(collapsed: boolean) {
    if (!settingCollapse) {
      settingCollapse = collapsed ? 'collapsing' : 'expanding'
      const paths = Object.entries(collapseState.value).map((e) => e[0])

      for (const p of collapsed ? paths.toReversed() : paths) {
        if (p.split('.').length === 1) {
          if (collapseState.value[p]?.collapsed !== collapsed) {
            collapseState.setCollapse(p, { collapsed })
            await wait() // avoid forced reflow (and get nice stagger effect)
          }
        }
      }
      settingCollapse = false
    }
  }

  // FIXME: only works for currently visible values but is the "cheapest" cache bust strat for now
  function onNestedValueChange(): void {
    clearSearchCache()
    searchEle?.clearPrevQuery()
  }
</script>

<svelte:window onkeydown={onKeyDown} />

<div
  bind:this={container}
  class={['svelte-inspect-value', inFixed && 'in-fixed', classValue]}
  {...rest}
  data-focus-id={id}
  oninspectvaluechange={onNestedValueChange}
  use:scope
>
  {#if heading || search}
    <div
      class="heading"
      class:collapsed
      transition:slide={{ axis: 'y', duration: options.transitionDuration }}
    >
      <button class="heading-collapse-button" onclick={() => (collapsed = !collapsed)}>
        <div class="collapse">
          <Caret style="rotate: {collapsed ? 0 : 90}deg; transition: rotate 250ms ease-in-out" />
        </div>
        {#if typeof heading === 'string'}
          <span class="heading-text">
            {heading}
          </span>
        {:else if typeof heading === 'function'}
          {@render heading(collapsed)}
        {/if}
      </button>
      <div class="heading-extra">
        {#if search && !collapsed}
          <Search
            bind:this={searchEle}
            bind:matchingPaths
            bind:query={searchInput}
            onkeydown={onSearchKeyDown}
          />
        {/if}
        {#if showExpandCollapse && !collapsed}
          <NodeIconButton
            title={hasExpandedTopLevel ? 'collapse all' : 'expand all'}
            onclick={() => setCollapse(hasExpandedTopLevel)}
            disabled={settingCollapse !== false}
          >
            <ExpandCollapseIcon expand={!hasExpandedTopLevel} setting={settingCollapse} />
          </NodeIconButton>
          <NodeIconButton onclick={onlog}>
            <Console />
          </NodeIconButton>
        {/if}
        {@render headingExtra?.()}
      </div>
    </div>
  {/if}
  {#if !collapsed}
    {#if typingBuffer.current.length}
      <div
        class={['typebuffer', typingBuffer.current.length && 'visible']}
        transition:fly={{ duration: options.value.noanimate ? 0 : 100, y: -10 }}
      >
        <div style="height: 1em; width: 1em; flex-shrink: 0">
          <i.Search />
        </div>
        <div style="display: flex">
          {#each typingBuffer.current as c, i (i)}
            <div
              style="color: var(--_text-color); width: 1ch;"
              in:slide={{ axis: 'x', duration: options.transitionDuration }}
            >
              {c}
            </div>
          {/each}{#key typingBuffer.current}<span class="block">▊</span>{/key}
        </div>
      </div>
    {/if}
    <div class="body" transition:slide={{ duration: options.transitionDuration }}>
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

  @keyframes markback {
    from {
      scale: 2;
    }
    to {
      scale: 1;
    }
  }

  @keyframes block {
    from {
      transform: scale(1, 1.2);
      color: var(--_text-color);
    }
    to {
      transform: scale(1, 1);
      color: currentColor;
    }
  }

  :global .svelte-inspect-value::selection {
    background-color: var(--_text-selection-background);
  }

  :global .svelte-inspect-value ::selection {
    background-color: var(--_text-selection-background);
  }

  .svelte-inspect-value:not(.noanimate) {
    transition-duration: 250ms;
    transition-property: color, background-color, border-color, border;
    transition-timing-function: ease-in-out;
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
    animation: none !important;
    transition: none !important;
  }

  .svelte-inspect-value {
    position: relative;
    box-sizing: border-box;
    box-sizing: border-box;
    container-type: inline-size;
    margin: 0;
    border: 1px solid var(--_border-color);
    border-radius: var(--_border-radius);
    background: var(--_background);
    background-color: var(--_background-color);
    width: var(--inspect-width, 100%);
    min-width: var(--inspect-min-width, 360px);
    max-width: var(--inspect-max-width, 100%);
    overflow: hidden;
    color: var(--_text-color);
    font-size: var(--inspect-font-size, 12px);
    line-height: 1.5em;
    font-family: var(--inspect-font, monospace);
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: grayscale;

    .heading {
      display: flex;
      position: relative;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 1ch;
      border-bottom: 1px solid var(--_border-color);
      padding-inline: 0.5em;
      padding-block: 0.25em;
      min-height: 2em;
      max-height: 2em;
      overflow: hidden;
      color: var(--_text-color);
      font-weight: bold;
      font-size: calc(var(--inspect-font-size, 12px) - 0px);

      .heading-collapse-button {
        all: unset;
        display: flex;
        flex: 0 1 50%;
        align-items: center;
        gap: 0.5em;
        box-sizing: border-box;
        padding-right: 0.25em;
        overflow: hidden;

        &:hover {
          background-color: transparent;
        }

        .heading-text {
          text-overflow: ellipsis;
        }
      }

      .heading-extra {
        display: flex;
        flex: 1 0 60%;
        justify-content: flex-end;
        align-items: center;
        gap: 0.5em;
        max-width: 26em;
      }

      &.collapsed {
        border: none;
      }
    }

    &.borderless {
      border: none;
      border-radius: 0;
      background-color: transparent;

      .body {
        border: none;
        background-color: transparent;
        padding: 0;
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
        border: none;
        padding: 0;
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

    .typebuffer {
      display: none;
      position: absolute;
      top: 2em;
      left: 50%;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5em;
      transform: translateX(-50%);
      z-index: 1;
      border: 1px solid var(--_border-color);
      border-radius: var(--_border-radius);
      background-color: var(--_background-color);
      padding: 1ch;
      width: 90%;
      max-width: 360px;
      overflow: clip;
      color: var(--_button-color);
      font-size: 2em;
      line-height: 1;
      text-align: left;

      .block {
        transform-origin: center 150%;
        animation-duration: 250ms;
        animation-timing-function: ease-in;
        animation-iteration-count: 1;
        animation-name: block;
        line-height: 1;
      }
    }

    &:focus-within .typebuffer {
      display: flex;
    }
  }

  .svelte-inspect-value.in-fixed {
    display: flex;
    flex-direction: column;
  }

  .svelte-inspect-value:has(.heading) {
    min-height: 26px;
  }

  .body {
    /** compact */
    position: relative;
    padding: var(--_padding-compact);
    width: 100%;
    height: 100%;
    overflow: auto;
    --__indent: var(--_indent-compact, 0.5em);
    --line-gap: 0.375em;
    --unit-display: none;

    @container (inline-size > 360px) {
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
    flex-shrink: 0;
    transition: color 250ms ease-in-out;
    color: var(--_object-type-color);
    font-weight: 900;
    font-size: 0.857em;

    &.null,
    &.undefined {
      border-radius: 2px;
      background-color: var(--_niltype-bg-color);
      padding-inline: 0.5em;
      height: 1.3em;
      color: var(--_niltype-text-color);
      line-height: 1.3em;
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
    transition: color 250ms linear;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &.string {
      color: var(--_string-value-color);
    }

    &.multi {
      padding: var(--_indent);
      padding-left: 0.75em;
      overflow-x: auto;
      overflow-y: clip;
      line-height: 1;
      text-overflow: unset;
      white-space: pre;
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
    font-size: inherit;
    font-family: inherit;
  }

  .svelte-inspect-value :global(mark) {
    all: unset;
    box-sizing: border-box;
    /* outline: 1px solid black; */
    border-radius: 2px;
    background-color: var(--_text-search-highlight-color);
    height: 1em;
    height: 100%;
    overflow: visible;
    color: var(--_background-color);
    line-height: 1.5;
    /* text-decoration: underline; */
    /* text-decoration-style: wavy; */
    /* text-decoration-color: var(--_text-search-highlight-color); */
    /* text-decoration */
    /* text-decoration-thickness: 1px; */
  }

  .collapse {
    all: unset;
    all: unset;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: color 250ms ease-in-out;
    cursor: pointer;
    margin: 0;
    border: none;
    padding: 0;
    aspect-ratio: 1 / 1;
    width: 1em;
    min-width: 1em;
    max-width: 1em;
    height: 1em;
    overflow: visible;
    color: var(--_caret-color);
    user-select: none;

    &:hover {
      background-color: transparent;
      color: var(--_caret-hover-color);
    }

    &:focus {
      color: var(--_caret-focus-color);
    }

    &:focus-visible {
      transform: scale(1.2);
      color: var(--_caret-focus-color);
    }

    &:disabled {
      cursor: default;
    }

    * {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }
</style>
