<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import ArrayView from './ArrayView.svelte'

  type Props = TypeViewProps<Generator>

  let { value, key = undefined, type, path }: Props = $props()

  let entries = $derived([...value])
</script>

<ArrayView value={entries} {type} {key} {path} />
