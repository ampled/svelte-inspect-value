<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import type { ValueType } from '$lib/util.js'
  import Entry from './Entry.svelte'
  import JsonViewer from './JsonViewer.svelte'
  import ObjectLikeView from './ObjectLikeView.svelte'

  type Props = TypeViewProps<object | SetIterator<any>>

  let { value = {}, key = undefined, type = 'object', path = [] }: Props = $props()

  let entries: [string | symbol, any][] = $derived(
    // @ts-expect-error
    Reflect.ownKeys(value).map((key) => [key, value[key]])
  )

  let classInstance = $derived(
    value.constructor.toString().startsWith('class') ? value.constructor.name : false
  )

  let objectType = $derived(classInstance ? (classInstance as ValueType) : type)
</script>

<!-- <TitleBar {...{ value, key, path }} type={objectType} length={entries.length}>
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <JsonViewer {value} {key} {path} />
    </Entry>
  {/each}
</TitleBar> -->

<ObjectLikeView type={objectType} length={entries.length} {key} {path} {value}>
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <JsonViewer {value} {key} {path} />
    </Entry>
  {/each}
</ObjectLikeView>
