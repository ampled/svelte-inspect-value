<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import OneLineView from './OneLineView.svelte'

  type Props = TypeViewProps<symbol>

  let { value = Symbol(''), key, type }: Props = $props()
</script>

<OneLineView {key} {type} {value} display={value.toString()} />
