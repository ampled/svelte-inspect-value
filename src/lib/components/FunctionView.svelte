<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { getContext } from 'svelte'
  import Expandable from './Expandable.svelte'
  import FunctionBody from './FunctionBody.svelte'
  import OneLineView from './OneLineView.svelte'

  type Props = TypeViewProps<
    () => unknown,
    'function' | 'asyncfunction' | 'generatorfunction' | 'asyncgeneratorfunction'
  >

  let { value, key, type = 'function', path }: Props = $props()

  let isMultiLine = $derived(value.toString().includes('\n'))

  const previewLevel = getContext<number | undefined>('preview')

  const oneLine = $derived.by(() => {
    switch (type) {
      case 'asyncfunction':
        return value.toString().replace('async', '')
      case 'generatorfunction':
        return value.toString().replace('function*', '').replace('*', '')
      case 'asyncgeneratorfunction':
        return value.toString().replace('async', '').replace('function*', '').replace('*', '')
    }

    return value.toString()
  })
</script>

{#snippet valuePreview({ showPreview }: { showPreview: boolean })}
  {#if showPreview}
    {#if previewLevel}
      <span title={value.name} class="value function">{value.name}</span>
    {:else}
      <FunctionBody value={oneLine} inline />
    {/if}
  {/if}
{/snippet}

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
    {@render valuePreview({ showPreview: true })}
  </OneLineView>
{/if}
