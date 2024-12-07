<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import OneLineView from './OneLineView.svelte'

  type Props = TypeViewProps<number>

  let { value = 0, key, type, path }: Props = $props()

  let display = $derived.by(() => {
    if (Number.isNaN(value)) {
      return 'NaN'
    } else if (value === Infinity) {
      return 'Infinity'
    }
    return value
  })
</script>

<OneLineView display={value.toString()} {value} {key} {type} {path} />
