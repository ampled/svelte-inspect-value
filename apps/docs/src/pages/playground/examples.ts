const primitives = /*javascript*/ `{
  str: 'Inspect\\nis helpful!',
  aNumber: 42,
  bools: [true, false],
  someSymbol: Symbol.for('svelte'),
  bigInteger: 1234n,
  nilVals: [undefined, null, NaN],
  object: {
    'a key': Infinity,
    [Symbol.for('key')]: 'a value'
  }
}`

const iterators = /*javascript*/ `function* fibonacci() {
  let current = 1
  let next = 1
  while (true) {
    yield current
    ;[current, next] = [next, current + next]
  }
}

async function* suspensefulFibonacci() {
  let current = 1
  let next = 1
  while (true) {
    await new Promise((resolve) => {
      setTimeout(
        () => {
          resolve(undefined)
        },
        Math.ceil(Math.random() * 1000)
      )
    })
    yield current
    ;[current, next] = [next, current + next]
  }
}

return {
  generator: fibonacci(),
  asyncGen: suspensefulFibonacci(),
  arr: '12345'.split('').values(),
  map: new Map([
    [0, 1],
    [1, 2],
    [3, 4],
  ]).entries(),
  set: new Set([0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]).values(),
  string: 'abcdefgæøå'[Symbol.iterator](),
};`

const gettersAndSetters = /*javascript*/ `return {
  num: 12,
  get current() {
    this.lastAccessed = new Date();
    return this.num;
  },
  set current(num) {
    this.num = num;
  },
  get doubled() {
    return this.current * 2;
  },
  get recursive() {
    return this
  },
  lastAccessed: undefined
};`

const mapAndSet = /*javascript*/ `{
    Map: new Map([
        [{ msg: 'i am a map key'}, 1],
        [,'undefined is a valid key'],
        [null, 'null is a valid key'],
        [Promise.resolve('key!'), 'anything is a key!!'],
        [new Map([[1,2]]), 'hmm']
    ]),
    Set: new Set(['one', 'one', 'two', 'three'])
}`

const promises = /*javascript*/ `{
  neverResolves: new Promise(() => undefined),
  resolvesInASec: new Promise((res) => {
    setTimeout(() => res('yup'), 1000)
  }),
  rejects: new Promise((res,rej) => {
    setTimeout(() => rej('no!'), 1500)
  })
}`

const classes = /*javascript*/ `class Cls {
  _props;
  
  constructor(props) {
    this._props = props;
  }
  
  logProps() {
    console.log(this._props);
  }
  
  inc() {
    this._props.a++;
  }
  
  get props() {
    return this._props;
  }
}

return { cls: new Cls({ a: 1, b: 2, c: 4 }) };`

const temporal = /*javascript*/ `return {
  plain: {
    date: Temporal.Now.plainDateISO(),
    dateTime: Temporal.Now.plainDateTimeISO(),
    time: Temporal.Now.plainTimeISO(),
    monthDay: new Temporal.PlainMonthDay(12, 15),
    yearMonth: new Temporal.PlainYearMonth(1970, 1, 'persian'),
    chineseDate: Temporal.PlainDate.from('2021-07-01[u-ca=chinese]')
  },
  instant: Temporal.Now.instant(),
  zonedDateTime: Temporal.ZonedDateTime.from('2026-05-20T14:30:00[Europe/Oslo]'),
  duration: new Temporal.Duration(1,3,3,7),
  get now() {
    return {
      zonedDateTime: Temporal.Now.zonedDateTimeISO()
    }
  }
};`

const kitchenSink = /*javascript*/ `return {
  primitives: {
    voids: [null, undefined],
    bools: [true, false],
    numbers: [0, 1e-20, NaN, -Infinity, Math.PI, 1234567898765432123456789n],
    string: 'Hello\\n\\tWorld!',
    symbols: [Symbol.iterator, Symbol.for('hope')],
  },
  reg: /r3g3xp/gi,
  date: new Date('1970-01-02 03:45:57'),
  url: new URL('https://inspect.eirik.space/?ref=abcdefg#about'),
  body: document.body,
  arrays: {
    animals: ['fox', 'bat', 'cow', 'cat'],
    Uint8Array: new Uint8Array([10, 20, 30, 40]),
    Int32Array: new Int32Array([2, 2147, 2147483, 2147483647]),
    BigInt64Array: new BigInt64Array([3, 6, 8].map(BigInt)),
  },
  functions: {
    double: (value) => 2 * value,
    normalFunction: function (some = 'some', thing) {
      return some + thing
    },
    method() {
      return this
    },
    asyncOneLiner: async (v) => new Promise((r) => setTimeout(() => r(v), v)),
    asyncfn: async function () {
      const boop = await Promise.resolve('boop')
      return boop
    },
    yieldTwo: function* () {
      yield 2
    },
    asynchronousGenerator: async function* () {
      yield 2
    },
  },
  map: new Map([
    [{ msg: 'i am a map key' }, 1],
    [, 'undefined is a valid key'],
    [null, 'null is a valid key'],
    [Promise.resolve('key!'), 'anything is a key!!'],
    [new Map([[1, 2]]), 'hmm'],
  ]),
  set: new Set(['one', 'one', 'two', 'three']),
  gettersAndSetters: {
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
    set current(value) {
      this.count = value
    },
    getterAccessedTimes: 0,
    get getterWithSideEffect() {
      this.test += '@'
      return 'something'
    },
    get throws() {
      let goof
      goof.doesNotExist.doesNotExist()
      return 'blah'
    },
    set throws(value) {
      JSON.parse('t')
    },
    get recursion() {
      return this
    },
    test: '@',
  },
  classes: {
    thingClass: class Thing {
      static property = 'test';
      numberProp = 42;
    },
    get thingInstance() {
      return new this.thingClass
    }
  },
  temporal: {
    date: Temporal.Now.plainDateISO(),
    dateTime: Temporal.Now.plainDateTimeISO(),
    time: Temporal.Now.plainTimeISO(),
    monthDay: new Temporal.PlainMonthDay(12, 15),
    yearMonth: new Temporal.PlainYearMonth(1970, 1, 'persian'),
    instant: Temporal.Now.instant(),
    zonedDateTime: Temporal.ZonedDateTime.from('2026-05-20T14:30:00[Europe/Oslo]'),
    duration: new Temporal.Duration(1,3,3,7),
  },
  error: new Error('oh no!'),
};`

export default {
  primitives,
  iterators,
  ['getters and setters']: gettersAndSetters,
  ['map and set']: mapAndSet,
  promises,
  classes,
  temporal,
  ['kitchen sink']: kitchenSink,
}
