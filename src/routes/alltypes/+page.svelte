<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'

  const allTypes = {
    str: 'string',
    multiline: 'line\nline\nline\nline\nline\nline\nline\nline\nline',
    number: 1234,
    bools: true,
    bigint: 1n + 1n,
    symb: Symbol('abcd'),
    undef: undefined,
    reg: /cake/,
    nil: null,
    array: [1, 2, 3],
    object: { normalKey: 'string value', [Symbol('key')]: 'oh\n\n\n\n      hi' },
    date: new Date(),
    promise: Promise.resolve(1),
    onelinerArrow: () => 2,
    normalFunction: function () {},
    error: new Error('oh no!'),
    set: new Set([1, 2, 3]),
    map: new Map([[0, 0]]),
    emptyObject: {},
    emptyArray: [],
    emptyString: '',
  }
</script>

<div style="max-width: 70%; padding: 2em">
  <Inspect value={allTypes} />
</div>
