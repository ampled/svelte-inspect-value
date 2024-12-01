<script lang="ts">
  import { stringify } from '$lib/util.js'

  import Key from '$lib/table-components/Key.svelte'
  import Type from '$lib/table-components/Type.svelte'
  import type { TypeViewProps } from '$lib/types.js'

  type Props = TypeViewProps<unknown>

  let { value, key, type }: Props = $props()
</script>

<Key {key} />
<Type {type} />
<span class="value {type}">{stringify(value)}</span>
