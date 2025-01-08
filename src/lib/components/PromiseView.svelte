<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { untrack } from 'svelte'
  import { fade } from 'svelte/transition'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import JsonViewer from './Node.svelte'
  import Preview from './Preview.svelte'

  type Props = TypeViewProps<Promise<unknown>>

  let { value = Promise.resolve(), key, type, path }: Props = $props()

  let status = $state<'pending' | 'fulfilled' | 'rejected'>('pending')
  let result = $state<unknown>(undefined)

  let currentPromise = $state<Promise<unknown>>()

  let entries = $derived(
    Object.entries({
      state: status,
      result: result,
    })
  )

  function handleSuccess(res: unknown, promise: Promise<unknown>) {
    if (promise === value) {
      result = res
      if (status !== 'fulfilled') status = 'fulfilled'
    }
  }

  function handleReject(err: unknown, promise: Promise<unknown>) {
    if (promise === value) {
      result = err
      status = 'rejected'
    }
  }

  function resolvePromise(promise: Promise<unknown>) {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    value
    untrack(() => {
      if (currentPromise !== value) {
        currentPromise = value
        resolvePromise(value)
      }
    })
  })
</script>

<Expandable
  {...{ value, key, type, path }}
  length={entries.length}
  showLength={false}
  keepPreviewOnExpand
>
  {#snippet val()}
    {#key status}
      <span class="value promise {status}" in:fade
        ><span class="bracket">{'<'}</span>{`${status}`}{#if status === 'fulfilled'}
          :<Preview list={[result]} hasMore={false} />
        {/if}<span class="bracket">{'>'}</span>
      </span>
    {/key}
    <!-- {#if result}
      <Preview list={[result]} hasMore={false} />
    {/if} -->
  {/snippet}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <JsonViewer {value} {key} {path} />
    </Entry>
  {/each}
</Expandable>

<style>
  span.value {
    /* width: auto; */
    font-size: 0.857em;
  }

  .bracket {
    color: var(--comments);
  }
</style>
