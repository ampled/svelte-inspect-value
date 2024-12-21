<script lang="ts">
  import { stringify } from '$lib/util.js'

  import type { OptionsContext } from '$lib/options.svelte.js'
  import type { TypeViewProps } from '$lib/types.js'
  import { getContext, type Snippet } from 'svelte'
  import Entries from './Entries.svelte'
  import { isUrl as isurl } from '$lib/util/is-url.js'

  type Props = TypeViewProps<string> & { length?: boolean; children?: Snippet }

  let { value = '', length = false, type = 'string', children }: Props = $props()

  let isUrl = $derived(isurl(value))

  let ele: 'a' | 'span' = $derived(isUrl ? 'a' : 'span')

  const options: OptionsContext = getContext('json-inspect')

  let { stringCollapse, quotes } = $derived(options.value)

  let display = $derived(
    stringCollapse && stringCollapse < value.length
      ? value.slice(0, stringCollapse).trimEnd() + '…'
      : value
  )
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
    {stringify(display, 0, quotes)}
  {/if}
</svelte:element>
{#if length}
  <Entries type="string" length={value.length} />
{/if}
