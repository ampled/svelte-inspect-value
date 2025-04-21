<!-- 
 @component StringValue 
 
 Handles "smart" behavior of string value representation like collapsing
 according to stringCollapse-option or using an anchor tag if it's a link

 Single-line only
 
 -->
<script lang="ts">
  import LinkIcon from '../icons/LinkIcon.svelte'
  import { useOptions } from '../options.svelte.js'
  import type { TypeViewProps } from '../types.js'
  import { collapseString, stringify } from '../util.js'

  type Props = TypeViewProps<string> & { inline?: boolean }

  let { value, display, type = 'string' }: Props = $props()
  const options = useOptions()

  let displayOrValue = $derived(display != null ? display : value)
  let isUrlOrPath = $derived(
    (type === 'string' || type === 'url') &&
      (URL.canParse(displayOrValue) || displayOrValue.startsWith('/') || value.startsWith('data:'))
  )
  let ele: 'a' | 'span' = $derived(isUrlOrPath ? 'a' : 'span')

  let collapsed = $derived(collapseString(displayOrValue, options.value.stringCollapse))
</script>

<svelte:element
  this={ele}
  data-testid="value"
  class="stringvalue value {type}"
  title={stringify(value)}
  href={isUrlOrPath ? value : null}
  target={isUrlOrPath ? '_blank' : null}
  rel={isUrlOrPath ? 'noreferrer' : null}
>
  {stringify(collapsed, 0, options.value.quotes)}{#if isUrlOrPath}
    <span class="value url">
      <LinkIcon />
    </span>
  {/if}
</svelte:element>

<style>
  .stringvalue {
    display: inline-flex;
    align-items: center;
    text-wrap: nowrap;
    white-space: pre !important;
    white-space-collapse: preserve-spaces;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
