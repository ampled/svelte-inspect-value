<script lang="ts">
  import { Inspect } from '@components'
  import { onMount } from 'svelte'
  import { readable, writable } from 'svelte/store'

  function customStore(initialValue = 0) {
    let interval: number | undefined
    let val = writable(initialValue, () => {
      interval = window.setInterval(() => {
        val.update((n) => n + 1)
      }, 500)

      return () => {
        window.clearInterval(interval)
      }
    })

    return {
      ...val,
      set value(v: number) {
        val.set(v)
      },
    }
  }

  onMount(() => {
    const st = writable(0)

    let s = st.subscribe(() => {})

    return () => {
      s()
    }
  })

  const stores = $derived({
    writableStore: writable('i am the store value'),
    test: writable('i am the\n store value'),
    readableStore: readable({ a: { b: { c: { d: { e: 'end' } } } } }),
    customStore: customStore(0),
    fakeStore: {
      subscribe: () => 'hi',
    },
  })
</script>

<Inspect class="not-content mt" values={stores} expandLevel={0} stores />
