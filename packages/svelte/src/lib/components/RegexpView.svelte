<script lang="ts">
  import { getIsKey } from '../contexts.js'
  import type { TypeViewProps } from '../types.js'
  import Expandable from './Expandable.svelte'
  import GetterSetter from './GetterSetter.svelte'
  import Highlight from './Highlight.svelte'
  import Node from './Node.svelte'
  import PropertyList from './PropertyList.svelte'

  type Props = TypeViewProps<RegExp>

  let { value, key = undefined, type, path, ...rest }: Props = $props()

  let { source, flags } = $derived(value)

  let keys = [
    'lastIndex',
    'dotAll',
    'flags',
    'global',
    'hasIndices',
    'ignoreCase',
    'multiline',
    'source',
    'sticky',
    'unicode',
    'unicodeSets',
  ]

  const isKey = getIsKey()
</script>

<Expandable
  length={1}
  showLength={false}
  {type}
  {key}
  {path}
  {value}
  showKey={!isKey}
  {...rest}
  keepPreviewOnExpand
>
  {#snippet valuePreview()}
    <Highlight
      data-testid="value"
      class="value regexp"
      title={value.toString()}
      value={value.toString()}
      fields={['value']}
    >
      <span class="slash">/</span><span>{source}</span><span class="slash">/</span><span
        class="flags">{flags}</span
      >
    </Highlight>
  {/snippet}
  <PropertyList {keys} {value} {type}>
    {#snippet item({ key, descriptor })}
      {#if descriptor?.get || descriptor?.set}
        <GetterSetter {value} {descriptor} {key} {path} />
      {:else}
        <Node value={value[key as keyof typeof value]} {key} {path} />
      {/if}
    {/snippet}
  </PropertyList>
</Expandable>

<style>
  .slash,
  .flags {
    color: var(--base08);
  }
</style>
