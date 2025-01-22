<script lang="ts" generics="T, Key = T extends Map<unknown, unknown> ? unknown : keyof T">
  import { getPropertyDescriptor, type ValueType } from '$lib/util.js'
  import type { Snippet } from 'svelte'
  import Entry from './Entry.svelte'
  import NodeActionButton from './NodeActionButton.svelte'

  type PreviewProps = {
    value: T
    type?: ValueType
    keys?: Key[]
    item: Snippet<
      [
        {
          key: Key
          index: number
          descriptor?: PropertyDescriptor
        },
      ]
    >
  }

  let { value, keys = [], item }: PreviewProps = $props()

  // function paginate(array: unknown[], page_size: number, page_number: number) {
  //   // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  //   return array.slice((page_number - 1) * page_size, page_number * page_size)
  // }

  const paging = 50
  let max = $state(paging)

  let slicedKeys = $derived(keys.length > max ? keys.slice(0, max) : keys)
</script>

{#each slicedKeys as key, index (key)}
  <Entry i={index}>
    {@render item({
      key,
      index,
      descriptor: getPropertyDescriptor(value, key as string | number | symbol),
    })}
  </Entry>
{/each}
{#if slicedKeys.length < keys.length}
  <NodeActionButton
    style="margin-left: 1em; margin-right: 1em; text-align: center; width: 100%;"
    onclick={() => {
      max += paging
    }}>{Math.abs(max - keys.length)} more</NodeActionButton
  >
{/if}
