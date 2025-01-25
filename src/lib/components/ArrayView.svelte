<script lang="ts">
  import { getAllProperties } from '$lib/util.js'
  import type { TypeViewProps } from '../types.js'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'
  import Preview from './Preview.svelte'
  import PropertyList from './PropertyList.svelte'

  type Props = TypeViewProps<unknown[]>

  let { value: array = [], path, type, ...rest }: Props = $props()

  let otherprops = $derived(
    getAllProperties(array).filter((prop) => {
      if (typeof prop === 'string') {
        return /\d+/.test(prop) === false && prop !== 'length'
      }
      return true
    })
  )

  let keys = $derived([...array.keys(), ...otherprops])
</script>

<Expandable value={array} length={array.length} {type} {path} {...rest}>
  {#snippet valuePreview({ showPreview })}
    <Preview {path} list={array} prefix={'['} postfix={']'} {showPreview} showKey={false} />
  {/snippet}

  <PropertyList value={array} {type} {keys}>
    {#snippet item({ key })}
      <Node value={array[key as number]} {key} {path} />
    {/snippet}
  </PropertyList>
</Expandable>
