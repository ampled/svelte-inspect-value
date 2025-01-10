<script lang="ts">
  import { Inspect } from '$lib/index.js'

  let div = $state()
  let activeElement: Element | null = $state(null)

  let width = $state(500)
  let classes = $state('radius')
  let testid = $state('demo-div')
</script>

<svelte:document bind:activeElement />

<div class="flex col">
  <h2>HTML Elements</h2>
  <p>inspect attributes of html elements</p>

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
  <Inspect value={div} name="htmlElement" theme="drak" style="flex-basis: 100%" expandAll />

  <p>This instance inspects <code>document.activeElement</code>:</p>
  <Inspect
    value={activeElement}
    name="activeElement"
    theme="drak"
    style="flex-basis: 100%; max-height: 100px"
    expandAll
  />
</div>

<style>
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
      color: white;
    }

    &.radius {
      border-radius: 16px;
    }
  }
</style>
