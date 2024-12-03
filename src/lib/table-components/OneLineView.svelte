<script lang="ts">
  import Line from './Line.svelte'
  import Key from './Key.svelte'
  import type { TypeViewProps } from '$lib/types.js'
  import Type from './Type.svelte'

  type Props = TypeViewProps<any>

  let { value, key, type, path }: Props = $props()
</script>

<Line>
  <Key {key} {path} />
  <Type {type} />
  <span class={`value ${type}`}>{value}</span>
</Line>
