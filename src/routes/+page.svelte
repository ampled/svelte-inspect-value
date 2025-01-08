<script lang="ts">
  // import './app.css'
  import { browser } from '$app/environment'
  import Inspect from '$lib/Inspect.svelte'
  import { setGlobalInspectOptions } from '$lib/options.svelte.js'
  import { onMount } from 'svelte'
  import HtmlElements from '../doclib/examples/HTMLElements.svelte'
  import MapAndSet from '../doclib/examples/MapAndSet.svelte'
  import Promises from '../doclib/examples/Promises.svelte'
  import SymbolKeys from '../doclib/examples/SymbolKeys.svelte'

  let showLength = $state(true)
  let showTypes = $state(true)
  let stringCollapse = $state(0)
  let stringRender: 'stringify' | 'pre' = $state('pre')
  let theme = $state('drak')
  let draggable = $state(false)

  let options = $derived({
    showLength,
    showTypes,
    stringCollapse,
    stringRender,
    theme,
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
    svelteComponent: Inspect,
    simpleClass: class SimpleClass {},
    error: new TypeError('can not access property of undefined'),
    arr: [{ name: 'alice' }, { name: 'bob gunderson' }],
  })

  let jsonString = $state(JSON.stringify({ anObject: { name: 'Carl' } }))

  let showOptions = $state(true)

  setGlobalInspectOptions({ showTypes: false, theme: 'monokai' })

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
        {...options}
      />
    </div>
  </div>

  <MapAndSet />

  <Promises />

  <HtmlElements />

  <div class="flex col">
    <h2>class</h2>
    <p>display static properties of classes (but not on instances.)</p>

    <div class="flex">
      <Inspect
        value={{
          class: Greeter,
          classInstance: new Greeter('world'),
        }}
        {...options}
      />
    </div>
  </div>

  <div class="flex col">
    <h2>functions</h2>
    <p>display bodies of arrow functions (experimental)</p>

    <div class="flex">
      <Inspect
        name="functions"
        value={{
          arrowFunction: (num: number) => num * 2,
          someFunction: function (some: string, thing: string) {
            if (!some) return thing
            const obj = {
              some: thing,
              thing: some,
              [Symbol('oh')]: 'doodle',
            }

            try {
              Math.random()
            } catch {
              const { log } = console
              log('oh no')
              log(obj)
            }
            return some + ' ' + thing
          },
        }}
        {...options}
      />
    </div>
  </div>

  <SymbolKeys />

  <div class="flex col">
    <h2>urls</h2>
    <p>special handling of URLs and URLSearchParams</p>

    <div class="flex">
      <Inspect
        value={{
          url: new URL('https://subdomain.example.org/about'),
          fullyFeaturedUrl: new URL(
            'https://anon:hunter2@example.org:8080/pathname/index.html?q=query&p=123&buh#result'
          ),
          search: new URLSearchParams([
            ['a', '1'],
            ['a', '2'],
            ['b', '3'],
            ['b', '4'],
            ['c', '5'],
            ['query', 'elephants'],
          ]),
        }}
        name="urlFeatures"
        {...options}
      />
    </div>
  </div>

  <div class="flex col">
    <h2>multi-line strings</h2>
    <p>expandable view for multi-line strings</p>

    <div class="flex">
      <Inspect
        value={['normal boring string', 'cool \n multi-line \n  render 😎']}
        {...options}
        name="strings"
        class={theme}
      />
    </div>
  </div>

  <div class="flex col">
    <h2>other</h2>
    <p>other types handled includes Error, Date, regexp</p>
    <p>you can also go wild with nesting</p>

    <div class="flex">
      <Inspect
        value={{
          dateValue: new Date(),
          reg: /^[re(g)ex]$/,
          error,
        }}
        {...options}
        class={theme}
      />
    </div>
  </div>
  <!-- {#if showOptions}
    <div
      class="options"
      bind:this={div}
      class:showLength
      style:opacity={showLength ? 1 : 0.95}
      data-testid="options"
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
        theme
        <select bind:value={theme}>
          <option>dracula</option>
          <option>monokai</option>
          <option>solarized-dark</option>
          <option>default-dark</option>
          <option>default-light</option>
          <option></option>
        </select>
      </label>
    </div>
  {/if} -->

  <!-- <Inspect value={allTypesValue} name={'allTypes'} {...options} /> -->
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
    /* background-color: cadetblue; */
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
