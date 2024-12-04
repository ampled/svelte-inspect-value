<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'

  type Props = {
    key: TypeViewProps<any>['key']
    path?: TypeViewProps<any>['path']
  }

  let { key, path = [] }: Props = $props()

  let keyType = $derived(typeof key)

  let display = $derived(typeof key === 'symbol' ? key.toString() : key)

  let stringPath = $derived(path.map((k) => k.toString()).join('.'))
</script>

{#if key != null}
  <span class="border-left"
    ><span title={stringPath} class="key {keyType}">{display}</span><span class="delim">:</span
    ></span
  >
{/if}

<style>
  .border-left {
    border-left: 0px solid white;
  }

  .delim {
    color: var(--delimiter);
  }
</style>
