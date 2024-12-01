<script lang="ts">
  import type { OptionsContext } from '$lib/options.svelte.js'
  import type { TypeViewProps } from '$lib/types.js'
  import { getContext } from 'svelte'
  import Key from './Key.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<string>

  let { value = '', key, type }: Props = $props()

  const options: OptionsContext = getContext('json-inspect')

  let { stringCollapse } = $derived(options.value)

  let display = $derived(
    stringCollapse < value.length ? value.slice(0, stringCollapse).trimEnd() : value
  )

  let collapsed = $derived(stringCollapse < value.length)
</script>

<Key {key} />
<Type {type} />
<span class={`value ${type}`} title={value}>
  &quot;{display}{#if collapsed}&hellip;{/if}&quot;
</span>
