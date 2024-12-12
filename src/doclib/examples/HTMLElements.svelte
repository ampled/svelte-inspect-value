<script lang="ts">
  import { Inspect } from '$lib/index.js'

  import Code from '../Code.svelte'
  import code from './promises.txt?raw'

  let div = $state()
  let activeElement: (typeof document)['activeElement'] = $state(null)

  let width = $state(300)
  let classes = $state('')
  let testid = $state('demo-div')

  $inspect(classes)
</script>

<svelte:document bind:activeElement />

<div class="flex col">
  <h2>HTML Elements</h2>
  <p>inspect attributes of html elemenets</p>

  <div class="flex row" style="width: 100%">
    <!-- <Code {code} /> -->
    <div class="flex col">
      <div
        bind:this={div}
        class="demo-div {classes}"
        style="width: {width}px;"
        data-testid={testid}
      >
        <label>
          testid
          <input type="text" bind:value={testid} />
        </label>
        <label>
          width
          <input type="number" bind:value={width} step="12" />
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
      <Inspect value={div} name="htmlElement" theme="drak" style="flex-basis: 100%" expandAll />
      <Inspect
        value={activeElement}
        name="activeElement"
        theme="drak"
        style="flex-basis: 100%"
        expandAll
      />
    </div>
  </div>
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
