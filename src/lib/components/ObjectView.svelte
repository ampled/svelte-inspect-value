<script lang="ts">
  import type { KeyType, TypeViewProps } from '../types.js'
  import { type ValueType } from '../util.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'
  import Preview from './Preview.svelte'

  type Props = TypeViewProps<object>

  let { value = {}, key = undefined, type, path = [] }: Props = $props()

  let classInstance = $derived(
    value.constructor.toString().startsWith('class') ? value.constructor.name : false
  )

  let objectType = $derived(classInstance ? (classInstance as ValueType) : type)
  let entries: [string | symbol, unknown][] = $derived(
    // @ts-expect-error nope
    Reflect.ownKeys(value).map((key) => [key, value[key]])
  )
  let preview = $derived<[KeyType, unknown][]>(entries.slice(0, 3))
</script>

<Expandable
  type={objectType}
  length={entries.length}
  {key}
  {path}
  {value}
  forceType={!!classInstance}
>
  {#snippet valuePreview({ showPreview })}
    <Preview
      keyValue={preview}
      prefix={'{'}
      postfix={'}'}
      hasMore={entries.length > preview.length}
      {showPreview}
    />
  {/snippet}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <Node {value} {key} {path} />
    </Entry>
  {/each}
</Expandable>
