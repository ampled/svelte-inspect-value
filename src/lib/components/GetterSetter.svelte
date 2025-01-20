<script lang="ts">
  import { useOptions } from '$lib/options.svelte.js'
  import { descriptorPrefix } from '$lib/util.js'
  import { tick } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { slide } from 'svelte/transition'
  import { InspectError, type TypeViewProps } from '../types.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import InspectErrorView from './InspectErrorView.svelte'
  import Node from './Node.svelte'
  import NodeActionButton from './NodeActionButton.svelte'
  import Preview from './Preview.svelte'

  type Props = TypeViewProps<unknown, 'get'> & {
    descriptor: PropertyDescriptor
  } & HTMLAttributes<HTMLDivElement>

  let { value, display, key, path: prevPath = [], descriptor, children, ...rest }: Props = $props()

  const options = useOptions()
  let valueRetrieved = $state(false)
  let getterValue = $state<unknown>()
  let error = $state<InspectError>()
  let isSetting = $state(false)
  let inputText = $state<string>()
  let inputState = $state<'valid' | 'invalid' | 'untouched'>('untouched')
  let inputValue = $state<unknown>()
  let path = $derived(key != null && prevPath ? [...prevPath, key] : ['root'])
  let keyPrefix = $derived(descriptorPrefix(descriptor))
  let inputElement = $state<HTMLInputElement>()
  let setButton = $state<ReturnType<typeof NodeActionButton>>()

  function callGetter() {
    try {
      getterValue = descriptor.get?.call(value)
      valueRetrieved = true
    } catch (e: unknown) {
      error = new InspectError('getter call failed', descriptor.get, { cause: e })
    }
  }

  function callSetter() {
    if (inputState === 'valid') {
      try {
        descriptor.set?.call(value, inputValue)
      } catch (e: unknown) {
        error = new InspectError('setter call failed', descriptor.set, { cause: e })
      } finally {
        isSetting = false
        inputText = ''
        inputValue = undefined
        inputState = 'untouched'
      }
    } else {
      inputState = 'invalid'
    }
  }

  function reset() {
    error = undefined
    getterValue = undefined
    valueRetrieved = false
  }

  async function onkeyup(event: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) {
    if (event.key === 'Escape') {
      isSetting = false
      inputText = ''
      inputState = 'untouched'
      await tick()
      setButton?.focus()
      return
    }
    if (event.key === 'Enter') {
      callSetter()
    } else {
      const value = event.currentTarget.value
      if (value.length) {
        try {
          inputValue = JSON.parse(value)
          inputState = 'valid'
        } catch {
          inputState = 'invalid'
        }
      } else {
        inputState = 'untouched'
      }
    }
  }
</script>

{#if error}
  <InspectErrorView {keyPrefix} {reset} {key} {path} value={error} />
{:else}
  <Expandable
    {key}
    {keyPrefix}
    {path}
    value={descriptor}
    showLength={false}
    keepPreviewOnExpand
    length={1}
    {...rest}
  >
    {#snippet valuePreview({ showPreview })}
      {#if isSetting}
        <input
          bind:this={inputElement}
          transition:slide={{ axis: 'x', duration: options.value.noanimate ? 0 : 100 }}
          type="text"
          bind:value={inputText}
          class={inputState}
          placeholder="json"
          {onkeyup}
        />
        <NodeActionButton title={`set ${key?.toString()}`} onclick={() => callSetter()}>
          set
        </NodeActionButton>
        <NodeActionButton
          title={`cancel`}
          onclick={async () => {
            isSetting = false
            await tick()
            setButton?.focus()
          }}
          >x
        </NodeActionButton>
      {:else}
        {#if descriptor.set}
          <NodeActionButton
            bind:this={setButton}
            title={`set ${key?.toString()}`}
            onclick={async () => {
              isSetting = true
              await tick()
              inputElement?.focus()
            }}
          >
            set
          </NodeActionButton>
        {/if}
        {#if descriptor.get}
          <NodeActionButton title={`get ${key?.toString()} value`} onclick={callGetter}>
            get
          </NodeActionButton>
          <Preview
            showPreview={valueRetrieved && showPreview}
            singleValue={getterValue}
            prefix="("
            postfix=")"
            hasMore={false}
          />
        {/if}
      {/if}
    {/snippet}
    {#if descriptor.get}
      <Entry i={0}>
        <Node key="value" value={getterValue} {path} />
      </Entry>
      <Entry i={1}>
        <Node key="getter" value={descriptor.get} {path} />
      </Entry>
    {/if}
    {#if descriptor.set}
      <Entry i={3}>
        <Node key="setter" value={descriptor.set} {path} />
      </Entry>
    {/if}
  </Expandable>
{/if}

<style>
  input {
    height: 1.4em;
    background-color: var(--bg);
    color: var(--fg);
    outline: 1px solid var(--border-color);
    border-radius: 2px;

    &.valid {
      outline-color: var(--green);
    }

    &.invalid {
      outline-color: var(--red);
    }
  }
</style>
