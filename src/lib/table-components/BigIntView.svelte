<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Key from './Key.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<bigint>

  let { value = 1n, key, type }: Props = $props()
</script>

<Key {key} />
<Type {type} />
<span class="value {type}">{value}n</span>
