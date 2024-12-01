<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { slide } from 'svelte/transition'
  import JsonViewer from './JsonViewer.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<object>

  let { value = {}, key = undefined, type }: Props = $props()

  let entries: [string | symbol, any][] = $derived(
    // @ts-expect-error
    Reflect.ownKeys(value).map((key) => [key, value[key]])
  )

  let collapsed = $state(false)
</script>

{#if key != null}
  <TitleBar {key} {type} length={entries.length} bind:collapsed />
{/if}
{#if !collapsed}
  <div
    class="indent"
    out:slide|global={{ duration: 300, delay: 1000 }}
    in:slide|global={{ duration: 300 }}
  >
    {#each entries as [key, value], i (key)}
      <div
        class="entry"
        out:slide|global={{ axis: 'x', delay: 20 * i }}
        in:slide|global={{ axis: 'x', delay: 30 * i }}
      >
        <JsonViewer {value} {key} />
      </div>
    {/each}
  </div>
{/if}
