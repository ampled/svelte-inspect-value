<!-- 
 @component StringValue 
 
 Handles "smart" behavior of string value representation like collapsing
 according to stringCollapse-option or using an anchor tag if it's a link

 Single-line only
 
 -->
<script lang="ts">
  import LinkIcon from './icons/LinkIcon.svelte'
  import { useOptions } from '../options.svelte.js'
  import type { TypeViewProps } from '../types.js'
  import { collapseString, stringEscapeGroups, stringify, isEscapeGroup } from '../util.js'
  import Highlight from './Highlight.svelte'

  type Props = TypeViewProps<string>

  let { value, display, type = 'string' }: Props = $props()
  const options = useOptions()
  const { stringCollapse, quotes } = $derived(options.value)

  let displayOrValue = $derived(display != null ? display : value)
  let isUrlOrPath = $derived(
    (type === 'string' || type === 'url') &&
      (URL.canParse(displayOrValue) || displayOrValue.startsWith('/') || value.startsWith('data:'))
  )
  let ele: 'a' | 'span' = $derived(isUrlOrPath ? 'a' : 'span')

  let collapsed = $derived(collapseString(displayOrValue, stringCollapse))
  let quote = $derived(quotes === 'single' ? `'` : quotes === 'double' ? '"' : '')
  let groups = $derived([quote, ...stringEscapeGroups(collapsed), quote])
</script>

<svelte:element
  this={ele}
  data-testid="value"
  class={['stringvalue', 'value', type.toLowerCase(), isUrlOrPath && 'url-or-path', quotes]}
  title={value}
  href={isUrlOrPath ? value : null}
  target={isUrlOrPath ? '_blank' : null}
  rel={isUrlOrPath ? 'noreferrer' : null}
>
  <Highlight value={stringify(displayOrValue, 0, quotes)} fields={['value']} alsoMatch={value}>
    {#each groups as group}
      <span class={{ escape: isEscapeGroup(group) }}>{group}</span>
    {/each}
  </Highlight>{#if isUrlOrPath}
    <span class="value url">
      <LinkIcon />
    </span>
  {/if}
</svelte:element>

<style>
  .stringvalue {
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
    white-space: nowrap !important;
    white-space-collapse: preserve-spaces;
  }

  .escape {
    color: var(--base0E);
  }

  .url-or-path {
    cursor: pointer;
  }
</style>
