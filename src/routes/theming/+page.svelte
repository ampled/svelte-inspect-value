<script lang="ts">
  import { browser, dev } from '$app/environment'
  import Console from '$lib/icons/Console.svelte'
  import Inspect from '$lib/Inspect.svelte'
  import { colord } from 'colord'
  import { onMount } from 'svelte'
  import Code from '../../doclib/Code.svelte'
  import HueRotate from './HueRotate.svelte'
  import { themes } from './themes.js'

  let font = $state('monospace')
  let fontSize = $state(12)
  let fontSizePx = $derived(fontSize + 'px')
  let colors = $state({ ...themes.drak })
  let keys = $derived(Object.keys(colors) as (keyof typeof colors)[])
  let rotated = $state<typeof colors>()
  let rotation = $state(0)
  let steps = $state<(typeof colors)[]>([{ ...themes.drak }])
  let currentStep = $state(0)

  let currentColors = $derived(rotated == null ? colors : rotated)

  let style = $derived(keys.map((k) => `${k}: ${currentColors[k]};`).join(''))
  let classPreview = $derived(`.inspect-theme {
${style
  .split(';')
  .filter(Boolean)
  .map((s) => `  ${s};\n`)
  .join('')}}
`)

  let presets = Object.keys(themes) as (keyof typeof themes)[]
  let selectedPreset = $state<keyof typeof themes>('drak')

  $effect(() => {
    if (rotation !== 0) rotateColors(rotation)
  })

  function rotateColors(value: number) {
    rotated = {
      ...Object.fromEntries(keys.map((k) => [k, colord(colors[k]).rotate(value).toHex()])),
    } as typeof colors
  }

  function loadPreset() {
    colors = { ...themes[selectedPreset] }
    saveStep()
    rotated = undefined
    rotation = 0
  }

  function undo() {
    let prevStep = steps[currentStep - 1]

    if (prevStep) {
      colors = { ...prevStep }
      currentStep -= 1
    }
  }

  function redo() {
    let nextStep = steps[currentStep + 1]

    if (nextStep) {
      colors = { ...nextStep }
      currentStep += 1
    }
  }

  function saveStep(changeCurrentStep = true) {
    console.log('saveStep')
    steps.push($state.snapshot(colors))
    if (changeCurrentStep) currentStep = steps.length - 1
  }

  class Greeter {
    static staticProperty = 'hi'
    public nonStatic = 'yo'
  }

  const allTypes = $state({
    battery: undefined,
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
        console.log(value)
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
    str: 'string',
    multiline: 'line\nline\nline\nline\nline\nline\nline\nline\nline',
    number: 1234,
    bools: true,
    bigint: 1n + 1n,
    symb: Symbol('abcd'),
    undef: undefined,
    reg: /cake/,
    nil: null,
    array: [1, 2, 3],
    nestedArrays: [
      14,
      [[[[[[[[[13], 12], 11], 10], 9], 8], 7], 6], 5],
      'ffffffoooooooouuuuuuurrrrrrrrrrrr',
      3,
      2,
      1,
    ],
    object: { normalKey: 'string value', [Symbol('key')]: 'oh\n\n\n\n      hi', boolean: false },
    date: new Date(),
    url: new URL('https://alicebob.website/?ref=abcdefg#about'),
    promise: Promise.resolve({
      name: 'a',
      b: { name: 'b', c: { name: 'c', d: { name: 'd' } } },
      g: [{ name: 'b', c: { name: 'c', d: { name: 'd' } } }],
      d: {},
    }),
    a: { b: { name: 'b', c: { name: 'c', d: { name: 'd' } } }, g: [{}], d: {}, name: 'a' },
    functions: {
      double: (value: number) => 2 * value,
      normalFunction: function (some: string, thing: string) {
        const { log } = console
        log(some + 'thing')
        return 'some' + thing
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
    nestedTypedArrays: [
      {
        eight: new Int8Array([1, 2, 3]),
        sixteen: new Int16Array([1, 2, 3, 4, 5]),
        thirtytwo: new Int32Array([1, 2, 3, 4, 5]),
      },
    ],
    classCtr: Greeter,
    classInstance: new Greeter(),
    classNoEntries: class Foo {},
    empties: {
      object: {},
      array: [],
      set: new Set(),
      map: new Map(),
      string: '',
    },
  })

  onMount(() => {
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // ;(navigator as any).getBattery().then((batt: unknown) => {
    //   allTypes.battery = batt as unknown as undefined
    // })
  })
</script>

<div class="flex row gap">
  <label>
    presets
    <select bind:value={selectedPreset}>
      {#each presets as preset}
        <option>{preset}</option>
      {/each}
    </select>
  </label>
  <button onclick={loadPreset}> load </button>
</div>

<Inspect
  name="allTypes"
  {style}
  --inspect-font={font}
  --inspect-font-size={fontSizePx}
  value={allTypes}
/>
{#if dev}
  <Inspect value={{ steps, currentStep }} />
{/if}

<div class="flex row flex-wrap">
  {#each keys as key}
    <label>
      {key.replaceAll('--base', '')}
      <div class="colorpicker">
        <input
          type="color"
          bind:value={currentColors[key]}
          onchange={() => saveStep()}
          defaultValue="#ffffff"
          disabled={rotated != null}
        />
      </div>
      <button
        type="button"
        disabled={rotated != null || currentColors[key] === 'transparent'}
        title="set transparent"
        class="unstyled"
        onclick={() => {
          colors[key] = 'transparent'
          saveStep()
        }}>x</button
      >
    </label>
  {/each}
</div>

<div class="flex row flex-wrap gap">
  <!-- <label>
    font (local)
    <select bind:value={font}>
      <option>monospace</option>
      <option>Menlo</option>
      <option>Monaco</option>
      <option>Consolas</option>
      <option>Pixel Code</option>
      <option>Dank Mono</option>
      <option>Fira Code</option>
      <option>Andale Mono</option>
      <option>Comic Sans MS</option>
    </select>
  </label>
  <label>
    font-size
    <input type="number" bind:value={fontSize} />
  </label> -->
  <button
    class="unstyled"
    onclick={() => console.log($state.snapshot(currentColors))}
    style="width: 2em; height: 2em;"
  >
    <Console />
  </button>
  <button class="unstyled" type="button" disabled={steps[currentStep - 1] == null} onclick={undo}
    >undo</button
  >
  <button class="unstyled" type="button" disabled={steps[currentStep + 1] == null} onclick={redo}
    >redo</button
  >
</div>

<HueRotate
  bind:rotation
  oncancel={() => {
    rotated = undefined
    rotation = 0
  }}
  onapply={() => {
    if (rotated) colors = { ...rotated }
    saveStep()
    rotated = undefined
    rotation = 0
  }}
/>

<pre>
base00  Default Background
base01  Lighter Background (Used for status bars, line number and folding marks)
base02  Selection Background
base03  Comments, Invisibles, Line Highlighting
base04  Dark Foreground (Used for status bars)
base05  Default Foreground, Caret, Delimiters, Operators
base06  Light Foreground (Not often used)
base07  Light Background (Not often used)
base08  Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
base09  Integers, Boolean, Constants, XML Attributes, Markup Link Url
base0A  Classes, Markup Bold, Search Text Background
base0B  Strings, Inherited Class, Markup Code, Diff Inserted
base0C  Support, Regular Expressions, Escape Characters, Markup Quotes
base0D  Functions, Methods, Attribute IDs, Headings
base0E  Keywords, Storage, Selector, Markup Italic, Diff Changed
base0F  Deprecated, Opening/Closing Embedded Language Tags, e.g. {'<?php ?>'}
</pre>
<Code code={classPreview} language="css" />

<style>
  .row {
    gap: 0;
    justify-content: center;
    align-items: center;
  }

  label {
    display: flex;
    /* border-right: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color); */
    /* padding: 0.5em; */
  }

  .colorpicker {
    width: 3.5em;
    height: 3.5em;
    overflow: hidden;
    position: relative;
  }

  input[type='color'] {
    aspect-ratio: 1 / 1;
    height: 50em;
    width: 40em;
    position: absolute;
    top: -5px;
    left: -5px;
    border: none;
    padding: 0;
    margin: 0;
    background-color: transparent;
    cursor: pointer;
  }
</style>
