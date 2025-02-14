<script lang="ts">
  import { getPreviewLevel } from '$lib/contexts.js'
  import type { TypeViewProps } from '$lib/types.js'
  import { BROWSER } from 'esm-env'
  import Expandable from './Expandable.svelte'
  import FunctionBody from './FunctionBody.svelte'
  import OneLineView from './OneLineView.svelte'

  type Props = TypeViewProps<
    () => unknown,
    'function' | 'asyncfunction' | 'generatorfunction' | 'asyncgeneratorfunction'
  >

  let { value, key, type, path, ...rest }: Props = $props()

  let isMultiLine = $derived(value.toString().includes('\n'))

  const previewLevel = getPreviewLevel()

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
      <span title={value.name} class="preview value function">{value.name}</span>
    {:else if BROWSER}
      <FunctionBody value={oneLine} inline />
    {/if}
  {/if}
{/snippet}

{#if isMultiLine}
  <Expandable {key} {type} {path} {value} length={1} showLength={false} {...rest}>
    {#snippet valuePreview({ showPreview })}
      {#if showPreview}
        {#if previewLevel}
          <span class="preview value function">{value.name}</span>
        {:else if BROWSER}
          <FunctionBody value={oneLine} inline />
        {/if}
      {/if}
    {/snippet}
    <FunctionBody value={value.toString()} />
  </Expandable>
{:else}
  <OneLineView {key} {type} {path} {value} {...rest}>
    {@render valuePreview({ showPreview: true })}
  </OneLineView>
{/if}

<style>
  .preview.value.function {
    margin-left: 0.5em;
  }
</style>
