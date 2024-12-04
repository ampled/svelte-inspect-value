<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import JsonViewer from './JsonViewer.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<object>

  let { value = {}, key = undefined, type = 'object', path = [] }: Props = $props()

  let entries: [string | symbol, any][] = $derived(
    // @ts-expect-error
    Reflect.ownKeys(value).map((key) => [key, value[key]])
  )

  let classInstance = $derived(
    value.constructor.toString().startsWith('class') ? value.constructor.name : false
  )

  let objectType = $derived(classInstance ? classInstance : type)
</script>

<TitleBar {key} type={objectType} {path} length={entries.length}>
  {#each entries as [key, value], i (key)}
    <div class="entry" style="--index: {i}">
      <JsonViewer {value} {key} {path} />
    </div>
  {/each}
</TitleBar>
