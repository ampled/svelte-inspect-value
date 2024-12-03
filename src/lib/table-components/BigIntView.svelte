<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Key from './Key.svelte'
  import OneLineView from './OneLineView.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<bigint>

  let { value = 1n, key, type }: Props = $props()
</script>

<OneLineView {value} {key} {type} />
