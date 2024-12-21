<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'
  import type { InspectState } from '$lib/state.svelte.js'

  let anObject = $state({
    aString: 'some string',
    counter: 0,
    subObject: {
      yo: 'haha',
      nested1: {
        yo: 'haha',
        nestded2: {
          yo: 'haha',
        },
      },
    },
    lol: {
      testing: 123,
    },
  })

  let expandLevel = $state(1)

  let collapseState = $state<InspectState>()
</script>

<input type="number" bind:value={expandLevel} />

<div style="padding: 1em">
  {#key expandLevel}
    <Inspect
      class="monokai"
      value={anObject}
      {expandLevel}
      name="anObject"
      onCollapseChange={(value) => (collapseState = value)}
    />
  {/key}
</div>

<div style="padding: 1em">
  <Inspect class="monokai" value={collapseState} {expandLevel} name="state" />
</div>
