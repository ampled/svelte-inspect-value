<script lang="ts">
  import { collapseString, stringify } from '../util.js'

  import { getContext, type Snippet } from 'svelte'
  import { useOptions } from '../options.svelte.js'
  import type { TypeViewProps } from '../types.js'
  import { isUrl as isurl } from '../util/is-url.js'
  import Entries from './Entries.svelte'

  type Props = TypeViewProps<string> & { length?: boolean; children?: Snippet }

  let { value = '', length = false, type = 'string', children }: Props = $props()

  let isUrl = $derived(isurl(value))

  let ele: 'a' | 'span' = $derived(isUrl ? 'a' : 'span')

  let options = useOptions()

  let display = $derived(collapseString(value, options.value.stringCollapse))

  const preview = getContext<boolean>('preview')
</script>

<svelte:element
  this={ele}
  class="value {type}"
  title={stringify(value)}
  href={isUrl ? value : null}
  target={isUrl ? '_blank' : null}
  rel={isUrl ? 'noreferrer' : null}
>
  {#if children}
    {@render children()}
  {:else}
    {stringify(display, 0, options.value.quotes)}
  {/if}
</svelte:element>
{#if length && !preview}
  <Entries type="string" length={value.length} />
{/if}
