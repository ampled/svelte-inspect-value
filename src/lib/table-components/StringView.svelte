<script lang="ts">
  import Line from './Line.svelte'

  import { stringify } from '$lib/util.js'

  import type { OptionsContext } from '$lib/options.svelte.js'
  import type { TypeViewProps } from '$lib/types.js'
  import { getContext } from 'svelte'
  import Key from './Key.svelte'
  import Type from './Type.svelte'
  import OneLineView from './OneLineView.svelte'

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
</script>

{#if isMultiLine && stringRender === 'pre'}
  <Line>
    <Key {key} {path} />
    <Type {type} />
  </Line>
  <pre class="value {type} multi" title={stringify(value)}>{value}</pre>
{:else}
  <!-- <Line>
    <Key {key} />
    <Type {type} />
    <span class={`value ${type}`} title={stringify(value)}>
      {stringify(display)}
    </span>
  </Line> -->

  <OneLineView {key} {type} {path} value={stringify(display)} />
{/if}
