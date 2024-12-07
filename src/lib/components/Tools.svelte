<script lang="ts">
  import { copyToClipBoard, logToConsole } from '$lib/hello.js'
  import CollapseChildren from '$lib/icons/CollapseChildren.svelte'
  import Console from '$lib/icons/Console.svelte'
  import Copy from '$lib/icons/Copy.svelte'
  import ExpandChildren from '$lib/icons/ExpandChildren.svelte'
  import { STATE_CONTEXT_KEY, type StateContext } from '$lib/state.svelte.js'
  import type { TypeViewProps } from '$lib/types.js'
  import { stringifyPath } from '$lib/util.js'
  import { getContext } from 'svelte'
  import { fade, fly } from 'svelte/transition'

  type Props = TypeViewProps<any> & {
    childrenCollapsed?: () => void
  }

  let { value, path = [], childrenCollapsed }: Props = $props()

  let copied = $state(false)

  let inspectState: StateContext = getContext(STATE_CONTEXT_KEY)

  let level = $derived(path.length)

  let collapseState = $derived(inspectState.value[stringifyPath(path)])
  let collapsed = $derived(collapseState ? collapseState.collapsed : level === 1 ? false : true)

  const hasChildren = $derived.by(() => {
    const key = stringifyPath(path)
    return Object.entries(inspectState.value).filter(
      ([k]) => k.startsWith(key) && k.length > key.length
    )
  })

  const children = $derived(
    Object.entries(inspectState.value).filter(
      ([k]) => k.startsWith(stringifyPath(path)) && k !== stringifyPath(path)
    )
  )

  let hasExpandedChildren = $derived.by(() => {
    const key = stringifyPath(path)
    const children = Object.entries(inspectState.value).filter(
      ([k]) => k.startsWith(key) && k !== key
    )
    return children.some(([k, v]) => !v.collapsed)
  })

  let hint = $state('')

  let timeout: number = -1

  function setHint(text: string) {
    if (timeout) window.clearTimeout(timeout)
    hint = text
    timeout = window.setTimeout(() => {
      hint = ''
    }, 3000)
  }

  async function copy(val: any) {
    try {
      await copyToClipBoard(val)
      copied = true
      window.setTimeout(() => {
        copied = false
      }, 5000)
    } catch {
      copied = false
    }
  }

  function collapseChildren() {
    inspectState.collapseChildren(level, path)
    childrenCollapsed?.()
  }

  // function log (value: any) {
  //   if val
  // }

  // const actions = [{}]
</script>

<!-- <small>hasExpandedChildren: {hasExpandedChildren}</small> -->
{#if children.length}
  {#if hasExpandedChildren}
    <button
      title={hint}
      aria-label={hint}
      onmouseenter={() => setHint('collapse children')}
      onclick={() => collapseChildren()}
    >
      <CollapseChildren />
    </button>
  {:else}
    <button
      title={hint}
      aria-label={hint}
      onmouseenter={() => setHint('expand children')}
      onclick={() => inspectState.expandChildren(level, path)}
    >
      <ExpandChildren />
    </button>
  {/if}
{/if}
<!--
<button
  title={hint}
  aria-label={hint}
  onmouseenter={() => setHint('collapse children')}
  onclick={() => collapseChildren()}
>
  <CollapseChildren />
</button> -->
<button
  title="log value to console"
  aria-label="log value to console"
  onmouseenter={() => setHint('log')}
  onclick={() => logToConsole(value)}
>
  <Console />
</button>
<button
  title="copy value to clipboard"
  aria-label="copy value to clipboard"
  onmouseenter={() => setHint('clipboard')}
  onclick={() => copy(value)}
  class:copied
>
  <Copy />
</button>
<div
  style="width: 8em; height: 1em; line-height: 1em; position: relative; border-right: 1px solid currentColor"
>
  {#if !!hint}
    {#key hint}
      <small
        in:fly={{ y: -10 }}
        out:fly={{ y: 10 }}
        style="position: absolute; inset: 0; padding-left: 1em"
      >
        {hint}
      </small>
    {/key}
  {/if}
</div>
