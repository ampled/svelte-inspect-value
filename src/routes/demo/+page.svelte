<script lang="ts">
  // import './app.css'
  import Inspect from '$lib/Inspect.svelte'
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  import { intervalEffect } from '$lib/util/interval-effect.svelte.js'

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
    class: theme,
    draggable,
  })

  let div = $state()

  let returnValue = <T,>(value: T) => value

  let date = $state(new Date())

  let symbolKey = Symbol('key')

  let image: HTMLImageElement | undefined = $state()

  let error: Error | undefined = $state()

  let colors = $state({
    '--base00': '#000000',
    '--base01': '#000000',
    '--base02': '#000000',
    '--base03': '#000000',
    '--base04': '#000000',
    '--base05': '#FFFFFF',
    '--base06': '#000000',
    '--base07': '#000000',
    '--base08': '#000000',
    '--base09': '#000000',
    '--base0A': '#000000',
    '--base0B': '#000000',
    '--base0C': '#000000',
    '--base0D': '#000000',
    '--base0E': '#000000',
    '--base0F': '#000000',
  })

  let indentMultiplier = $state(1)

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

    allTypesValue.promises = {
      neverResolve: new Promise(() => {}),
      resolveInAFew: new Promise((resolve) => {
        setTimeout(() => {
          resolve('yeah')
        }, 2000)
      }),
      rejectsInAFew: new Promise((_, reject) => {
        setTimeout(() => {
          reject('nope')
        }, 3500)
      }),
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

  let number = $state(90)
  intervalEffect(() => allTypesValue.number++, 1000)

  $effect(() => {
    allTypesValue.htmlElements = div as any
  })

  let allTypesValue = $state({
    number: 90,
    string: 'hello',
    boolean: true,
    reg: /^[re(g)ex]$/,
    promises: {},
    multiLineString: 'line one\n  line two\n    line three',
    bigInteger: 1n,
    arrays: [undefined, null],
    htmlElements: undefined,
    maps: new Map<any, any>([
      ['stringKey', 'stringValue'],
      [symbolKey, 'my map key is a symbol'],
      [{ name: 'object key' }, 'my key is an object'],
      [
        ['array key'],
        Array(3)
          .fill(0)
          .map((v, i) => (i + 1) * 100),
      ],
    ]),
    sets: new Set([1, 2, 3]),
    urls: new URL(
      'http://anon:hunter2@example.org:8080/pathname?query=value&multi=1&multi=2#result'
    ),
    // errorUrl: new URL('f,f,f,f,f.f..f....'),
    // anotherSearch: new URLSearchParams('?q&b=foo'),
    date: new Date(),
    symbolProp: Symbol('i am a symbol'),
    [symbolKey]: 'my key is a symbol',
    arrowFunction: returnValue,
    normalFunction() {
      return 'normal'
    },
    classWithStaticProperties: Greeter,
    instanceOfClass: new Greeter('World'),
    simpleClass: class SimpleClass {},
    error: new TypeError('can not access property of undefined'),
  })

  let styleTag = $derived(
    Object.entries(colors)
      .map(([k, v]) => `${k}: ${v}`)
      .join(';')
  )

  // $inspect(colors)
</script>

{Object.entries(colors)
  .map(([k, v]) => `${k}: ${v}`)
  .join(';')}

<div class="demo" style="--indent-multiplier: {indentMultiplier}">
  <Inspect
    --indent-multiplier={indentMultiplier}
    value={allTypesValue}
    name={'objects'}
    {...options}
    noanimate={false}
  />
</div>

<div class="flex row" style="gap; 1em">
  <!-- {#each Object.entries(colors) as [key, value]}
    <input type="color" bind:value={colors[key as keyof typeof colors]} />
  {/each} -->
  <input bind:value={indentMultiplier} type="number" step={0.1} />
  <select bind:value={theme}>
    <option>drak</option>
    <option>dracula</option>
    <option>solarized-dark</option>
    <option>default-dark</option>
    <option>default-light</option>
    <option>none</option>
    <!-- <option>dracula</option> -->
  </select>
</div>

<div
  bind:this={div}
  class="flex items-center"
  style="opacity: 0; text-align: center"
  data-testid="hiddendiv"
></div>

<style>
  .demo {
    /* display: flex; */
    justify-content: center;
    max-width: 100%;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
  }
</style>
