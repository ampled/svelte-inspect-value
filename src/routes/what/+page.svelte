<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'
  import { getType, typeOf } from '$lib/util.js'

  let array = $state([].entries())

  let anotherArray = $derived([...array])

  let obj = {
    name: 'hello',
    list: [1, 2, 3].entries(),
    mapIterator: new Map<any, any>([
      [1, 2],
      [{ name: 'hey' }, 23],
    ]).entries(),
    setEntries: new Set([2, 34]).entries(),
  }
</script>

<Inspect value={obj} />
