<script lang="ts">
  import Type from '$lib/components/Type.svelte'
  import type { TypeViewProps } from '$lib/types.js'
  import OneLineView from './OneLineView.svelte'

  type Props = TypeViewProps<unknown>

  let { value, key, type, path }: Props = $props()
</script>

<OneLineView {value} {key} {type} {path}>
  {#snippet val()}
    <Type type="noop" title="no handler for this type" />
    <span class="value {type}">{(value as any).toString()} </span>
  {/snippet}
</OneLineView>
