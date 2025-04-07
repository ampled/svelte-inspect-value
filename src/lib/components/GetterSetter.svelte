<script lang="ts">
  import { tick } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { slide } from 'svelte/transition'
  import { getPreviewLevel, useValueCache } from '../contexts.js'
  import { useOptions } from '../options.svelte.js'
  import { InspectError, type TypeViewProps } from '../types.js'
  import { descriptorPrefix, stringifyPath } from '../util.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import InspectErrorView from './InspectErrorView.svelte'
  import Node from './Node.svelte'
  import NodeActionButton from './NodeActionButton.svelte'
  import Preview from './Preview.svelte'

  type Props = TypeViewProps<unknown, 'get'> & {
    descriptor: PropertyDescriptor
    usedefaults?: boolean
  } & HTMLAttributes<HTMLDivElement>

  let {
    value,
    display,
    key,
    path: prevPath = [],
    descriptor,
    children,
    keyPrefix: _keyPrefix,
    usedefaults,
    ...rest
  }: Props = $props()

  const options = useOptions()
  const previewLevel = getPreviewLevel()
  const valueCache = useValueCache()
  let valueRetrieved = $state(false)
  let getterValue = $state<unknown>()
  let error = $state<InspectError>()
  let isSetting = $state(false)
  let inputText = $state<string>('')
  let inputState = $state<'valid' | 'invalid' | 'untouched'>('untouched')
  let inputValue = $state<unknown>()
  let path = $derived(key != null && prevPath ? [...prevPath, key] : ['root'])
  let keyPrefix = $derived(`${_keyPrefix ?? ''} ${descriptorPrefix(descriptor)}`)
  let inputElement = $state<HTMLInputElement>()
  let setButton = $state<ReturnType<typeof NodeActionButton>>()

  let stringifiedPath = $derived(stringifyPath(path))
  let hasCachedValue = $derived(valueCache.has(stringifiedPath))

  let retrievedValue = $derived(
    valueRetrieved ? getterValue : hasCachedValue ? valueCache.get(stringifiedPath) : undefined
  )

  function callGetter() {
    try {
      valueRetrieved = true
      const newGetterValue = descriptor.get?.call(value)
      getterValue = newGetterValue
      valueCache.set(stringifiedPath, getterValue)
    } catch (e: unknown) {
      valueCache.delete(stringifiedPath)
      error = new InspectError('getter call failed', descriptor.get, { cause: e })
      valueRetrieved = false
    }
  }

  function callSetter() {
    if (inputState === 'valid') {
      try {
        descriptor.set?.call(value, inputValue)
        // stateContext.setGetterValue(path, inputValue)
      } catch (e: unknown) {
        error = new InspectError('setter call failed', descriptor.set, { cause: e })
        // stateContext.setGetterValue(path, undefined)
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
    valueCache.delete(stringifiedPath)
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
    keyDelim={previewLevel > 0 ? '' : ':'}
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
          transition:slide={{ axis: 'x', duration: options.transitionDuration }}
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
        {#if descriptor.set && previewLevel === 0}
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
          {#if previewLevel === 0}
            <NodeActionButton title={`get ${key?.toString()}`} onclick={callGetter}>
              get
            </NodeActionButton>
          {/if}
          <Preview
            showPreview={(hasCachedValue || valueRetrieved) && showPreview}
            singleValue={{ value: retrievedValue }}
            style={previewLevel > 0 ? 'margin-left: -0.5em' : ''}
            bracketStyle="color: var(--_comment-color)"
            showKey={false}
            startLevel={0}
            prefix="("
            postfix=")"
            keyDelim=""
            {path}
          />
        {/if}
      {/if}
    {/snippet}
    <!-- children -->
    {#if descriptor.get}
      <Entry i={0}>
        <Node key="value" value={retrievedValue} {path} {usedefaults} />
      </Entry>
      <Entry i={1}>
        <Node key="getter" value={descriptor.get} {path} {usedefaults} />
      </Entry>
    {/if}
    {#if descriptor.set}
      <Entry i={2}>
        <Node key="setter" value={descriptor.set} {path} {usedefaults} />
      </Entry>
    {/if}
    <!-- /children -->
  </Expandable>
{/if}

<style>
  input {
    height: 1.4em;
    background-color: var(--_background-color);
    color: var(--_text-color);
    outline: 1px solid var(--_border-color);
    border-radius: 2px;

    &.valid {
      outline-color: var(--_button-success-color);
    }

    &.invalid {
      outline-color: var(--_error-color);
    }
  }
</style>
