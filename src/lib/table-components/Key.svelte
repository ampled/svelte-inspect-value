<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'

  type Props = {
    key: TypeViewProps<any>['key']
  }

  let { key }: Props = $props()

  let keyType = $derived(typeof key)

  let display = $derived(typeof key === 'symbol' ? key.toString() : key)
</script>

{#if key != null}
  <span><span class="key {keyType}">{display}</span>:</span>
{/if}
