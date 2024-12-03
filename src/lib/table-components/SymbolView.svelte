<script lang="ts">
  import Type from './Type.svelte'

  import type { TypeViewProps } from '$lib/types.js'
  import Key from './Key.svelte'
  import OneLineView from './OneLineView.svelte'

  type Props = TypeViewProps<symbol>

  let { value = Symbol('oop'), key, type }: Props = $props()
</script>

<OneLineView {key} {type} value={value.toString()} />
