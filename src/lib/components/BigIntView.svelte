<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import OneLineView from './OneLineView.svelte'

  type Props = TypeViewProps<bigint>

  let { value = 1n, ...rest }: Props = $props()

  let display = $derived(value.toString() + 'n')
</script>

<OneLineView {value} {display} {...rest} />
