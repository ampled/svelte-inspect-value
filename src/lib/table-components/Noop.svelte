<script lang="ts">
  import { stringify } from '$lib/util.js'

  import Key from '$lib/table-components/Key.svelte'
  import Type from '$lib/table-components/Type.svelte'
  import type { TypeViewProps } from '$lib/types.js'
  import ObjectView from './ObjectView.svelte'

  type Props = TypeViewProps<unknown>

  let { value, key, type }: Props = $props()

  let stringified = $derived(stringify(value))

  let display = $derived(stringified !== '{}' ? stringified : (value as any).toString())
</script>

{#if value != null}
  {#if typeof value === 'object'}
    <ObjectView {value} {key} {type} />
  {:else}
    <Key {key} />
    <Type {type} />
    <span class="value {type}">{display} (noop)</span>
  {/if}
{/if}
