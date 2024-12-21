<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { fade } from 'svelte/transition'
  import Entry from './Entry.svelte'
  import JsonViewer from './Node.svelte'
  import ObjectLikeView from './ObjectLikeView.svelte'
  import { untrack } from 'svelte'

  type Props = TypeViewProps<Promise<unknown>>

  let { value = Promise.resolve(), key, type, path }: Props = $props()

  let status = $state<'pending' | 'fulfilled' | 'rejected'>('pending')
  let result = $state<any>(undefined)

  let currentPromise = $state<Promise<unknown>>()

  let entries = $derived(
    Object.entries({
      state: status,
      result: result,
    })
  )

  function handleSuccess(res: unknown, promise: Promise<any>) {
    if (promise === value) {
      result = res
      if (status !== 'fulfilled') status = 'fulfilled'
    }
  }

  function handleReject(err: unknown, promise: Promise<any>) {
    if (promise === value) {
      result = err
      status = 'rejected'
    }
  }

  function resolvePromise(promise: Promise<any>) {
    status = 'pending'
    result = undefined
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
    value
    untrack(() => {
      if (currentPromise !== value) {
        currentPromise = value
        resolvePromise(value)
      }
    })
  })
</script>

<ObjectLikeView {...{ value, key, type, path }} length={entries.length}>
  {#snippet val()}
    {#key status}
      <span class="value promise {status}" in:fade>
        <span class="bracket">{'<'}</span>{`${status}`}<span class="bracket">{'>'}</span>
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

  .bracket {
    color: var(--comments);
  }
</style>
