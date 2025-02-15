<!-- 
 @component StringValue 
 
 Handles "smart" behavior of string value representation like collapsing
 according to stringCollapse-option or using an anchor tag if it's a link

 Single-line only
 
 -->
<script lang="ts">
  import { collapseString, stringify } from '../util.js'

  import { getPreviewLevel } from '$lib/contexts.js'
  import LinkIcon from '$lib/icons/LinkIcon.svelte'
  import { useOptions } from '../options.svelte.js'
  import type { TypeViewProps } from '../types.js'
  import Count from './Count.svelte'

  type Props = TypeViewProps<string> & { length?: boolean; inline?: boolean }

  let { value, display, length = false, type = 'string' }: Props = $props()
  const previewLevel = getPreviewLevel()
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
</svelte:element>{#if length && !previewLevel}
  <Count type="string" length={value.length} />
{/if}

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
