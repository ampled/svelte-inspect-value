const cls = eval(`(class Greeter {
    static staticProperty = 'Hello'

    constructor(name) {
      this.name = name;
    }

    greet() {
      return 'Hello' + ' ' + this.name
    }
  
  })`)

export default {
  primitives: {
    voids: [null, undefined],
    bools: [true, false],
    numbers: [
      0,
      1e-20,
      NaN,
      -Infinity,
      Math.PI,
      typeof BigInt !== 'undefined' ? BigInt('1234567898765432123456789') : 'No BigInt for you 😢',
    ],
    string: 'Hello world!',
    symbols: [Symbol.iterator, Symbol.for('hope')],
  },
  objectsAndClasses: {
    class: cls,
    instance: new cls('World'),
    plain: { hen: 'dog', cow: 'cat' },
    plainer: Object.assign(Object.create(null), { koi: 'ant' }),
    plainest: Object.create(null),
    'special props': Object.create(null, {
      getter: {
        get() {
          return Math.random()
        },
        enumerable: true,
      },
      'throwing getter': {
        get() {
          throw new Error('The getter failed :(')
        },
        enumerable: true,
      },
      'non enumerable': { value: 'test' },
    }),
    get moreExamples() {
      return [location, Math, JSON, document]
    },
  },
  arrays: {
    animals: ['fox', 'bat', 'cow', 'cat'],
    Uint8Array: new Uint8Array([10, 20, 30, 40]),
    Int32Array: new Int32Array([2, 2147, 2147483, 2147483647]),
    BigInt64Array: typeof BigInt64Array !== 'undefined' && new BigInt64Array([3, 6, 8].map(BigInt)),
  },
  functions: {
    method() {
      console.log('yayaya')
    },
    arrow: (v) => v,
    anotherArrow: (a = 1, b = 2, c = 3) => {},
    oldschool: function oldschool(a, b, c, d) {
      console.log(a, b, c)
    },
    get native() {
      return alert
    },
  },
  assorted: {
    regex: /[cb]at/gi,
    date: new Date(),
    error: new Error(),
    get html() {
      return document.body
    },
    map: new Map([
      ['pig', 'hog'],
      ['bug', 'eel'],
    ]),
    set: new Set(['pig', 'hog', 'bug', 'eel']),
  },
  veryNested: [[[[[[[[[[], ['end']]]]]]]]]],
  prom: Promise.resolve('hello!'),
}
