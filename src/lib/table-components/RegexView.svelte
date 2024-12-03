<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Key from './Key.svelte'
  import OneLineView from './OneLineView.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<RegExp>

  let { value = /a/, key, type }: Props = $props()
</script>

<OneLineView {key} {type} value={value.toString()} />
