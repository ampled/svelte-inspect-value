<script lang="ts">
  import type { TypeViewProps } from '../types.js'
  import { getAllProperties, type ValueType } from '../util.js'
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
  let keys = $derived(getAllProperties(value))
</script>

<Expandable
  type={objectType}
  length={keys.length}
  {key}
  {path}
  {value}
  forceType={!!classInstance}
  keepPreviewOnExpand
>
  {#snippet valuePreview({ showPreview })}
    <Preview
      prefix={'{'}
      postfix={'}'}
      value={value as Record<string | symbol, unknown>}
      {path}
      {keys}
      {showPreview}
    />
  {/snippet}
  <PropertyList {keys} {value} {type}>
    {#snippet item({ key, descriptor })}
      {#if descriptor?.get || descriptor?.set}
        <GetterSetter {value} {descriptor} {key} {path} />
      {:else}
        <Node value={value[key as keyof typeof value]} {key} {path} />
      {/if}
    {/snippet}
  </PropertyList>
</Expandable>
