<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import OneLineView from './OneLineView.svelte'

  type Props = TypeViewProps<bigint>

  let { value = 1n, key, type }: Props = $props()

  let display = $derived(value.toString() + 'n')
</script>

<OneLineView value={display} {key} {type} />
