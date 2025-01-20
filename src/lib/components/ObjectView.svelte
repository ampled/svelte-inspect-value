<script lang="ts">
  import type { TypeViewProps } from '../types.js'
  import { type ValueType } from '../util.js'
  import Expandable from './Expandable.svelte'
  import GetterSetter from './GetterSetter.svelte'
  import Node from './Node.svelte'
  import Preview from './Preview.svelte'
  import PropertyList from './PropertyList.svelte'

  type Props = TypeViewProps<object>

  let { value = {}, key = undefined, type, path = [] }: Props = $props()

  let classInstance = $derived(
    value.constructor.toString().startsWith('class') ? value.constructor.name : false
  )

  let objectType = $derived(classInstance ? (classInstance as ValueType) : type)
  let keys = $derived(Reflect.ownKeys(value))
  let previewKeys = $derived(keys.slice(0, 3))
</script>

<Expandable type={objectType} length={keys.length} {key} {path} {value} forceType={!!classInstance}>
  {#snippet valuePreview({ showPreview })}
    <Preview
      prefix={'{'}
      postfix={'}'}
      keys={previewKeys}
      value={value as Record<string | symbol, unknown>}
      hasMore={keys.length > previewKeys.length}
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

  <!-- {#each keys as key, i (key)}
    {@const descriptor = getDescriptor(key)}
    <Entry {i}>
      {#if descriptor?.get || descriptor?.set}
        {#if descriptor.get}
          <Getter {descriptor} value={value as Record<string, unknown>} {key} {path} />
        {/if}
        {#if descriptor.set}
          <Node value={descriptor.set} {key} {path} />
        {/if}
      {:else}
        <Node value={value[key as keyof typeof value]} {key} {path} />
      {/if}
    </Entry>
  {/each} -->
</Expandable>
