<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { getContext } from 'svelte'
  import Expandable from './Expandable.svelte'
  import FunctionBody from './FunctionBody.svelte'
  import OneLineView from './OneLineView.svelte'

  type Props = TypeViewProps<() => unknown>

  let { value, key, type, path }: Props = $props()

  let isMultiLine = $derived(value.toString().includes('\n'))

  const previewLevel = getContext<number | undefined>('preview')

  const oneLine = $derived(
    type === 'asyncfunction' ? value.toString().replace('async', '') : value.toString()
  )
</script>

{#if isMultiLine}
  <Expandable {key} {type} {path} {value} length={1} showLength={false}>
    {#snippet valuePreview({ showPreview })}
      {#if showPreview}
        {#if previewLevel}
          <span class="value function">{value.name}</span>
        {:else}
          <FunctionBody value={oneLine} inline />
        {/if}
      {/if}
    {/snippet}
    <FunctionBody value={value.toString()} />
  </Expandable>
{:else}
  <OneLineView {key} {type} {path} {value}>
    {#snippet val()}
      {#if previewLevel}
        <span class="value function">{value.name}</span>
      {:else}
        <FunctionBody value={oneLine} inline />
      {/if}
    {/snippet}
  </OneLineView>
{/if}
