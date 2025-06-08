<script lang="ts">
  import type { NodeAction, TypeViewProps } from '../types.js'
  import { getAllProperties, type ValueType } from '../util.js'
  import Expandable from './Expandable.svelte'
  import GetterSetter from './GetterSetter.svelte'
  import Node from './Node.svelte'
  import Preview from './Preview.svelte'
  import PropertyList from './PropertyList.svelte'
  import DeleteIcon from '$lib/icons/DeleteIcon.svelte'
  import AddPropertyIcon from '$lib/icons/AddPropertyIcon.svelte'

  type Props = TypeViewProps<object>

  let { value: object, key = undefined, type, path, actions = [], ...rest }: Props = $props()

  let value = $state<object | undefined>(object)

  let namedConstructor = $derived(
    value?.constructor.name !== 'Object' ? value?.constructor.name : false
  )

  let objectType = $derived(namedConstructor ? (namedConstructor as ValueType) : type)
  let keys = $derived(
    [
      ...getAllProperties(value).filter(
        (p) => !['constructor', 'prototype'].includes(p.toString())
      ),
      namedConstructor ? 'constructor' : undefined,
    ].filter((v) => v != null)
  )

  const childActions: NodeAction[] = [
    {
      title: 'remove from object',
      icon: DeleteIcon,
      shouldShow: (_, key) => value && key in value,
      action: (_, key) => {
        if (value) delete value[key as keyof typeof value]
      },
    },
  ]

  function onedit(
    oldKey: PropertyKey,
    _originalValue: unknown,
    newValue: { key: PropertyKey; value: unknown; type: unknown }
  ): void {
    const { key: newKey, value: newVal } = newValue

    if (newKey === oldKey) {
      Object.defineProperty(object, oldKey, { value: newVal })
    } else {
      Object.defineProperty(
        object,
        newKey,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { ...Object.getOwnPropertyDescriptor(object as any, oldKey as any)! }
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (object as any)[oldKey]
    }

    value = undefined
    value = object

    // if ((newValue.key as PropertyKey) in value) {
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   ;(value as any)[newValue.key as any] = newValue.value // overwrite value
    // } else {
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   delete (value as any)[originalKey as any]
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   ;(value as any)[newValue.key as any] = newValue.value // overwrite value
    // }
  }
</script>

<Expandable
  type={objectType}
  length={keys.length}
  {key}
  {path}
  {value}
  actions={[
    ...actions,
    {
      title: 'add property',
      icon: AddPropertyIcon,
      shouldShow: () => Object.isExtensible(object),
      action: () => {
        Object.defineProperty(object, `property${keys.length}`, { value: 'New value' })
        value = undefined
        value = object
      },
    },
  ]}
  forceType={!!namedConstructor}
  {...rest}
>
  {#snippet valuePreview({ showPreview })}
    <Preview
      prefix={'{'}
      postfix={'}'}
      value={value as Record<string | symbol, unknown>}
      {path}
      {keys}
      {showPreview}
    />
  {/snippet}
  <PropertyList {keys} {value} {type}>
    {#snippet item({ key, descriptor })}
      {#if descriptor?.get || descriptor?.set}
        <GetterSetter {value} {descriptor} {key} {path} />
      {:else}
        <Node
          value={value?.[key as keyof typeof value]}
          {key}
          {path}
          actions={childActions}
          {onedit}
        />
      {/if}
    {/snippet}
  </PropertyList>
</Expandable>
