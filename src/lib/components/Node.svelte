<script lang="ts">
  import { useOptions } from '../options.svelte.js'
  import { InspectError, type CustomComponents, type TypeViewProps } from '../types.js'
  import { getType, type ValueType } from '../util.js'
  import HtmlView from './HTMLView.svelte'
  import InspectErrorView from './InspectErrorView.svelte'
  import Noop from './Noop.svelte'
  import { getComponent } from './types.js'

  type Props = TypeViewProps<unknown> & { usedefaults?: boolean }

  let { value = undefined, key, path: prevPath = [], usedefaults = false }: Props = $props()

  let options = useOptions()

  let type: ValueType = $derived(getType(value))

  function getTypeComponent(type: ValueType, custom: CustomComponents, useDefaults: boolean) {
    let entry = getComponent(type, useDefaults ? {} : custom)

    if (entry) {
      let [component, propfn] = entry
      let props = propfn ? propfn({ value }) : {}
      return [component, props] as const
    } else if (type.startsWith('html')) {
      return [HtmlView, {}] as const
    }

    return [Noop, {}] as const
  }

  let [TypeComponent, componentProps] = $derived(
    getTypeComponent(type, options.value.customComponents, usedefaults)
  )
  let path = $derived(key != null && prevPath ? [...prevPath, key] : ['root'])
</script>

<svelte:boundary>
  <TypeComponent {value} {key} {type} {path} {...componentProps} />

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
