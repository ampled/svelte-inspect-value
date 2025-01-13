<script lang="ts">
  import { browser } from '$app/environment'
  import Inspect from '$lib/Inspect.svelte'

  class Greeter {
    static staticProp = 'Hi'

    public asdf = 'hello'
  }

  const allTypes = {
    primitives: {
      string: 'string',
      number: 1234,
      boolean: true,
      symbol: Symbol('yo'),
      bigInt: 1n,
    },
    multilineString: 'line\nline\nline\nline\nline\nline\nline\nline\nline',
    bigint: 1n + 1n,
    reg: /cake/,
    nil: [null, undefined, NaN, Infinity],
    promises: {
      pending: new Promise(() => {}),
      resolve: Promise.resolve({}),
      rejected: new Promise((_, reject) => {
        if (browser) {
          setTimeout(() => {
            reject('oh no')
          }, 4000)
        }
      }),
    },
    array: [1, 2, 3],
    date: new Date(),
    onelinerArrow: () => 2,
    normalFunction: function (some: string, thing: string) {
      const { log } = console
      log(some + 'thing')
      return 'some' + thing
    },
    errors: {
      error: new Error('oh no!'),
      typeerror: new TypeError('snapple'),
      withACause: new Error('something happened because of reasons', {
        cause: new Error('i am the reason', {
          cause: new Error('no i am'),
        }),
      }),
    },
    set: new Set([1, 2, 3]),
    noop: new WeakSet(),
    map: new Map<unknown, unknown>([
      [/regexp/, 1234],
      [1n, 1234],
      [Promise.resolve({}), '1234'],
      ['1 \n    2', 2],
    ]),
    typedArray: {
      eight: new Int8Array([1, 2, 3]),
      sixteen: new Int16Array([1, 2, 3, 4, 5]),
      thirtytwo: new Int32Array([1, 2, 3, 4, 5]),
    },
    classCtr: Greeter,
    classNoEntries: class Foo {},
    classInstance: new Greeter(),
    emptyObject: {},
    emptyArray: [],
    emptyString: '',
  }
</script>

<div style="padding: 2em">
  <Inspect value={allTypes} expandLevel={1} />
</div>
