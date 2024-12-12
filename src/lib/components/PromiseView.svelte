<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { fade } from 'svelte/transition'
  import Entry from './Entry.svelte'
  import JsonViewer from './JsonViewer.svelte'
  import ObjectLikeView from './ObjectLikeView.svelte'

  type Props = TypeViewProps<Promise<unknown>>

  let { value = Promise.resolve(), key, type, path }: Props = $props()

  let status = $state<'pending' | 'fulfilled' | 'rejected'>('pending')
  let result = $state<any>(undefined)

  let entries = $derived(
    Object.entries({
      state: status,
      result: result,
    })
  )

  function handleSuccess(res: unknown, promise: Promise<any>) {
    if (promise === value) {
      result = res
      status = 'fulfilled'
    }
  }

  function handleReject(err: unknown, promise: Promise<any>) {
    if (promise === value) {
      result = err
      status = 'rejected'
    }
  }

  function resolvePromise(promise: Promise<any>) {
    // if (promise !== value) {
    status = 'pending'
    result = undefined
    // }
    try {
      promise
        .then(
          (res) => handleSuccess(res, promise),
          (e) => handleReject(e, promise)
        )
        .catch((e) => handleReject(e, promise))
    } catch (err) {
      handleReject(err, promise)
    }
  }

  $effect(() => {
    resolvePromise(value)
  })
</script>

<ObjectLikeView {...{ value, key, type, path }} length={entries.length}>
  {#snippet val()}
    {#key status}
      <span class="value promise {status}" in:fade>
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

<style>
  span.value {
    width: 7em;
  }
</style>
