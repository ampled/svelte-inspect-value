<script lang="ts">
  import Type from '../components/Type.svelte'
  import type { TypeViewProps } from '../types.js'
  import OneLineView from './OneLineView.svelte'

  type Props = TypeViewProps<unknown>

  let { value, key, type, path }: Props = $props()
</script>

<OneLineView {value} {key} {type} {path}>
  {#snippet val()}
    ⚠️ <Type type="noop" title="no handler for this type" force /> ⚠️
    <span class="value {type}">{(value as object).toString()} </span>
  {/snippet}
</OneLineView>
