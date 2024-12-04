<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import JsonViewer from './JsonViewer.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<any[]>

  let { value: arrayVal = [], key = undefined, type, path }: Props = $props()
</script>

<TitleBar {path} {key} length={arrayVal.length} {type}>
  {#each arrayVal as value, i (i)}
    <div class="entry">
      <JsonViewer key={i} {value} {path} />
    </div>
  {/each}
</TitleBar>
