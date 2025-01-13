<script lang="ts">
  import { collapseString, stringify } from '../util.js'

  import { getContext, type Snippet } from 'svelte'
  import { useOptions } from '../options.svelte.js'
  import type { TypeViewProps } from '../types.js'
  import { isUrl as isurl } from '../util/is-url.js'
  import Entries from './Entries.svelte'

  type Props = TypeViewProps<string> & { length?: boolean; children?: Snippet }

  let { value = '', length = false, type = 'string', children }: Props = $props()

  let isUrlOrPath = $derived(isurl(value) || value.startsWith('/'))

  let ele: 'a' | 'span' = $derived(isUrlOrPath ? 'a' : 'span')

  let options = useOptions()

  let display = $derived(collapseString(value, options.value.stringCollapse))

  const previewLevel = getContext<number | undefined>('preview')
</script>

<svelte:element
  this={ele}
  class="value {type}"
  title={stringify(value)}
  href={isUrlOrPath ? value : null}
  target={isUrlOrPath ? '_blank' : null}
  rel={isUrlOrPath ? 'noreferrer' : null}
>
  {#if children}
    {@render children()}
  {:else}
    {stringify(display, 0, options.value.quotes)}
  {/if}
</svelte:element>
{#if length && !previewLevel}
  <Entries type="string" length={value.length} />
{/if}
