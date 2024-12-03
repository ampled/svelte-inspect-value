<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import JsonViewer from './JsonViewer.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<object>

  let { value = {}, key = undefined, type, path }: Props = $props()

  let properties: [string | symbol, any][] = $derived(
    // @ts-expect-error
    Reflect.ownKeys(value).map((key) => [key, value[key]])
  )

  // let staticProperties = $derived(Object.entries(value.constructor))

  let entries = $derived([...properties])

  // let ctorType = $derived(getType(value.constructor))

  // $inspect(ctorType)

  // $inspect(staticProperties)

  let collapsed = $state(true)
</script>

<TitleBar {key} {type} {path} length={properties.length} bind:collapsed />
<div class="indent" class:collapsed>
  {#each entries as [key, value] (key)}
    <div class="entry">
      <JsonViewer {value} {key} {path} />
    </div>
  {/each}
</div>
