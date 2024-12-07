<script lang="ts">
  import type { KeyName, TypeViewProps } from '$lib/types.js'
  import { getType, type ValueType } from '../util.js'
  import ErrorView from './ErrorView.svelte'
  import Noop from './Noop.svelte'
  import components from './types.js'

  type Props = TypeViewProps<any>

  let { value = undefined, key = 'root', path: prevPath = [] }: Props = $props()

  let type: ValueType = $derived(getType(value))

  function getTypeComponent(type: ValueType) {
    let component = components[type]

    if (!component && type.startsWith('html')) {
      component = components['html']
    }

    if (!component) {
      return Noop
    }

    return component
  }

  let TypeComponent = $derived(getTypeComponent(type))

  let path = $derived(key != null && prevPath ? [...prevPath, key] : undefined)

  function onclick(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    event.stopPropagation()
    console.log(`${String(key)}:`, value)
  }

  // $inspect({ value, type })
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
