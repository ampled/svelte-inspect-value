<script lang="ts">
  import Line from './Line.svelte'

  import { stringify } from '$lib/util.js'

  import Key from '$lib/table-components/Key.svelte'
  import Type from '$lib/table-components/Type.svelte'
  import type { TypeViewProps } from '$lib/types.js'
  import ObjectView from './ObjectView.svelte'

  type Props = TypeViewProps<unknown>

  let { value, key, type }: Props = $props()

  let stringified = $derived(stringify(value))

  let display = $derived(stringified !== '{}' ? stringified : (value as any).toString())
</script>

<Line>
  <Key {key} />
  <Type {type} />
  <Type type="noop" title="no handler for this type" />
  <span class="value {type}">{(value as any).toString()} </span>
</Line>
