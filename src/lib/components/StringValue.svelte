<!-- 
 @component StringValue 
 
 Handles "smart" behavior of string value representation like collapsing
 according to stringCollapse-prop or using an anchor tag if it's a link
 
 -->
<script lang="ts">
  import { collapseString, stringify } from '../util.js'

  import { getPreviewLevel } from '$lib/contexts.js'
  import LinkIcon from '$lib/icons/LinkIcon.svelte'
  import { useOptions } from '../options.svelte.js'
  import type { TypeViewProps } from '../types.js'
  import Count from './Count.svelte'

  type Props = TypeViewProps<string> & { length?: boolean }

  let { value, display, length = false, type = 'string' }: Props = $props()
  const previewLevel = getPreviewLevel()
  const options = useOptions()

  let displayOrValue = $derived(display != null ? display : value)
  let isUrlOrPath = $derived(
    (type === 'string' || type === 'url') &&
      (URL.canParse(displayOrValue) || displayOrValue.startsWith('/') || value.startsWith('data:'))
  )
  let ele: 'a' | 'pre' = $derived(isUrlOrPath ? 'a' : 'pre')

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
  <!-- only use stringify (add quotes) if the original value is not a string (e.g. date or url)  -->
  {type === 'string' ? stringify(collapsed, 0, options.value.quotes) : collapsed}{#if isUrlOrPath}
    <span class="value url">
      <LinkIcon />
    </span>
  {/if}
</svelte:element>{#if length && !previewLevel}
  <Count type="string" length={value.length} />
{/if}

<style>
  .stringvalue {
    display: flex;
    align-items: center;
    text-wrap: nowrap;
    white-space: pre !important;
    white-space-collapse: preserve-spaces;
  }
</style>
