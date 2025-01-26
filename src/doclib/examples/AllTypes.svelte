<script lang="ts">
  import { browser } from '$app/environment'
  import Inspect from '$lib/Inspect.svelte'
  import type { InspectProps } from '$lib/types.js'
  import { onMount } from 'svelte'

  const props: InspectProps = $props()

  class Greeter {
    static staticProperty = 'hi'
    public nonStatic = 'yo'
    public name = 'World'

    constructor(name: string) {
      this.name = name
    }
  }

  function* fibonacci() {
    let current = 1
    let next = 1
    while (true) {
      yield current
      ;[current, next] = [next, current + next]
    }
  }

  let args = $state()

  const string1 = 'Que ma joie demeure'

  const segmenterFrGrapheme = new Intl.Segmenter('fr', {
    granularity: 'word',
  })
  const segments = $state(segmenterFrGrapheme.segment(string1)[Symbol.iterator]())

  const allTypes = $derived({
    str: 'string',
    multiline: 'line\nline\nline\nline\nline\nline\nline\nline\nline',
    number: 1234,
    bools: true,
    bigint: 9007199254740991n,
    symb: Symbol('abcd'),
    reg: /([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/gim,
    nil: [undefined, null],
    array: [1, 2, 3],
    date: new Date(),
    url: new URL('https://alicebob.website/?ref=abcdefg#about'),

    objectWithGetter: {
      get anObject() {
        return {
          a: { b: { c: { d: { e: 'end' } } } },
        }
      },
      count: 1,
      get current() {
        this.getterAccessedTimes++
        return this.count
      },
      set current(value: number) {
        this.count = value
      },
      get throws() {
        console.trace('throwing getter accessed')
        throw 'yeet'
      },
      set throws(value: unknown) {
        throw 'throwing'
      },
      getterAccessedTimes: 0,
      get getterWithSideEffect() {
        this.test = 'hahaha'
        return 'something'
      },
      get throwSomething() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let goof: any
        goof.doesNotExist.doesNotExist()
        // throw new Error('yayaya')
        return 'blah'
      },
      get self() {
        return this
      },
      test: 'test',
    },

    promise: Promise.resolve({
      name: 'a',
      b: { name: 'b', c: { name: 'c', d: { name: 'd' } } },
      g: [{ name: 'b', c: { name: 'c', d: { name: 'd' } } }],
      d: {},
    }),
    nestedObjects: {
      b: { name: 'b', c: { name: 'c', d: { name: 'd' } } },
      g: [{}],
      d: {},
      name: 'a',
    },
    nestedArrays: [
      14,
      [[[[[[[[[15, 14, 13], 12], 11], 10], 9], 8], 'sept'], 6], 5],
      'four',
      3,
      2,
      1,
    ],
    functions: {
      double: (value: number) => 2 * value,
      normalFunction: function (some: string = 'some', thing: string) {
        return some + thing
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      asyncOneLiner: async (v: any) => new Promise((r) => setTimeout(() => r(v), v)),
      asyncfn: async function () {
        const boop = await Promise.resolve('boop')
        return boop
      },
      test: eval(`(function* generator() { yield 'a' })`),
      test2: eval(`(async function* generator() { yield 'a' })`),
      yieldTwo: function* () {
        yield 2
      },
      asynchronousGenerator: async function* () {
        yield 2
      },
      get asArray(): unknown[] {
        return Object.values({
          double: (value: number) => 2 * value,
          normalFunction: function (some: string = 'some', thing: string) {
            return some + thing
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          asyncOneLiner: async (v: any) => new Promise((r) => setTimeout(() => r(v), v)),
          asyncfn: async function () {
            const boop = await Promise.resolve('boop')
            return boop
          },
          test: eval(`(function* generator() { yield 'a' })`),
          test2: eval(`(async function* generator() { yield 'a' })`),
          yieldTwo: function* () {
            yield 2
          },
          asynchronousGenerator: async function* () {
            yield 2
          },
        })
      },
    },
    body: browser ? document.body : null,
    navigator: browser ? navigator : null,
    errors: {
      error: new Error('oh no!'),
      typeerror: new TypeError('snapple'),
    },
    set: new Set([1, 2, 3]),
    weakSet: new WeakSet([{}, {}, {}]),
    weakMap: new WeakMap([[{}, 1]]),
    map: new Map<unknown, unknown>([
      [0, 0],
      [{ id: 123 }, 1],
      [[1, 2, 3], 2],
      [Symbol('key'), 'value'],
      [
        Promise.resolve('foo'),
        {
          get something() {
            return 'something'
          },
        },
      ],
    ]),
    typedArrays: {
      eight: new Int8Array([1, 2, 3]),
      Uint8Array: new Uint8Array([1, 2, 3]),
      Uint8ClampedArray: new Uint8ClampedArray([1, 2, 3]),
      sixteen: new Int16Array([1, 2, 3, 4, 5]),
      Uint16Array: new Uint16Array([1, 2, 3]),
      thirtytwo: new Int32Array([1, 2, 3, 4, 5]),
      Uint32Array: new Uint32Array([1, 2, 3]),
      Float32Array: new Float32Array([1.2, 3.4, 5.6]),
      Float64Array: new Float64Array([1.2345, 3.4, 5.6]),
      BigInt64Array: new BigInt64Array([1n, 2n, 3n]),
      BigUint64Array: new BigUint64Array([1n]),
    },
    iterators: {
      array: [1, 2, 3, 4].values(),
      set: new Set([12, 34, 45]).values(),
      map: new Map<unknown, unknown>([
        [0, 0],
        [{ id: 123 }, 1],
        [[1, 2, 3], 2],
        [Symbol('key'), 'value'],
        [
          Promise.resolve('foo'),
          {
            get something() {
              return 'something'
            },
          },
        ],
      ]).entries(),
      fib: fibonacci(),
      stringIterator: 'abdcdefghijklmnopqrstuvwxyzæøå'[Symbol.iterator](),
      elements: browser ? document.body.childNodes.values() : null,
      args,
      segments,
      string: {
        value: 'test1test2',
        regExp: /t(e)(st(?<digit>\d?))/g,
        get matchAll() {
          return this.value.matchAll(this.regExp)
        },
        get exec() {
          return this.regExp.exec(this.value)
        },
        get match() {
          return this.value.match(this.regExp)
        },
      },
    },
    nestedTypedArrays: [
      {
        eight: new Int8Array([1, 2, 3]),
        sixteen: new Int16Array([1, 2, 3, 4, 5]),
        thirtytwo: new Int32Array([1, 2, 3, 4, 5]),
      },
    ],
    classCtr: Greeter,
    classInstance: new Greeter('You'),
    classNoEntries: class Foo {},
    empties: {
      object: {},
      array: [],
      set: new Set(),
      map: new Map(),
      string: '',
    },
  })

  function setSomeArguments(..._args: unknown[]) {
    return arguments
  }

  onMount(() => {
    args = setSomeArguments(1, 2, 3, 4, 5)[Symbol.iterator]()
  })
</script>

<Inspect name="allTypes" value={allTypes} {...props} />
