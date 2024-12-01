<script lang="ts">
  import Type from './Type.svelte'

  import type { TypeViewProps } from '$lib/types.js'
  import Key from './Key.svelte'

  type Props = TypeViewProps<symbol>

  let { value = Symbol('oop'), key, type }: Props = $props()
</script>

<Key {key} />
<Type {type} />
<span class="value {type}">
  {value.description}
</span>
