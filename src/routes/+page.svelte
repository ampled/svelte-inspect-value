<script lang="ts">
  // import './app.css'
  import Inspect from '$lib/Inspect.svelte'
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'

  let showLength = $state(true)
  let showTypes = $state(true)
  let stringCollapse = $state(0)
  let stringRender: 'stringify' | 'pre' = $state('pre')
  let theme = $state('dracula')
  let draggable = $state(false)

  let options = $derived({
    showLength,
    showTypes,
    stringCollapse,
    stringRender,
    class: theme,
    draggable,
  })

  let div = $state()

  let returnValue = <T,>(value: T) => value

  let date = $state(new Date())

  let symbolKey = Symbol('key')

  let image: HTMLImageElement | undefined = $state()

  let error: Error | undefined = $state()

  onMount(() => {
    if (browser) {
      image = new Image()
      image.src = 'favicon.png'
    }

    try {
      let lol: any
      lol.doesNotHaveProperty
    } catch (e) {
      error = e as Error
    }
  })

  class Greeter {
    static staticProperty = 'HI'
    iHaveAProperty = 'hello'
    private name: string

    constructor(name: string) {
      this.name = name
    }

    public greet = () => console.log(`${Greeter.staticProperty} ${this.name}`)

    #nope = () => 'no'

    public method() {
      return 'hei'
    }

    toString() {
      return 'nonononono'
    }
  }

  let allTypesValue = $derived({
    options,
    emptyArr: [],
    emptyObj: {},
    div,
    image,
    // emptyString: '',
    longString: 'lorem ipsum dolor sit amet. boy is this string long!!',
    multiLineString: 'line one\n  line two\n    line three',
    numberValue: 1484789234,
    bigInteger: 1n,
    nanValue: NaN,
    infinity: Infinity,
    undefinedValue: undefined,
    nullValue: null,
    map: new Map<any, any>([
      ['yeah', 1],
      [3, 2],
      [{ name: 'object key' }, 3],
      [symbolKey, 4],
      [
        'longArray',
        Array(100)
          .fill(0)
          .map((v, i) => i * 100),
      ],
    ]),
    set: new Set([1, 2, 3]),
    // emptyUrl: new URL('https://localhost'),
    url: new URL('https://subdomain.example.org/about'),
    fullyFeaturedUrl: new URL(
      'https://anon:hunter2@example.org:8080/pathname/index.html?q=query&p=123#result'
    ),
    search: new URLSearchParams([
      ['a', '1'],
      ['a', '2'],
      ['b', '3'],
      ['b', '4'],
      ['c', '5'],
    ]),
    // anotherSearch: new URLSearchParams('?q&b=foo'),
    date: date,
    dateConstructror: Date,
    booleanVal: true,
    arrayValue: [1, 2, 3, 14, 'u2'],
    symbolProp: Symbol('hi i am symbol'),
    [symbolKey]: 'my key is a symbol',
    reg: /^[re(g)ex]$/,
    arrowFunction: returnValue,
    normalFunction() {
      return 'normal'
    },
    classWithStaticProperties: Greeter,
    instanceOfClass: new Greeter('World'),
    simpleClass: class SimpleClass {},
    error: new TypeError('can not access property of undefined'),
  })

  let jsonString = $state(JSON.stringify({ anObject: { name: 'Carl' } }))

  // $inspect(allTypesValue)
</script>

