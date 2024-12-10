<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import ArrayView from './ArrayView.svelte'

  type Props = TypeViewProps<ArrayIterator<any> | SetIterator<any>>

  let { value = [].values(), key = undefined, type, path }: Props = $props()

  let entries = $derived([...value].map(([, v]) => v))
</script>

<ArrayView value={entries} {type} {key} {path} />
