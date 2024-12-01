<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  // import { stringify } from '$lib/util.js'
  import Key from './Key.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<undefined>

  let { key, type }: Props = $props()
</script>

<Key {key} />
<Type {type} />
