<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'

  let obj = {
    id: undefined,
    arr: [1, 2, 3, 4],
    obj: { gaga: 'googoo' },
  }
</script>

<Inspect value={obj} />
<Inspect value={[undefined, [1, 2, 3]]} />
