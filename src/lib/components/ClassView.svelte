<script lang="ts">
  import { getPreviewLevel } from '$lib/contexts.js'
  import type { TypeViewProps } from '$lib/types.js'
  import { getAllProperties } from '$lib/util.js'
  import Expandable from './Expandable.svelte'
  import GetterSetter from './GetterSetter.svelte'
  import Node from './Node.svelte'
  import Preview from './Preview.svelte'
  import PropertyList from './PropertyList.svelte'

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  type Props = TypeViewProps<Function>

  let { value, key, type, path, ...rest }: Props = $props()

  const previewLevel = getPreviewLevel()

  let keys = $derived(getAllProperties(value))
</script>

<Expandable {...{ value, key, type, path }} length={keys.length} {...rest}>
  {#snippet valuePreview({ showPreview })}
    <span class="value {type}">
      {value.name}
    </span>
    {#if !previewLevel}
      <Preview
        prefix={'{'}
        postfix={'}'}
        {keys}
        value={value as unknown as Record<string | symbol, unknown>}
        {showPreview}
      />
    {/if}
  {/snippet}
  <PropertyList {keys} {value}>
    {#snippet item({ key, descriptor })}
      {#if descriptor?.get || descriptor?.set}
        <GetterSetter keyPrefix="static" {value} {descriptor} {key} {path} />
      {:else}
        <Node value={value[key as keyof typeof value]} {key} keyPrefix="static" {path} />
      {/if}
    {/snippet}
  </PropertyList>
</Expandable>
