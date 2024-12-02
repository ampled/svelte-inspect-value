<script lang="ts">
  import { stringify } from '$lib/util.js'

  import type { OptionsContext } from '$lib/options.svelte.js'
  import type { TypeViewProps } from '$lib/types.js'
  import { getContext } from 'svelte'
  import Key from './Key.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<string>

  let { value = '', key, type }: Props = $props()

  const options: OptionsContext = getContext('json-inspect')

  let { stringCollapse, stringRender } = $derived(options.value)

  let isMultiLine = $derived(value.includes('\n'))

  let display = $derived(
    stringCollapse && stringCollapse < value.length
      ? value.slice(0, stringCollapse).trimEnd() + '…'
      : value
  )
</script>

<Key {key} />
<Type {type} />
{#if isMultiLine && stringRender === 'pre'}
  <pre class="value {type} multi" title={stringify(value)}>{value}</pre>
{:else}
  <span class={`value ${type}`} title={stringify(value)}>
    {stringify(display)}
  </span>
{/if}
