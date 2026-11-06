<script lang="ts">
  import { fly, slide } from 'svelte/transition'
  import type { TypingBuffer } from './typingbuffer.svelte.js'
  import SearchIcon from './components/icons/SearchIcon.svelte'
  import { useOptions } from './options.svelte.js'

  type Props = {
    typingBuffer: TypingBuffer
  }

  let { typingBuffer }: Props = $props()
  const options = useOptions()
</script>

{#if typingBuffer.current.length}
  <div
    class="typebuffer"
    transition:fly={{ duration: options.transitionDuration, y: 40, opacity: 0 }}
  >
    <div style="height: 1em; width: 1em; flex-shrink: 0">
      <SearchIcon />
    </div>
    <div style="display: flex">
      {#each typingBuffer.current as c, i (i)}
        <div
          style="color: var(--_text-color); width: 1ch;"
          in:slide={{ axis: 'x', duration: options.transitionDuration }}
        >
          {c}
        </div>
      {/each}{#key typingBuffer.current}<span class="block">▊</span>{/key}
    </div>
  </div>
{/if}

<style>
  .typebuffer {
    display: none;
    position: absolute;
    bottom: 0;
    left: 50%;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5em;
    transform: translate(-50%, 0);
    z-index: 1;
    border: 1px solid var(--_border-color);
    border-bottom: none;
    border-radius: var(--_border-radius) var(--_border-radius) 0 0;
    background-color: var(--_background-color);
    padding: 1ch;
    width: 90%;
    max-width: 360px;
    overflow: clip;
    color: var(--_button-color);
    font-size: 1em;
    line-height: 1;
    text-align: left;

    .block {
      transform-origin: center 150%;
      animation-duration: 250ms;
      animation-timing-function: ease-in;
      animation-iteration-count: 1;
      animation-name: block;
      line-height: 1;
    }
  }

  :global {
    .svelte-inspect-value:focus-within .typebuffer {
      display: flex;
    }
  }
</style>
