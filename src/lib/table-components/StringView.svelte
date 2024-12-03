<script lang="ts">
  import Line from './Line.svelte'

  import { stringify } from '$lib/util.js'

  import type { OptionsContext } from '$lib/options.svelte.js'
  import type { TypeViewProps } from '$lib/types.js'
  import { getContext } from 'svelte'
  import Key from './Key.svelte'
  import Type from './Type.svelte'
  import OneLineView from './OneLineView.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<string>

  let { value = '', key, type, path }: Props = $props()

  const options: OptionsContext = getContext('json-inspect')

  let { stringCollapse, stringRender } = $derived(options.value)

  let isMultiLine = $derived(value.includes('\n'))

  let display = $derived(
    stringCollapse && stringCollapse < value.length
      ? value.slice(0, stringCollapse).trimEnd() + '…'
      : value
  )

  let collapsed = $state(true)
</script>

{#if isMultiLine}
  <TitleBar {key} {path} {type} bind:collapsed length={value.length}>
    {#snippet val()}
      {#if collapsed}
        <span class="value string" title={stringify(value)}>{stringify(display)}</span>
      {/if}
    {/snippet}
  </TitleBar>

  {#if !collapsed}
    <pre class="value string multi" title={stringify(value)}>{value}</pre>
  {/if}
{:else}
  <OneLineView {key} {type} value={stringify(display)} />
{/if}
