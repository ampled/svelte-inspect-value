<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Expandable from './Expandable.svelte'
  import GetterSetter from './GetterSetter.svelte'
  import Node from './Node.svelte'
  import Preview from './Preview.svelte'
  import PropertyList from './PropertyList.svelte'

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  type Props = TypeViewProps<Function>

  let { value, key, type, path }: Props = $props()

  let keys = $derived(Object.keys(value))
</script>

<Expandable {...{ value, key, type, path }} length={keys.length}>
  {#snippet valuePreview({ showPreview })}
    <span class="value {type}">
      {value.name}
    </span>
    <Preview
      prefix={'{'}
      postfix={'}'}
      {keys}
      value={value as unknown as Record<string | symbol, unknown>}
      {showPreview}
    />
  {/snippet}
  <PropertyList {keys} {value}>
    {#snippet item({ key, descriptor })}
      {#if descriptor?.get || descriptor?.set}
        <GetterSetter {value} {descriptor} {key} {path} />
      {:else}
        <Node value={value[key as keyof typeof value]} {key} {path} />
      {/if}
    {/snippet}
  </PropertyList>
</Expandable>
