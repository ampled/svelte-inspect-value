<script lang="ts">
  import { stringify } from '$lib/util.js'

  import type { OptionsContext } from '$lib/options.svelte.js'
  import type { TypeViewProps } from '$lib/types.js'
  import { getContext } from 'svelte'

  type Props = TypeViewProps<string>

  let { value = '' }: Props = $props()

  const options: OptionsContext = getContext('json-inspect')

  let { stringCollapse } = $derived(options.value)

  let display = $derived(
    stringCollapse && stringCollapse < value.length
      ? value.slice(0, stringCollapse).trimEnd() + '…'
      : value
  )
</script>

<span class="value string" title={stringify(value)}>{stringify(display)}</span>
