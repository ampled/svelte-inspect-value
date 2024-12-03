<script lang="ts">
  import type { Snippet } from 'svelte'
  import CollapseButton from './CollapseButton.svelte'
  import Entries from './Entries.svelte'

  import Type from './Type.svelte'
  import Key from './Key.svelte'
  import type { VType } from '$lib/util.js'
  import type { KeyName } from '$lib/types.js'

  type Props = {
    collapsed: boolean
    key?: KeyName
    path?: KeyName[]
    length: number
    type?: VType
    val?: Snippet
  }

  let { key, collapsed = $bindable(false), type, length, val: value, path }: Props = $props()
</script>

<div class="title-bar">
  <div class="button-key">
    <CollapseButton
      bind:collapsed
      disabled={length === 0}
      style="opacity: {length > 0 ? 1 : 0.4}"
    />
    <Key {key} />
  </div>

  <Type {type} />

  {#if value}
    {@render value()}
  {/if}
  <Entries {length} />
</div>

<style>
  .button-key {
    display: inline-flex;
    align-items: center;
  }

  .title-bar {
    width: 100%;
    border-color: var(--base03, gray);
    border-bottom-width: 0px;
    border-right-width: 0;
    border-top-width: 0;
    border-left-width: 0;
    border-style: solid;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5em;
    margin-left: -1em;
    width: calc(100% + 1em);

    &:hover {
      background-color: var(--base01);
    }
  }
</style>
