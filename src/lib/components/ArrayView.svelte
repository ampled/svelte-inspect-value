<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { getType, stringify } from '$lib/util.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import JsonViewer from './Node.svelte'
  import Preview from './Preview.svelte'

  type Props = TypeViewProps<unknown[]>

  let { value: arrayVal = [], key = undefined, type, path }: Props = $props()

  let preview = $derived(arrayVal.slice(0, 3))
</script>

<Expandable {...{ value: arrayVal, key, type, path }} length={arrayVal.length}>
  {#snippet val()}
    <!-- <ArrayPreview value={arrayVal} /> -->
    <Preview list={preview} hasMore={preview.length < arrayVal.length} prefix={'['} postfix={']'}>
      {#snippet item(val)}
        {@const valType = getType(val)}
        <span class="value {valType}">
          {#if valType === 'array'}
            arr({(val as unknown[]).length})
          {:else if valType === 'object'}
            {'{'}&hellip;{'}'}
          {:else if valType === 'undefined'}
            undefined
          {:else}
            {stringify(val)}
          {/if}
        </span>
      {/snippet}
    </Preview>
  {/snippet}
  {#each arrayVal as value, i (i)}
    <Entry {i}>
      <JsonViewer key={i} {value} {path} />
    </Entry>
  {/each}
</Expandable>
