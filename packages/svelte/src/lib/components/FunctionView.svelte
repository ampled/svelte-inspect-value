<script lang="ts">
  import { BROWSER } from 'esm-env'
  import { getPreviewLevel } from '../contexts.js'
  import type { TypeViewProps } from '../types.js'
  import Expandable from './Expandable.svelte'
  import FunctionBody from './FunctionBody.svelte'

  type Props = TypeViewProps<
    Function,
    'Function' | 'AsyncFunction' | 'GeneratorFunction' | 'AsyncGeneratorFunction'
  >

  let { value, key, type, path, ...rest }: Props = $props()

  let isMultiLine = $derived(value.toString().includes('\n'))

  const previewLevel = getPreviewLevel()

  const oneLine = $derived.by(() => {
    switch (type?.toLowerCase()) {
      case 'function':
        return value.toString().replace('function', '')
      case 'asyncfunction':
        return value.toString().replace('async', '').replace('function', '')
      case 'generatorfunction':
        return value.toString().replace('function*', '').replace('*', '')
      case 'asyncgeneratorfunction':
        return value.toString().replace('async', '').replace('function*', '').replace('*', '')
    }

    return value.toString()
  })
</script>

<Expandable {key} {type} {path} {value} length={isMultiLine ? 1 : 0} showLength={false} {...rest}>
  {#snippet valuePreview({ showPreview }: { showPreview: boolean })}
    {#if previewLevel}
      <span title={value.name} class="preview value function">{value.name}</span>
    {:else if showPreview && isMultiLine && BROWSER}
      <FunctionBody value={oneLine} inline />
    {:else if BROWSER && !isMultiLine}
      <FunctionBody value={oneLine} inline />
    {/if}
  {/snippet}
  {#if isMultiLine}
    <FunctionBody value={value.toString()} />
  {/if}
</Expandable>

<style>
  .preview.value.function {
    margin-left: 0.25em;
  }
</style>
