<script lang="ts">
  import AllTypes from '../../doclib/examples/AllTypes.svelte'
  import { intervalEffect } from '../../doclib/interval-effect.svelte.js'

  let value = $state.raw({ a: 'a', b: 'b', number: 1, c: 'c', d: 'd' })
  let arr = $state<unknown[]>([])
  let dir = $state(1)

  intervalEffect(() => {
    value = { ...value, number: value.number + 1 }
    // arr.push(arr.length)
    if (dir === 1) {
      arr = [...arr, (arr.length + 1).toString()]
      if (arr.length === 20) {
        dir = -1
      }
    } else {
      arr = arr.filter((n) => n !== arr.length.toString())
      if (arr.length === 0) {
        dir = 1
      }
    }
  }, 250)
</script>

<div style="padding: 2em">
  <AllTypes />
</div>

<!-- <div style="padding: 2em">
  <Inspect {value} expandLevel={1} />
</div>

<div style="padding: 2em">
  <Inspect value={arr} expandLevel={0} />
</div> -->

<!-- <div style="padding: 2em">
  <Inspect value={bouncyArr} expandLevel={1} />
</div> -->
