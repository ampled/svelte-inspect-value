<script lang="ts">
  import { Inspect } from '$lib/index.js'
  import { onMount } from 'svelte'
  import Code from '../Code.svelte'
  import code from './promises.txt?raw'

  let promises = $state.raw<Record<string, Promise<unknown>>>()

  function run() {
    // promises = {}
    promises = {
      neverResolve: new Promise(() => {}),
      resolveInAFew: new Promise((resolve) => {
        setTimeout(() => {
          resolve('yes!')
        }, 2000)
      }),
      rejectsInAFew: new Promise((_, reject) => {
        setTimeout(() => {
          reject('oh no!')
        }, 3500)
      }),
    }
  }

  onMount(run)
</script>

<div class="flex col">
  <h2>Promises</h2>
  <p>show status and eventual result of promises</p>
  <button onclick={run}>rerun</button>

  <div class="flex row" style="width: 100%">
    <Code {code} label="" />
    {#if promises}
      <Inspect style="max-width: 360px" value={promises} name="promises" theme="drak" expandAll />
    {/if}
  </div>
</div>

<style>
  .flex.row {
    align-items: stretch;
  }
</style>
