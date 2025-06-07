<script lang="ts">
  import AllTypes from '$doclib/examples/AllTypes.svelte'
  import Inspect from '$lib/Inspect.svelte'

  let heading = $state(false)
</script>

<label>
  heading
  <input bind:checked={heading} type="checkbox" />
</label>

<div style="padding: 2em">
  <AllTypes heading={heading ? 'all types' : undefined} search="highlight" highlightMatches />
</div>

<div style="padding: 2em">
  <Inspect values={new Map([['b', 'a']])} />
  <Inspect values={new Set(['b', 'a'])} />
  <Inspect values={new Uint16Array([1, 2, 3])} />
</div>
