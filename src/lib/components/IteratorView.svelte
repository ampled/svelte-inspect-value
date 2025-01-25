<script lang="ts">
  import { getPreviewLevel } from '$lib/contexts.js'
  import { stringifyPath } from '$lib/util.js'
  import { getContext, onMount } from 'svelte'
  import type { SvelteMap } from 'svelte/reactivity'
  import type { TypeViewProps } from '../types.js'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'
  import NodeActionButton from './NodeActionButton.svelte'
  import Preview from './Preview.svelte'
  import PropertyList from './PropertyList.svelte'

  type Props = TypeViewProps<Iterator<unknown> | Generator>

  let { value: iterator, key = undefined, type, path = [], showKey }: Props = $props()

  const valueCache =
    getContext<SvelteMap<string, { done: boolean; unwrap: unknown[] } | undefined>>('value-cache')
  const previewLevel = getPreviewLevel()
  let stringifiedPath = $derived(stringifyPath(path))
  let hasCached = $derived(valueCache.has(stringifiedPath))

  let unwrap = $state<unknown[]>([])
  let isDone = $state<boolean | undefined>(false)

  onMount(() => {
    if (hasCached) {
      const cachedValue = valueCache.get(stringifiedPath)
      if (cachedValue) {
        unwrap = cachedValue.unwrap
        isDone = cachedValue.done
      }
    }
  })

  function next() {
    const { value, done } = iterator.next()
    if (typeof done === 'boolean') isDone = done
    if (!done) {
      unwrap.push(value)
    }
    valueCache.set(stringifiedPath, { unwrap: $state.snapshot(unwrap), done: isDone as boolean })
  }

  function complete() {
    let result = iterator.next()
    let i = 0
    while (!result.done && i < 100) {
      i++
      unwrap.push(result.value)
      result = iterator.next()
      if (typeof result.done === 'boolean') isDone = result.done
    }
  }
</script>

<Expandable
  {...{ value: iterator, key, type, path }}
  length={unwrap.length}
  {showKey}
  showLength={false}
>
  {#snippet valuePreview({ showPreview })}
    {#if !previewLevel}
      <NodeActionButton disabled={isDone} onclick={next}>
        {isDone ? 'done' : 'next'}
      </NodeActionButton>
      <NodeActionButton disabled={isDone} onclick={complete}>all</NodeActionButton>
    {/if}
    <Preview {path} list={unwrap} prefix={'['} postfix={']'} {showPreview} showKey={false} />
  {/snippet}
  <PropertyList value={unwrap} keys={[...unwrap.keys()]}>
    {#snippet item({ key })}
      <Node {key} {path} value={unwrap[key]} />
    {/snippet}
  </PropertyList>
</Expandable>
