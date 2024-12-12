<script lang="ts">
  import { useOptions } from '$lib/options.svelte.js'
  import { InspectError, type KeyName, type TypeViewProps } from '$lib/types.js'
  import { getType, type ValueType } from '../util.js'
  import InspectErrorView from './InspectErrorView.svelte'
  import Noop from './Noop.svelte'
  import components from './types.js'

  type Props = TypeViewProps<any> & { usedefaults?: boolean }

  let {
    value = undefined,
    key = 'root',
    path: prevPath = [],
    usedefaults = false,
  }: Props = $props()

  let { customComponents } = $derived(useOptions())

  let type: ValueType = $derived(getType(value))

  function getTypeComponent(type: ValueType, custom: any, useDefaults: boolean) {
    let comps = { ...components, ...(usedefaults ? {} : custom) }

    let component = comps[type]

    if (!component && type.startsWith('html')) {
      component = comps['html']
    }

    if (!component) {
      return Noop
    }

    return component
  }

  let TypeComponent = $derived(getTypeComponent(type, customComponents, usedefaults))

  // $inspect(TypeComponent)

  let path = $derived(key != null && prevPath ? [...prevPath, key] : undefined)

  // $inspect(path)

  function onclick(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    event.stopPropagation()
    console.log(`${String(key)}:`, value)
  }

  // $inspect({ value, type })
</script>

<svelte:boundary>
  <TypeComponent {value} {key} {type} {path} />

  {#snippet failed(error, reset)}
    {@const inspectError = new InspectError(
      `InspectError: Component for value of type ${type} failed`,
      value,
      {
        cause: error,
      }
    )}

    <InspectErrorView value={inspectError} {key} {path} {reset} />
  {/snippet}
</svelte:boundary>
