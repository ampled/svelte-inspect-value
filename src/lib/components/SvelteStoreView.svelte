<script lang="ts">
  import { type Readable, type Writable } from 'svelte/store'
  import type { TypeViewProps } from '../types.js'
  import { getAllProperties, type ValueType } from '../util.js'
  import Expandable from './Expandable.svelte'
  import GetterSetter from './GetterSetter.svelte'
  import Node from './Node.svelte'
  import ObjectView from './ObjectView.svelte'
  import Preview from './Preview.svelte'
  import PropertyList from './PropertyList.svelte'

  type Props = TypeViewProps<Readable<unknown> | Writable<unknown>>

  let { value, key = undefined, type, path = [], ...rest }: Props = $props()

  const valueKey = Symbol('store-value')

  let namedConstructor = $derived(
    value.constructor.name !== 'Object' ? value.constructor.name : false
  )

  let storeType = $derived(
    typeof (value as Writable<unknown>).set === 'function' ? 'writable' : 'readable'
  )
  let valueType = $derived(namedConstructor ? (namedConstructor as ValueType) : storeType)
  let keys = $derived([valueKey, ...getAllProperties(value)])

  let validStore = $derived.by(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const subscriber = value.subscribe(() => void 0) as any
      if (typeof subscriber === 'function') {
        subscriber()
        return true
      } else if (typeof subscriber === 'object' && typeof subscriber.unsubscribe === 'function') {
        subscriber.unsubscribe()
        return true
      } else {
        return false
      }
    } catch {
      return false
    }
  })
</script>

{#if validStore}
  <Expandable type={valueType} length={keys.length} {key} {path} {value} {...rest}>
    {#snippet valuePreview({ showPreview })}
      <Preview
        style="margin-left: -0.5em"
        showKey={false}
        singleValue={{ value: $value }}
        prefix="("
        postfix=")"
        startLevel={0}
        bracketStyle="color: var(--_comment-color)"
        {showPreview}
      />
    {/snippet}
    <PropertyList {keys} {value} {type}>
      {#snippet item({ key, descriptor })}
        {#if descriptor?.get || descriptor?.set}
          <GetterSetter {value} {descriptor} {key} {path} />
        {:else if key === valueKey}
          <Node
            key="value"
            keyPrefix="$"
            keyStyle="--_text-color: var(--_comment-color); gap: 0;"
            value={$value}
            path={[...path, Symbol('$')]}
          />
        {:else}
          <Node value={value[key as keyof typeof value]} {key} {path} />
        {/if}
      {/snippet}
    </PropertyList>
  </Expandable>
{:else}
  <ObjectView
    note={{
      title: 'invalid store',
      description:
        'subscribe function did not return a valid subscriber.\nreverted to default object view.',
    }}
    {value}
    {key}
    type="object"
    {path}
    {...rest}
  />
{/if}
