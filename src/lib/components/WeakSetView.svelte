<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import OneLineView from './OneLineView.svelte'

  type Props = TypeViewProps<WeakSet<WeakKey>>

  let { value, key, type, path }: Props = $props()

  // let entries = $derived([...value.entries()].map(([_, v]) => v))

  // let preview = $derived(entries.slice(0, 3))
</script>

<OneLineView {...{ value, key, type, path }}>WeakSet</OneLineView>
