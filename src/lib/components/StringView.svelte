<script lang="ts">
  import { stringify } from '$lib/util.js'

  import type { OptionsContext } from '$lib/options.svelte.js'
  import type { TypeViewProps } from '$lib/types.js'
  import { getContext } from 'svelte'
  import OneLineView from './OneLineView.svelte'
  import TitleBar from './TitleBar.svelte'
  import StringValue from './StringValue.svelte'

  let { value = '', key, type, path }: TypeViewProps<string> = $props()

  const options: OptionsContext = getContext('json-inspect')

  let { stringCollapse } = $derived(options.value)

  let isMultiLine = $derived(value.includes('\n'))

  let display = $derived(
    stringCollapse && stringCollapse < value.length
      ? value.slice(0, stringCollapse).trimEnd().trimStart() + '…'
      : value
  )

  // $inspect(value)
</script>

{#if isMultiLine}
  <TitleBar {...{ value, key, type, path }} length={value.length}>
    {#snippet val()}
      <StringValue {value} />
    {/snippet}
    <pre class="value string multi" title={stringify(value)}>{value}</pre>
  </TitleBar>
{:else}
  <OneLineView {key} {type} {path} value={stringify(display)} title={stringify(value)}>
    {#snippet val()}
      <StringValue {value} length />
    {/snippet}
  </OneLineView>
{/if}
