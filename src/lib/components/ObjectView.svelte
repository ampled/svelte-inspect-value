<script lang="ts">
  import type { KeyName, TypeViewProps } from '../types.js'
  import { type ValueType } from '../util.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'
  import Preview from './Preview.svelte'

  type Props = TypeViewProps<object>

  let { value = {}, key = undefined, type = 'object', path = [] }: Props = $props()

  let entries: [string | symbol, unknown][] = $derived(
    // @ts-expect-error nope
    Reflect.ownKeys(value).map((key) => [key, value[key]])
  )

  let classInstance = $derived(
    value.constructor.toString().startsWith('class') ? value.constructor.name : false
  )

  let objectType = $derived(classInstance ? (classInstance as ValueType) : type)

  let preview = $derived<[KeyName, unknown][]>(
    Reflect.ownKeys(value)
      .slice(0, 3)
      // @ts-expect-error nope
      .map((key) => [key, value[key]])
  )
</script>

<Expandable type={objectType} length={entries.length} {key} {path} {value}>
  {#snippet val()}
    <Preview
      keyValue={preview}
      prefix={'{'}
      postfix={'}'}
      hasMore={entries.length > preview.length}
    />
  {/snippet}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <Node {value} {key} {path} />
    </Entry>
  {/each}
</Expandable>
