<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { useOptions } from '../options.svelte.js'
  import type { TypeViewProps } from '../types.js'
  import Bullet from './Bullet.svelte'

  import Input from './Input.svelte'
  import Select from './Select.svelte'
  import NodeIconButton from './NodeIconButton.svelte'
  import CloseIcon from '$lib/icons/CloseIcon.svelte'
  import Type from './Type.svelte'
  import CheckIcon from './CheckIcon.svelte'

  type Props = TypeViewProps<unknown> & {
    oncancel: () => void
  } & HTMLAttributes<HTMLDivElement>

  let {
    value,
    display,
    key = '',
    keyDelim = ':',
    keyPrefix,
    keyStyle,
    type,
    forceType,
    path,
    length,
    note,
    match,
    children,
    actions,
    onedit,
    oncancel,
    ...rest
  }: Props = $props()

  const options = useOptions()
  const { showLength: _ } = $derived(options.value)

  const newValue = $state({
    key,
    value,
    type,
  })

  function onTypeChange() {
    if (newValue.type === 'undefined') {
      newValue.value = undefined
    } else if (newValue.type === 'null') {
      newValue.value = null
    }
  }

  const transitionParams = { axis: 'x', duration: 0 } as const
</script>

<div data-testid="line" class={['line', match && 'match']} style="padding-right: 0.5em" {...rest}>
  <Bullet {value} />
  <Input
    containerAttrs={{ style: 'flex-basis: 30%' }}
    bind:value={newValue.key}
    {transitionParams}
  />
  <span class="delim">
    {keyDelim}
  </span>
  {#if newValue.type === 'string'}
    <Input
      containerAttrs={{ style: 'flex-basis: 30%' }}
      bind:value={() => newValue.value ?? '', (val) => (newValue.value = val)}
      type="text"
      {transitionParams}
    />
  {:else if newValue.type === 'number'}
    <Input
      containerAttrs={{ style: 'flex-basis: 30%' }}
      bind:value={() => newValue.value ?? 0, (val) => (newValue.value = val)}
      type="number"
      {transitionParams}
    />
  {:else if newValue.type === 'boolean'}
    <input
      type="checkbox"
      bind:checked={() => (typeof newValue.value === 'boolean' ? newValue.value : false),
      (checked) => (newValue.value = checked)}
    />
  {:else if newValue.type === 'undefined' || newValue.type === 'null'}
    <Type type={newValue.type} />
  {/if}
  <Select bind:value={newValue.type} onchange={onTypeChange}>
    <option disabled>type</option>
    <option>string</option>
    <option>number</option>
    <option>bigint</option>
    <option>boolean</option>
    <option>undefined</option>
    <option value="null">null</option>
  </Select>
  <NodeIconButton
    onclick={() => onedit?.(key, value, $state.snapshot(newValue))}
    {transitionParams}
    success
  >
    <CheckIcon />
  </NodeIconButton>
  <NodeIconButton onclick={oncancel} {transitionParams}>
    <CloseIcon />
  </NodeIconButton>
</div>

<style>
  @import './styles/line.css';

  .delim {
    color: var(--_delimiter-color);
    user-select: text;
  }
</style>
