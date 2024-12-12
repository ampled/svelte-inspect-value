<script lang="ts">
  import { copyToClipBoard, logToConsole } from '$lib/hello.js'
  import CollapseChildren from '$lib/icons/CollapseChildren.svelte'
  import Console from '$lib/icons/Console.svelte'
  import Copy from '$lib/icons/Copy.svelte'
  import ExpandChildren from '$lib/icons/ExpandChildren.svelte'
  import Settings from '$lib/icons/Settings.svelte'
  import type { OptionsContext } from '$lib/options.svelte.js'
  import { STATE_CONTEXT_KEY, type StateContext } from '$lib/state.svelte.js'
  import type { KeyName, TypeViewProps } from '$lib/types.js'
  import { stringifyPath } from '$lib/util.js'
  import { getContext } from 'svelte'
  import { blur, draw } from 'svelte/transition'

  type Props = TypeViewProps<any> & { collapsed?: boolean }

  let { value, path = [] }: Props = $props()

  let copied = $state(false)

  let options: OptionsContext = getContext('json-inspect')
  let inspectState: StateContext | undefined = getContext(STATE_CONTEXT_KEY)

  let level = $derived(path.length)

  const hasChildren = $derived.by(() => {
    if (inspectState?.value) {
      const key = stringifyPath(path)
      return Object.entries(inspectState.value).filter(
        ([k]) => k.startsWith(key) && k.length > key.length
      )
    }
  })

  const children = $derived(
    inspectState?.value
      ? Object.entries(inspectState.value).filter(
          ([k]) => k.startsWith(stringifyPath(path)) && k !== stringifyPath(path)
        )
      : []
  )

  let hasExpandedChildren = $derived.by(() => {
    if (inspectState?.value) {
      const key = stringifyPath(path)
      const children = Object.entries(inspectState.value).filter(
        ([k]) => k.startsWith(key) && k.split('$$$').length === level + 1
      )
      return children.some(([k, v]) => !v.collapsed)
    }
    return false
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

  // function log (value: any) {
  //   if val
  // }

  // const actions = [{}]

  let collapseAction = {
    hint: 'collapse children',
    action: (level: number, path: KeyName[]) => inspectState?.collapseChildren(level, path),
    icon: CollapseChildren,
  }

  let expandAction = {
    hint: 'expand children',
    action: (level: number, path: KeyName[]) => inspectState?.expandChildren(level, path),
    icon: ExpandChildren,
  }

  let treeAction = $derived(hasExpandedChildren ? collapseAction : expandAction)
</script>

<!-- <small>hasExpandedChildren: {hasExpandedChildren}</small> -->
{#if children.length}
  <button
    title={treeAction.hint}
    aria-label={treeAction.hint}
    onmouseenter={() => setHint(treeAction.hint)}
    onfocus={() => setHint(treeAction.hint)}
    onclick={() => treeAction.action(level, path)}
  >
    <treeAction.icon />
  </button>
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
{#if level === 1}
  <button
    title="options"
    aria-label="options"
    onmouseenter={() => setHint('options')}
    onclick={() => (options.value.open = true)}
  >
    <Settings />
  </button>
{/if}

<!-- <div
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
</div> -->
