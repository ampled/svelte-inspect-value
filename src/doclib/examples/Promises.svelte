<script lang="ts">
  import { Inspect } from '$lib/index.js'
  import { onMount } from 'svelte'
  import Code from '../Code.svelte'
  import code from './promises.txt?raw'

  let promises = $state.raw<Record<string, Promise<any>>>()

  function run() {
    // promises = {}
    promises = {
      neverResolve: new Promise(() => {}),
      resolveInAFew: new Promise((resolve) => {
        setTimeout(() => {
          resolve('yeah')
        }, 2000)
      }),
      rejectsInAFew: new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('not today', { cause: new Error('dont wanna') }))
        }, 3500)
      }),
    }
  }

  onMount(() => {
    run()
  })
</script>

<div class="flex col">
  <h2>Promises</h2>
  <p>show status and eventual result of promises</p>

  <div class="flex row" style="width: 100%">
    <Code {code} />
    {#if promises}
      <Inspect value={promises} name="promises" theme="drak" style="flex-basis: 100%" expandAll />
      <button onclick={run}>rerun</button>
    {/if}
  </div>
</div>
