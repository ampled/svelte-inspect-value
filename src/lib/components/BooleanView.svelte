<script lang="ts">
  import Type from './Type.svelte'

  import type { TypeViewProps } from '$lib/types.js'
  import Key from './Key.svelte'

  type Props = TypeViewProps<boolean>

  let { value, key, type }: Props = $props()
</script>

<Key {key} />
<Type {type} />
<span class="value {type}">{value}</span>
