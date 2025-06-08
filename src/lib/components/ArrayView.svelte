<script lang="ts">
  import AddPropertyIcon from '$lib/icons/AddPropertyIcon.svelte'
  import CircleSolid from '$lib/icons/CircleSolid.svelte'
  import { getPreviewLevel } from '../contexts.js'
  import DeleteIcon from '../icons/DeleteIcon.svelte'
  import MoveDownIcon from '../icons/MoveDownIcon.svelte'
  import MoveUpIcon from '../icons/MoveUpIcon.svelte'
  import type { NodeAction, TypeViewProps } from '../types.js'
  import { getAllProperties } from '../util.js'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'
  import Preview from './Preview.svelte'
  import PropertyList from './PropertyList.svelte'

  type Props = TypeViewProps<unknown[]>

  let { value: array = [], path, type, showKey, actions = [], ...rest }: Props = $props()

  const previewLevel = getPreviewLevel()

  let otherprops = $derived(
    getAllProperties(array).filter((prop) => {
      if (typeof prop === 'string') {
        return /\d+/.test(prop) === false && prop !== 'length'
      }
      return true
    })
  )

  let keys = $derived([...array.keys(), ...otherprops])

  $inspect(keys)

  const childActions: NodeAction[] = [
    {
      title: 'duplicate',
      icon: CircleSolid,
      shouldShow: (_, key) => typeof key === 'number',
      action: (value) => {
        const clone = window.structuredClone<unknown>($state.snapshot(value))

        if (clone && typeof clone === 'object' && 'id' in clone) {
          clone.id = 100 + keys.length
        }

        array.push(clone)
      },
    },
    {
      title: 'remove from array',
      icon: DeleteIcon,
      shouldShow: (_, key) => typeof key === 'number',
      action: (_, key) => {
        array.splice(key as number, 1)
      },
    },
    {
      title: 'move up in array',
      icon: MoveUpIcon,
      shouldShow: (_, key) => typeof key === 'number' && key !== 0,
      action: (_, key) => {
        var element = array[key as number]
        array.splice(key as number, 1)
        array.splice((key as number) - 1, 0, element)
      },
    },
    {
      title: 'move down in array',
      icon: MoveDownIcon,
      shouldShow: (_, key) => typeof key === 'number' && key !== array.length - 1,
      action: (_, key) => {
        var element = array[key as number]
        array.splice(key as number, 1)
        array.splice((key as number) + 1, 0, element)
      },
    },
  ]

  function onedit(
    originalKey: unknown,
    _originalValue: unknown,
    newValue: { key: unknown; value: unknown; type: unknown }
  ): void {
    if ((newValue.key as PropertyKey) in array) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(array as any)[newValue.key as any] = newValue.value // overwrite value
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (array as any)[originalKey as any]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(array as any)[newValue.key as any] = newValue.value // overwrite value
    }
  }
</script>

<Expandable
  value={array}
  length={array.length}
  {type}
  {path}
  showKey={showKey && previewLevel === 0}
  actions={[
    ...actions,
    {
      title: 'add element',
      icon: AddPropertyIcon,
      shouldShow: () => true,
      action: () => {
        array.push('new value')
      },
    },
  ]}
  {...rest}
>
  {#snippet valuePreview({ showPreview })}
    <Preview {path} list={array} prefix={'['} postfix={']'} {showPreview} showKey={false} />
  {/snippet}

  <PropertyList value={array} {type} {keys}>
    {#snippet item({ key })}
      <Node value={array?.[key as number]} {key} {path} actions={childActions} {onedit} />
    {/snippet}
  </PropertyList>
</Expandable>
