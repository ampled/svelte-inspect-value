<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import JsonViewer from './Node.svelte'
  import Preview from './Preview.svelte'

  type TypedArray =
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array
    | BigInt64Array
    | BigUint64Array

  type Props = TypeViewProps<TypedArray>

  let { value, key = undefined, type, path }: Props = $props()

  const internalKeys = ['buffer', 'byteLength', 'byteOffset', 'length']
  let keys = [...Object.getOwnPropertyNames(value), ...internalKeys]

  function getValue(key: keyof typeof value) {
    return value[key]
  }

  let entries = $derived<[string, unknown][]>(
    keys.map((k) => [k, getValue(k as keyof typeof value)])
  )
  let preview = $derived(entries.slice(0, 3))
</script>

<Expandable {...{ value, key, type, path }} length={value?.length}>
  {#snippet valuePreview()}
    <Preview prefix="[" postfix="]" list={preview} hasMore={preview.length < 3} />
  {/snippet}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <JsonViewer {key} {value} {path} />
    </Entry>
  {/each}
  <!-- {#each value as value, i (i)}
    <Entry {i}>
      <JsonViewer key={i} {value} {path} />
    </Entry>
  {/each} -->
</Expandable>
