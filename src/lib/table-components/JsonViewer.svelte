<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { getType, type VType } from '../util.js'
  import ErrorView from './ErrorView.svelte'
  import Noop from './Noop.svelte'
  import components from './types.js'

  type Props = TypeViewProps<any>

  let { value = undefined, key = undefined }: Props = $props()

  let type: VType = $derived(getType(value))

  let TypeComponent = $derived(components[type] ?? Noop)

  function onclick(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    event.stopPropagation()
    console.log(`${String(key)}:`, value)
  }
</script>

<svelte:boundary>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div style="display: contents">
    <TypeComponent {value} {key} {type} />
  </div>

  {#snippet failed(error, reset)}
    {#if error instanceof Error}
      <ErrorView value={error} type="error" {key} />
    {/if}
    <button onclick={reset}>retry</button>
  {/snippet}
</svelte:boundary>
