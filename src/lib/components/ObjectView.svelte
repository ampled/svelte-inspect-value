<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import type { ValueType } from '$lib/util.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'

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
</script>

<Expandable type={objectType} length={entries.length} {key} {path} {value}>
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <Node {value} {key} {path} />
    </Entry>
  {/each}
</Expandable>
