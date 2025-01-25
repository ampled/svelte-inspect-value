<script lang="ts">
  import { setContext, type ComponentProps } from 'svelte'
  import { slide } from 'svelte/transition'
  import Code from '../Code.svelte'

  type Props = {
    examples: ComponentProps<typeof Code>[]
  }

  let { examples }: Props = $props()

  let currentLabel = $state(examples[0].label)
  let currentExample = $derived(examples.find((ex) => ex.label === currentLabel))

  setContext('multi', true)
</script>

<div class="examples">
  <div class="tabs">
    {#each examples as { label } (label)}
      <button class:active={currentLabel === label} onclick={() => (currentLabel = label)}
        >{label}</button
      >
    {/each}
  </div>
  {#if currentExample}
    {#key currentExample}
      <div transition:slide>
        <Code {...currentExample} />
      </div>
    {/key}
  {/if}
</div>

<style>
  button {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: none;
    background-color: #282c34;
    z-index: 9999;
  }

  button.active {
    border-bottom: none;
    background-color: var(--border-color);
  }

  .tabs {
    /* background-color: rgba(0 0 0 / 0.1); */
    width: 100%;
  }
</style>
