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

  // $inspect(typeOf(['1,2,3'].entries()))
  // $inspect(typeOf(new Map([[1, 1]]).entries()))
  // $inspect(typeOf(new Set([1, 2, 3]).entries()))
  // $inspect(Object.prototype.toString.call(['1,2,3'].entries()))
  // $inspect(Object.prototype.toString.call(new Map([[1, 1]]).entries()))

  // $inspect(array)
</script>

<Inspect value={obj} />
