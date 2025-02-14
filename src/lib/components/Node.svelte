<script lang="ts">
  // eslint-disable @typescript-eslint/no-explicit-any
  import type { Component } from 'svelte'
  import { useOptions } from '../options.svelte.js'
  import { InspectError, type CustomComponents, type TypeViewProps } from '../types.js'
  import { getType, type ValueType } from '../util.js'
  import Default from './Default.svelte'
  import HtmlView from './HTMLView.svelte'
  import { getComponent, getDefaultComponent } from './index.js'
  import InspectErrorView from './InspectErrorView.svelte'

  type Props = TypeViewProps<unknown> & { usedefaults?: boolean }

  let {
    value = undefined,
    key,
    keyDelim = ':',
    path: prevPath = [],
    usedefaults = false,
    ...rest
  }: Props = $props()

  const options = useOptions()

  let type: ValueType = $derived(getType(value))

  function getTypeComponent(
    type: ValueType,
    custom: CustomComponents,
    useDefaults: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): [Component<TypeViewProps<any>>, Partial<TypeViewProps>] {
    let entry = getComponent(type, useDefaults ? {} : custom)

    if (entry) {
      let [component, propfn, predicate] = entry
      let props = propfn ? propfn({ value }) : {}
      if (predicate) {
        const use = predicate({ value, key, type, ...rest })
        if (!use) {
          const [component, propfn] = getDefaultComponent(type)
          const props = propfn ? propfn({ value }) : {}
          return [component, props]
        }
      }

      return [component, props] as const
    } else if (type.startsWith('html')) {
      return [HtmlView, {}] as const
    }

    return [Default, {}] as const
  }

  let [TypeComponent, componentProps] = $derived(
    getTypeComponent(type, options.value.customComponents, usedefaults)
  )
  let path = $derived(key != null && prevPath ? [...prevPath, key] : ['root'])

  // function babababababababababba(error: unknown, reset: () => void): void {
  //   debugger
  // }
</script>

<svelte:boundary onerror={(e) => console.error(e)}>
  {#if typeof TypeComponent === 'function'}
    <TypeComponent {value} {key} {keyDelim} {type} {path} {...rest} {...componentProps} />
  {/if}

  {#snippet failed(error, reset)}
    {@const inspectError = new InspectError(`Component for value of type ${type} failed`, value, {
      cause: error,
    })}

    <InspectErrorView value={inspectError} {key} {path} {reset} />
  {/snippet}
</svelte:boundary>
