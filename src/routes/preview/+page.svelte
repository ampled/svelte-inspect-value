<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'

  let showTypes = $state(false)
  let showPreview = $state(true)
  let showLength = $state(false)
  let showTools = $state(false)

  let value = {
    basic: {
      a: 'string',
      b: 42,
      c: Symbol('asdf'),
    },
    promises: {
      a: Promise.resolve({
        a: 'string',
        b: 42,
        c: Symbol('asdf'),
        d: {
          andIOop: 'and i object oriented programming',
        },
      }),
      b: new Promise(() => void 0),
    },
    nested: {
      object: {
        onelinerArrow: () => 2,
        normalFunction: function (some: string, thing: string) {
          const { log } = console
          log(some + 'thing')
          return 'some' + thing
        },
        anotherObject: {
          key: 'value',
          array: [1, 2, 3, { andIOop: 'and i object oriented\n       programming' }],
        },
      },
    },
    function: {
      onelinerArrow: () => 2,
      normalFunction: function (some: string, thing: string) {
        const { log } = console
        log(some + 'thing')
        return 'some' + thing
      },
    },
  }
</script>

<label class="flex row">
  types <input type="checkbox" bind:checked={showTypes} />
</label>
<label class="flex row">
  preview <input type="checkbox" bind:checked={showPreview} />
</label>
<label class="flex row">
  tools <input type="checkbox" bind:checked={showTools} />
</label>

<br />

<Inspect {showTypes} {showPreview} {showLength} {showTools} {value} name="testing" />
