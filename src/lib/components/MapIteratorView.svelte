<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import MapView from './MapView.svelte'

  type Props = TypeViewProps<MapIterator<any>>

  let { value = new Map().entries(), key = undefined, type, path }: Props = $props()

  let entries = $derived(new Map([...value]))
</script>

<MapView value={entries} {type} {key} {path} />
