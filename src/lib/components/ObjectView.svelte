<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { getType, stringifyOrToString, type ValueType } from '$lib/util.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import Key from './Key.svelte'
  import Node from './Node.svelte'
  import Preview from './Preview.svelte'
  import StringValue from './StringValue.svelte'
  import Type from './Type.svelte'

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

  let preview = $derived(Reflect.ownKeys(value).slice(0, 3))
</script>

<Expandable type={objectType} length={entries.length} {key} {path} {value}>
  {#snippet val()}
    <Preview list={preview} prefix={'{'} postfix={'}'} hasMore={entries.length > preview.length}>
      {#snippet item(i)}
        {@const val = value[i as keyof typeof value]}
        {@const valType = getType(val)}
        <Key key={i as string} />
        <span class="value {valType}">
          {#if valType === 'array'}
            arr({(val as unknown[]).length})
          {:else if valType === 'object'}
            {'{'}&hellip;{'}'}
          {:else if valType === 'undefined' || valType === 'null'}
            <Type type={valType} />
          {:else if valType === 'string'}
            <StringValue value={val as string} />
          {:else}
            {stringifyOrToString(value[i as keyof typeof value])}
          {/if}
        </span>
      {/snippet}
    </Preview>
  {/snippet}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <Node {value} {key} {path} />
    </Entry>
  {/each}
</Expandable>
