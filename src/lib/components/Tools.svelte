<script lang="ts">
  import { copyToClipBoard, logToConsole } from '$lib/hello.js'
  import CollapseChildren from '$lib/icons/CollapseChildren.svelte'
  import Console from '$lib/icons/Console.svelte'
  import Copy from '$lib/icons/Copy.svelte'
  import ExpandChildren from '$lib/icons/ExpandChildren.svelte'
  import Settings from '$lib/icons/Settings.svelte'
  import { OPTIONS_CONTEXT, type OptionsContext } from '$lib/options.svelte.js'
  import { STATE_CONTEXT_KEY, type StateContext } from '$lib/state.svelte.js'
  import type { KeyName, TypeViewProps } from '$lib/types.js'
  import { stringifyPath } from '$lib/util.js'
  import { getContext } from 'svelte'

  type Props = Partial<TypeViewProps<unknown>> & { collapsed?: boolean }

  let { value, path = [] }: Props = $props()

  let copied = $state(false)

  let options: OptionsContext = getContext(OPTIONS_CONTEXT)
  let inspectState: StateContext | undefined = getContext(STATE_CONTEXT_KEY)

  let level = $derived(path.length)

  // const hasChildren = $derived.by(() => {
  //   if (inspectState?.value) {
  //     const key = stringifyPath(path)
  //     return Object.entries(inspectState.value).filter(
  //       ([k]) => k.startsWith(key) && k.length > key.length
  //     )
  //   }
  // })

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
        ([k]) => k.startsWith(key) && k.split('.').length === level + 1
      )
      return children.some(([, v]) => !v.collapsed)
    }
    return false
  })

  let timeout: number = $state(-1)

  async function copy(val: unknown) {
    try {
      await copyToClipBoard(val)
      copied = true
      if (timeout) window.clearTimeout(timeout)
      timeout = window.setTimeout(() => {
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
    onclick={() => treeAction.action(level, path)}
  >
    <treeAction.icon />
  </button>
{/if}
<button
  title="log value to console"
  aria-label="log value to console"
  onclick={() => logToConsole(value)}
>
  <Console />
</button>
<button
  title="copy value to clipboard"
  aria-label="copy value to clipboard"
  onclick={() => copy(value)}
  class:copied
>
  <Copy />
</button>
{#if level === 1}
  <button title="options" aria-label="options" onclick={() => (options.value.open = true)}>
    <Settings />
  </button>
{/if}

<style>
  button {
    padding: 2px;
  }
</style>
