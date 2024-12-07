<script lang="ts">
  import { stringify } from '$lib/util.js'

  import type { OptionsContext } from '$lib/options.svelte.js'
  import type { TypeViewProps } from '$lib/types.js'
  import { getContext } from 'svelte'
  import Entries from './Entries.svelte'

  type Props = TypeViewProps<string> & { length?: boolean }

  let { value = '', length = false }: Props = $props()

  const options: OptionsContext = getContext('json-inspect')

  let { stringCollapse } = $derived(options.value)

  let display = $derived(
    stringCollapse && stringCollapse < value.length
      ? value.slice(0, stringCollapse).trimEnd() + '…'
      : value
  )
</script>

<span class="value string" title={stringify(value)}>{stringify(display)}</span>
{#if length}
  <Entries type="string" length={value.length} />
{/if}