<main>
  <div class="flex col">
    <h2>JSON</h2>
    <p>works pretty well for basic object and array-values aka "json"</p>

    <div class="flex">
      <Inspect
        value={{
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
        }}
        name="simple"
        {showLength}
        {showTypes}
        {stringCollapse}
        {draggable}
        class={theme}
      />
    </div>
  </div>
  <!--

  <div class="flex col">
    <h2>map & set</h2>
    <p>handles map and set instances.</p>
    <p>
      for maps, if keys are not of type number|string|symbol, the entry is shown as a key/value
      tuple:
    </p>

    <div class="flex">
      <TableJsonView
        value={{
          map: new Map<any, any>([
            ['yeah', 1],
            [3, 2],
            [{ name: 'object key' }, 3],
            [symbolKey, 4],
          ]),
          set: new Set([1, 2, 3, 'four']),
        }}
        name="mapAndSet"
        {showLength}
        {showTypes}
        {stringCollapse}
        {draggable}
        class={theme}
      />
    </div>
  </div>

  <div class="flex col">
    <h2>class</h2>
    <p>display static properties of classes (but not on instances.)</p>

    <div class="flex">
      <TableJsonView
        value={{
          class: IAmAClass,
          classInstance: new IAmAClass(),
        }}
        {showLength}
        {showTypes}
        {stringCollapse}
        {draggable}
        class={theme}
      />
    </div>
  </div>

  <div class="flex col">
    <h2>functions</h2>
    <p>display bodies of arrow functions (experimental)</p>

    <div class="flex">
      <TableJsonView
        name="functions"
        value={{
          arrowFunction: (num: number) => num * 2,
          someFunction: function () {
            return 'something'
          },
        }}
        {showLength}
        {showTypes}
        {stringCollapse}
        {draggable}
        class={theme}
      />
    </div>
  </div>

  <div class="flex col">
    <h2>symbol keys</h2>
    <p>object properties where keys are symbols are displayed</p>

    <div class="flex">
      <TableJsonView
        value={{
          stringKey: 'string value',
          anotherKey: 2,
          [symbolKey]: 'my key is a symbol',
        }}
        name="objectWithSymbolKey"
        {showLength}
        {showTypes}
        {stringCollapse}
        {draggable}
        class={theme}
      />
    </div>
  </div>

  <div class="flex col">
    <h2>urls</h2>
    <p>special handling of URLs and URLSearchParams</p>

    <div class="flex">
      <TableJsonView
        value={{
          url: new URL('https://subdomain.example.org/about'),
          fullyFeaturedUrl: new URL(
            'https://anon:hunter2@example.org:8080/pathname/index.html?q=query&p=123#result'
          ),
          search: new URLSearchParams([
            ['a', '1'],
            ['a', '2'],
            ['b', '3'],
            ['b', '4'],
            ['c', '5'],
          ]),
        }}
        name="urlFeatures"
        {showLength}
        {showTypes}
        {stringCollapse}
        {draggable}
        class={theme}
      />
    </div>
  </div>

  <div class="flex col">
    <h2>multi-line strings</h2>
    <p>configurable display of multi-line strings</p>

    <div class="flex" style="gap: 2em">
      <TableJsonView
        value={'normal \n boring \n string'}
        {...options}
        stringRender="stringify"
        class={theme}
      />

      <TableJsonView
        value={'cool \n multi-line \n  render 😎'}
        {...options}
        stringRender="pre"
        class={theme}
      />
    </div>
  </div>

  <div class="flex col">
    <h2>other</h2>
    <p>other types handled includes Error, Date, regexp</p>
    <p>you can also go wild with nesting</p>

    <div class="flex">
      <TableJsonView
        value={{
          dateValue: new Date(),
          reg: /^[re(g)ex]$/,
          error,
        }}
        {...options}
        class={theme}
      />
    </div>
  </div>-->

  <div
    class="options"
    bind:this={div}
    class:showLength
    style:opacity={showLength ? 1 : 0.95}
    data-lol="hei"
  >
    <label>
      <input type="checkbox" bind:checked={draggable} />
      draggable
    </label>

    <label>
      <input type="checkbox" bind:checked={showLength} />
      show length of entries
    </label>

    <label>
      <input type="checkbox" bind:checked={showTypes} />
      show types
    </label>

    <label>
      collapse strings
      <input type="number" bind:value={stringCollapse} />
    </label>

    <label>
      string mode
      <select bind:value={stringRender}>
        <option>stringify</option>
        <option>pre</option>
      </select>
    </label>

    <label>
      theme
      <select bind:value={theme}>
        <option>dracula</option>
        <option>monokai</option>
        <option>solarized-dark</option>
        <option>default-dark</option>
        <option>default-light</option>
        <option>none (uggo)</option>
      </select>
    </label>

    <!-- <Inspect value={options} name={'options'} {...options} style="margin: auto" /> -->
  </div>
  <!-- <Inspect
    value={{
      normal: 'normal',
      number: 2,
      object: {
        name: 'obj',
      },
      aString: 'hey',
      array: [1, 2, 3],
      aList: [1, 2, 3],
    }}
    name={'demo'}
    {...options}
  /> -->
  <Inspect
    name="test"
    value={{
      a: {
        b: { hey: 'wassup' },
      },
    }}
  />
  <Inspect value={allTypesValue} name={'allTypes'} {...options} />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 2em;
  }

  .options {
    margin: 4px;
    /* position: fixed; */
    /* height: max-content; */
    /* top: 0; */
    /* right: 0; */
    gap: 1em;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    flex-direction: row;
    align-items: flex-start;
    justify-items: flex-start;
    border: 1px solid black;
    background-color: cadetblue;
  }

  label {
    height: 3.5rem;
    display: flex;
    border: 1px solid;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    gap: 0.5rem;
    padding: 1em;
  }
</style>
