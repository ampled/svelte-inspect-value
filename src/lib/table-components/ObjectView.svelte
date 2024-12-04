<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import JsonViewer from './JsonViewer.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<object>

  let { value = {}, key = undefined, type, path = [] }: Props = $props()

  let properties: [string | symbol, any][] = $derived(
    // @ts-expect-error
    Reflect.ownKeys(value).map((key) => [key, value[key]])
  )

  let entries = $derived([...properties])
</script>

<TitleBar {key} {type} {path} length={properties.length}>
  {#each entries as [key, value] (key)}
    <div class="entry">
      <JsonViewer {value} {key} {path} />
    </div>
  {/each}
</TitleBar>
