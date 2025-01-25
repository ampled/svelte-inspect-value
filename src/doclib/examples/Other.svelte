<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'
  import { onMount } from 'svelte'
  import { SvelteDate } from 'svelte/reactivity'
  import { intervalEffect } from '../interval-effect.svelte.js'

  let error = $state()

  let date = new SvelteDate('1988-12-15 04:16')
  let number = $state(0)
  let currentString = $state(0)

  let frames = [
    '-         ',
    ' =        ',
    '  -       ',
    '   =      ',
    '    -     ',
    '     =    ',
    '      -   ',
    '       =  ',
    '        - ',
    '         =',
  ]
  let dash = $derived(frames[currentString])

  onMount(() => {
    try {
      let lol: unknown
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions, @typescript-eslint/no-explicit-any
      ;(lol as any).doesNotHaveProperty
    } catch (e) {
      error = e as Error
    }
  })

  intervalEffect(() => {
    date = new SvelteDate()
  }, 1000)

  intervalEffect(() => {
    number = Math.ceil(Math.random() * 1000000000000)
  }, 100)

  intervalEffect(() => {
    currentString++
    if (currentString === 10) currentString = 0
  }, 500)

  let value = $derived({
    date,
    reg: /^[re(g)ex]$/,
    number,
    error,
    dash,
  })
</script>

<div class="flex col">
  <h3>Other</h3>
  <p>Other types handled includes Error, Date, regexp</p>

  <div class="flex">
    <Inspect {value} />
  </div>
</div>
