<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import JsonViewer from './Node.svelte'
  import Expandable from './Expandable.svelte'
  import Entry from './Entry.svelte'
  import ArrayPreview from './ArrayPreview.svelte'

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

  const TO_STRING_TAG = 'Symbol(Symbol.toStringTag)'
  const internalKeys = ['buffer', 'byteLength', 'byteOffset', 'length', TO_STRING_TAG]
  let keys = [...Object.getOwnPropertyNames(value), ...internalKeys]
  let preview = value.slice(0, 5)

  function getValue(key: any) {
    if (key === TO_STRING_TAG) {
      return value[Symbol.toStringTag]
    }
    return value[key]
  }

  let entries = $derived<[string, unknown][]>(keys.map((k) => [k, getValue(k)]))
</script>

<Expandable {...{ value, key, type, path }} length={value?.length}>
  {#snippet val()}
    <ArrayPreview value={entries} />
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
