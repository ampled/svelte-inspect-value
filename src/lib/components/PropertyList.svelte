<script lang="ts" generics="T, Key = T extends Map<unknown, unknown> ? unknown : keyof T">
  import type { ValueType } from '$lib/util.js'
  import type { Snippet } from 'svelte'
  import Entry from './Entry.svelte'

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
</script>

{#each keys as key, index (key)}
  <Entry i={index}>
    {@render item({
      key,
      index,
      descriptor: Object.getOwnPropertyDescriptor(value, key as string | number | symbol),
    })}
  </Entry>
{/each}
