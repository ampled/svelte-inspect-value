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

  const paging = 50
  let max = $state(paging)

  let slicedKeys = $derived(keys.length > max ? keys.slice(0, max) : keys)
</script>

{#each slicedKeys as key, index (key)}
  <Entry i={index}>
    {@render item({
      key,
      index,
      descriptor: getPropertyDescriptor(value, key as PropertyKey),
    })}
  </Entry>
{/each}
{#if slicedKeys.length < keys.length}
  <NodeActionButton
    style="margin-left: 2em; text-align: center; margin-bottom: 0.5em; width: calc(100% - 5em)"
    onclick={() => {
      max += paging
    }}>{Math.abs(max - keys.length)} more</NodeActionButton
  >
{/if}
