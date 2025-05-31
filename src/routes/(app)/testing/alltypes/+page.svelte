<script lang="ts">
  import AllTypes from '$doclib/examples/AllTypes.svelte'

  let heading = $state(false)
</script>

<label>
  heading
  <input bind:checked={heading} type="checkbox" />
</label>

<div style="padding: 2em">
  <AllTypes heading={heading ? 'all types' : undefined} search="highlight" highlightMatches />
</div>
