<script lang="ts">
  import { stringify } from '$lib/util.js'

  import { OPTIONS_CONTEXT, type OptionsContext } from '$lib/options.svelte.js'
  import type { TypeViewProps } from '$lib/types.js'
  import { isUrl as isurl } from '$lib/util/is-url.js'
  import { getContext, type Snippet } from 'svelte'
  import Entries from './Entries.svelte'

  type Props = TypeViewProps<string> & { length?: boolean; children?: Snippet }

  let { value = '', length = false, type = 'string', children }: Props = $props()

  let isUrl = $derived(isurl(value))

  let ele: 'a' | 'span' = $derived(isUrl ? 'a' : 'span')

  const options: OptionsContext = getContext(OPTIONS_CONTEXT)

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
