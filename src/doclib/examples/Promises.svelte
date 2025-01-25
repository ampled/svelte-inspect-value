<script lang="ts">
  import { Inspect } from '$lib/index.js'
  import { getContext, onMount } from 'svelte'
  import type { SvelteMap } from 'svelte/reactivity'
  import Code from '../Code.svelte'
  import Stack from '../Stack.svelte'
  import code from './promises.txt?raw'

  let promises = $state.raw<Record<string, Promise<unknown>>>()

  function run() {
    // promises = {}
    promises = {
      neverResolve: new Promise(() => {}),
      resolveInAFew: new Promise((resolve) => {
        setTimeout(() => {
          resolve('yep')
        }, 2000)
      }),
      rejectsInAFew: new Promise((_, reject) => {
        setTimeout(() => {
          reject('nope')
        }, 3500)
      }),
    }
  }

  onMount(run)
  getContext<SvelteMap<string, string>>('toc')?.set('Promises', 'promises')
</script>

<div class="flex col">
  <h3 id="promises">Promises</h3>
  <p>Show status and eventual result of promises</p>
  <button onclick={run}>rerun</button>

  <Stack>
    <Code {code} />
    {#if promises}
      <Inspect style="max-width: 360px" value={promises} name="promises" theme="drak" expandAll />
    {/if}
  </Stack>
</div>
