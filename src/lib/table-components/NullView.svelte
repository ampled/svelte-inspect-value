<script lang="ts">
  import Type from './Type.svelte'

  import Key from './Key.svelte'

  import type { TypeViewProps } from '$lib/types.js'
  import { stringify } from '$lib/util.js'

  type Props = TypeViewProps<null>

  let { key, type }: Props = $props()
</script>

<Key {key} />
<Type {type} />
