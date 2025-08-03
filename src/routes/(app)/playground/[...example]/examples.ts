const primitives = `return [
  'Inspect',
  42,
  [true, false],
  { [Symbol('key')]: [0,1,2] }, 
  Symbol('svelte'),
  1234n,
  undefined,
  null
]`

const iterators = `function* fibonacci() {
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
  async_gen: suspensefulFibonacci(),
  arr: '12345'.split('').values(),
  map: new Map([[0,1], [1,2], [3,4]]).entries(),
  set: new Set([0,0,1,2,3,4,5,6,7,8,9,10,11]).values(),
  string: 'abcdefgæøå'[Symbol.iterator]()
}`

const gettersAndSetters = `return {
    num: 12,
    get current() {
        this.lastAccessed = new Date()
        return this.num
    },
    set current(num) {
        this.num = num;
    },
    get doubled() {
        return this.current * 2;
    },
    lastAccessed: undefined
}`

const mapAndSet = `return {
    map: new Map([
        [{ msg: 'i am a map key'}, 1],
        [,'undefined is a valid key'],
        [null, 'null is a valid key'],
        [Promise.resolve('key!'), 'anything is a key!!'],
        [new Map([[1,2]]), 'hmm']
    ]),
    set: new Set(['one', 'one', 'two', 'three'])
}`

const promises = `const neverResolves = new Promise(() => undefined)

const resolvesInASec = new Promise((res) => {
  setTimeout(() => res('yup'), 1000)
})

const rejects = new Promise((res,rej) => {
  setTimeout(() => rej('no!'), 1500)
})

return {
  neverResolves,
  resolvesInASec,
  rejects
}`

const classInstances = `class Cls {
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

const cls = new Cls({ a: 1, b: 2, c: 4 });

return { cls };`

export default {
  primitives,
  iterators,
  ['getters and setters']: gettersAndSetters,
  ['map and set']: mapAndSet,
  ['class instances']: classInstances,
  promises,
}
