<script lang="ts">
  import type { KeyName, TypeViewProps } from '$lib/types.js'
  import { getType, type VType } from '../util.js'
  import ErrorView from './ErrorView.svelte'
  import Noop from './Noop.svelte'
  import components from './types.js'

  type Props = TypeViewProps<any>

  let { value = undefined, key = undefined, path: prevPath = [] }: Props = $props()

  let type: VType = $derived(getType(value))

  let TypeComponent = $derived(components[type] ?? Noop)

  let path = $derived(key && prevPath ? [...prevPath, key] : undefined)

  function onclick(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    event.stopPropagation()
    console.log(`${String(key)}:`, value)
  }

  // $inspect(path, value)
</script>

<svelte:boundary>
  <TypeComponent {value} {key} {type} {path} />

  {#snippet failed(error, reset)}
    {#if error instanceof Error}
      <ErrorView value={error} type="error" {key} />
    {/if}
    <button onclick={reset}>retry</button>
  {/snippet}
</svelte:boundary>
