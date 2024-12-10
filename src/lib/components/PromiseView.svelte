<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { fly, slide } from 'svelte/transition'
  import Entry from './Entry.svelte'
  import JsonViewer from './JsonViewer.svelte'
  import ObjectLikeView from './ObjectLikeView.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<Promise<any>>

  let { value = Promise.resolve(), key, type, path }: Props = $props()

  let status = $state<'pending' | 'fulfilled' | 'rejected'>('pending')
  let result = $state<any>(undefined)

  let entries = $derived(
    Object.entries({
      state: status,
      result: result,
    }).filter(([, value]) => value !== undefined)
  )

  $effect(() => {
    try {
      value
        .then(
          (res) => {
            result = res
            status = 'fulfilled'
          },
          (err) => {
            result = err
            status = 'rejected'
          }
        )
        .catch((err) => {
          result = err
          status = 'rejected'
        })
    } catch (err) {
      result = err
      status = 'rejected'
    }
  })
</script>

<ObjectLikeView {...{ value, key, type, path }} length={entries.length}>
  {#snippet val()}
    {#key status}
      <span class="value promise {status}" in:slide={{ axis: 'y' }}>
        <span style="color: var(--comments)">{'<'}</span>{`${status}`}<span
          style="color: var(--comments)">{'>'}</span
        >
      </span>
    {/key}
  {/snippet}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <JsonViewer {value} {key} {path} />
    </Entry>
  {/each}
</ObjectLikeView>
