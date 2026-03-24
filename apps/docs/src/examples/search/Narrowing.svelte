<script lang="ts">
  import { onMount } from 'svelte'

  // import { onMount } from 'svelte'
  import { type InspectOptions } from 'svelte-inspect-value'
  import { Inspect } from '@components'

  let ins = $state<ReturnType<typeof Inspect>>()
  let search = $state<InspectOptions['search']>('highlight')
  let highlightMatches = $state(true)

  const value = {
    id: undefined,
    firstName: 'Bob',
    lastName: 'Alice',
    email: 'bob@alice.lol',
    introduction: `The name is Alice.

    Bob Alice.`,
    birthDate: new Date(),
    website: new URL('https://alicebob.website/?ref=abcdefg#about'),
    age: -42,
    emailVerified: true,
    interests: ['radio', 'tv', 'internet', 'kayaks'],
    nilVals: [undefined, null, NaN, Infinity],
    get interestList() {
      return this.interests.join('\n')
    },
    doStuff() {
      if (this.emailVerified) {
        return this.email
      } else {
        throw 'can not do stuff if email not verified'
      }
    },
  }

  onMount(() => {
    if (ins) {
      ins.search('value:"radio" key:name type:bool')
    }
  })
</script>

<Inspect
  bind:this={ins}
  values={value}
  expandLevel={0}
  heading="Narrowing"
  searchMode="or"
  {search}
  {highlightMatches}
  class="not-content mt"
/>

<div class="not-content">
  <label>
    mode
    <select bind:value={search}>
      <option>highlight</option>
      <option>filter</option>
      <option>filter-strict</option>
    </select>
  </label>
  <label>
    highlight
    <input type="checkbox" bind:checked={highlightMatches} />
  </label>
</div>

<style>
  div {
    display: flex;
    gap: 1em;
    font-family: monospace;
  }
</style>
