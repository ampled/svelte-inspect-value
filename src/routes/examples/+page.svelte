<script lang="ts">
  import { browser } from '$app/environment'
  import Inspect from '$lib/Inspect.svelte'
  import { onMount } from 'svelte'
  import BasicEditable from '../../doclib/examples/BasicEditable.svelte'
  import EmbedMedia from '../../doclib/examples/EmbedMedia.svelte'
  import HtmlElements from '../../doclib/examples/HTMLElements.svelte'
  import MapAndSet from '../../doclib/examples/MapAndSet.svelte'
  import Promises from '../../doclib/examples/Promises.svelte'
  import SymbolKeys from '../../doclib/examples/SymbolKeys.svelte'

  let image: HTMLImageElement | undefined = $state()

  let error: Error | undefined = $state()

  onMount(() => {
    if (browser) {
      image = new Image()
      image.src = 'favicon.png'
    }

    try {
      let lol: unknown
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions, @typescript-eslint/no-explicit-any
      ;(lol as any).doesNotHaveProperty
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

    public method() {
      return 'hei'
    }

    toString() {
      return 'nonononono'
    }
  }
</script>

<BasicEditable />

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
    />
  </div>
</div>

<div class="flex col">
  <h2>multi-line strings</h2>
  <p>expandable view for multi-line strings</p>

  <div class="flex">
    <Inspect value={['normal boring string', 'cool \n multi-line \n  render 😎']} name="strings" />
  </div>
</div>

<EmbedMedia />

<div class="flex col">
  <h2>other</h2>
  <p>other types handled includes Error, Date, regexp</p>

  <div class="flex">
    <Inspect
      value={{
        dateValue: new Date(),
        reg: /^[re(g)ex]$/,
        error,
      }}
    />
  </div>
</div>

<style>
  /* .options {
    margin: 4px;

    gap: 1em;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    flex-direction: row;
    align-items: flex-start;
    justify-items: flex-start;
    border: 1px solid black;
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
  } */
</style>
