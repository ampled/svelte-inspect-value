<script lang="ts">
  import { stringify } from '$lib/util.js'

  import type { OptionsContext } from '$lib/options.svelte.js'
  import type { TypeViewProps } from '$lib/types.js'
  import { getContext, type Snippet } from 'svelte'
  import Entries from './Entries.svelte'

  type Props = TypeViewProps<string> & { length?: boolean; children?: Snippet }

  let { value = '', length = false, type = 'string', children }: Props = $props()

  const options: OptionsContext = getContext('json-inspect')

  let { stringCollapse } = $derived(options.value)

  let display = $derived(
    stringCollapse && stringCollapse < value.length
      ? value.slice(0, stringCollapse).trimEnd() + '…'
      : value
  )
</script>

<span class="value {type}" title={stringify(value)}>
  {#if children}
    {@render children()}
  {:else}
    {stringify(display)}
  {/if}
</span>
{#if length}
  <Entries type="string" length={value.length} />
{/if}
