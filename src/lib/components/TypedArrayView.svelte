<script lang="ts">
  import type { TypeViewProps } from '../types.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'
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

  function getValue(key: keyof typeof value) {
    return value[key]
  }

  let entries = $derived<[string, unknown][]>(
    internalKeys.map((k) => [k, getValue(k as keyof typeof value)])
  )
  let preview = $derived(value.slice(0, 3))
</script>

<Expandable {...{ value, key, type, path }} length={value.length}>
  {#snippet valuePreview({ showPreview })}
    <Preview prefix="[" postfix="]" list={preview} showKey={false} {showPreview} />
  {/snippet}
  {#each value as num, i}
    <Entry {i}>
      <Node key={i} value={num} {path} />
    </Entry>
  {/each}
  {#each entries as [key, val], i (key)}
    <Entry i={value.length + i}>
      <Node {key} value={val} {path} />
    </Entry>
  {/each}
</Expandable>
