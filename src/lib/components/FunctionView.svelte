<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { getContext } from 'svelte'
  import Expandable from './Expandable.svelte'
  import FunctionBody from './FunctionBody.svelte'
  import OneLineView from './OneLineView.svelte'

  type Props = TypeViewProps<() => unknown>

  let { value, key, type, path }: Props = $props()

  let isMultiLine = $derived(value.toString().includes('\n'))

  const preview = getContext<boolean>('preview')
</script>

{#snippet valuePreview()}
  {#if preview}
    <span class="value function">{value.name}</span>
  {:else}
    <FunctionBody value={value.toString()} inline />
  {/if}
{/snippet}

{#if isMultiLine}
  <Expandable {key} {type} {path} {value} {valuePreview} length={1} showLength={false}>
    <FunctionBody value={value.toString()} />
  </Expandable>
{:else}
  <OneLineView {key} {type} val={valuePreview} {path} {value} />
{/if}
