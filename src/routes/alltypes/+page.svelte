<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'

  class Greeter {
    static staticProp = 'Hi'

    public asdf = 'hello'
  }

  class MapEntry {
    public key: string
    public value: unknown

    constructor(key: string, value: unknown) {
      this.key = key
      this.value = value
    }
  }

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
    asdf: [1, 2],
    array: [1, 2, 3],
    object: { normalKey: 'string value', [Symbol('key')]: 'oh\n\n\n\n      hi' },
    date: new Date(),
    promise: Promise.resolve(1),
    onelinerArrow: () => 2,
    normalFunction: function (some: string, thing: string) {
      const { log } = console
      log(some + 'thing')
      return 'some' + thing
    },
    error: new Error('oh no!'),
    set: new Set([1, 2, 3]),
    weakSet: new WeakSet(),
    map: new Map<unknown, unknown>([
      [0, 0],
      [{ id: 123 }, 1],
    ]),
    eight: new Int8Array([1, 2, 3]),
    sixteen: new Int16Array([1, 2, 3, 4, 5]),
    thirtytwo: new Int32Array([1, 2, 3, 4, 5]),
    iterators: {
      arrIterator: [1, 2, 3].values(),
      arrEntries: [1, 2, 3].entries(),
      setIterator: new Set([1, 2, 3]).entries(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mapIterator: new Map<any, any>([
        [0, 'a'],
        [1, 'b'],
        ['c', 2],
        [{ key: 'd' }, 3],
      ]).entries(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mapIteratorValues: new Map<any, any>([
        [0, 'a'],
        [1, 'b'],
        ['c', 2],
        [{ key: 'd' }, 3],
      ]).values(),
    },
    classCtr: Greeter,
    classNoEntries: class Foo {},
    classInstance: new Greeter(),
    mapEntry: new MapEntry('key', 'value'),
    emptyObject: {},
    emptyArray: [],
    emptyString: '',
  }
</script>

<div style="padding: 2em">
  <Inspect value={allTypes} expandLevel={2} />
</div>

<!-- <div style="padding: 2em">
  <Inspect value={'lorem\n ipsum\n\t\rdolor sit amet'} expandLevel={2} />
</div>

<div style="padding: 2em">
  <Inspect
    value={{
      longMultiLine:
        'lorem ipsum dolor sit amet \n lorem ipsum dipsum bipdum \n abababababababa ner nerrrrr',
      long: 'lorem ipsum dolor sit amet. lorem ipsum dipsum bipdum. abababababababa ner ner ner ner',
    }}
    expandLevel={2}
  />
</div> -->
