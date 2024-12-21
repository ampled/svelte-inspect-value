<script lang="ts">
  import { collapseString, stringify } from '$lib/util.js'

  import type { OptionsContext } from '$lib/options.svelte.js'
  import type { TypeViewProps } from '$lib/types.js'
  import { getContext } from 'svelte'
  import OneLineView from './OneLineView.svelte'
  import Expandable from './Expandable.svelte'
  import StringValue from './StringValue.svelte'
  import { isUrl as isurl } from '$lib/util/is-url.js'

  let { value = '', key, type, path }: TypeViewProps<string> = $props()

  const options: OptionsContext = getContext('json-inspect')

  let { stringCollapse } = $derived(options.value)

  let isMultiLine = $derived(value.includes('\n'))

  let isUrl = $derived(isurl(value))
  let isImageUrl = $derived((isUrl && value.endsWith('.png')) || value.endsWith('.svg'))

  let display = $derived(collapseString(value, stringCollapse))
</script>

{#if isMultiLine || isImageUrl}
  <Expandable {...{ value, key, type, path }} length={value.length}>
    {#snippet val()}
      <StringValue {value} />
    {/snippet}
    {#if isImageUrl}
      <img alt={key!.toString()} src={value} style="max-height: 100px" />
    {:else}
      <pre class="value string multi" title={value}>{value}</pre>
    {/if}
  </Expandable>
{:else}
  <OneLineView {key} {type} {path} value={stringify(display)} title={stringify(value)}>
    {#snippet val()}
      <StringValue {value} length />
    {/snippet}
  </OneLineView>
{/if}
