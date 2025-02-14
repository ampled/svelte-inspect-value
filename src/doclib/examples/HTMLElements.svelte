<script lang="ts">
  import { Inspect } from '$lib/index.js'
  import { getContext } from 'svelte'
  import type { SvelteMap } from 'svelte/reactivity'
  // import * as w from 'svelte/reactivity/window'

  let div = $state()
  // let activeElement: Element | null = $state(null)

  let width = $state(500)
  let classes = $state('radius')
  let testid = $state('demo-div')

  // const _window = $derived(
  //   Object.fromEntries(
  //     Object.entries(w).map(([key, p]) => {
  //       if (typeof p === 'string') {
  //         return [key, p]
  //       } else {
  //         return [key, p.current]
  //       }
  //     })
  //   )
  // )

  getContext<SvelteMap<string, string>>('toc')?.set('HTML Elements', 'html')

  let group = $state<'simple' | 'full'>('simple')
</script>

<!-- <svelte:document bind:activeElement /> -->

<div class="flex col">
  <h3 id="html">HTML Elements</h3>

  <fieldset>
    <legend>element view</legend>
    <label>
      <input type="radio" bind:group value="simple" />
      <span>simple</span>
    </label>
    <label>
      <input type="radio" bind:group value="full" />
      <span>full</span>
    </label>
  </fieldset>

  <div bind:this={div} class="demo-div {classes}" style="width: {width}px;" data-testid={testid}>
    <div>
      <label>
        testid
        <input type="text" bind:value={testid} />
      </label>
      <label>
        width
        <input type="number" bind:value={width} step="10" max="1000" min="450" />
      </label>
      <label>
        extra class
        <select bind:value={classes}>
          <option></option>
          <option>red</option>
          <option>blue</option>
          <option>radius</option>
        </select>
      </label>
    </div>
    <ul>
      {#each { length: 100 }, i (i)}
        <li>{i}</li>
      {/each}
    </ul>
  </div>

  <Inspect
    value={div}
    name="htmlElement"
    theme="drak"
    style="flex-basis: 100%"
    expandLevel={0}
    elementView={group}
  />

  <!-- <Inspect value={_window} /> -->

  <!-- <p>This instance inspects <code>document.activeElement</code>:</p>
  <Inspect
    value={activeElement}
    name="activeElement"
    theme="drak"
    style="flex-basis: 100%; max-height: 100px"
    expandAll
  /> -->
</div>

<style>
  fieldset {
    display: flex;
    gap: 1em;

    label {
      gap: 1em;
      display: inline-flex;
      flex-direction: row;
    }
  }

  .demo-div {
    background-color: cadetblue;
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    height: 150px;
    overflow: auto;

    input {
      max-width: 50%;
    }

    &.red {
      background-color: pink;
      color: black;
    }

    &.blue {
      background-color: lightblue;
      color: black;
    }

    &.radius {
      border-radius: 16px;
    }
  }
</style>
