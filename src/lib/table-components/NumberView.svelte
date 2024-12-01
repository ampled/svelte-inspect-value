<script lang="ts">
  import Key from './Key.svelte'

  import type { TypeViewProps } from '$lib/types.js'
  import { stringify } from '$lib/util.js'
  import Type from './Type.svelte'

  type Props = TypeViewProps<number>

  let { value = 0, key, type }: Props = $props()

  let display = $derived.by(() => {
    if (Number.isNaN(value)) {
      return 'NaN'
    } else if (value === Infinity) {
      return 'Infinity'
    }
    return value
  })
</script>

<Key {key} />
<Type {type} />
<span class={`value ${type}`}>{display}</span>
