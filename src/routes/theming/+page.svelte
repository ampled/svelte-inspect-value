<script lang="ts">
  import Console from '$lib/icons/Console.svelte'
  import Inspect from '$lib/Inspect.svelte'
  import { colord } from 'colord'
  import Code from '../../doclib/Code.svelte'
  import { themes } from './themes.js'

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

  const allTypes = {
    str: 'string',
    multiline: 'line\nline\nline\nline\nline\nline\nline\nline\nline',
    number: 1234,
    bools: true,
    bigint: 1n + 1n,
    symb: Symbol('abcd'),
    builtIns: {
      string: String,
      asdf: (a: number) => a * 2,
    },
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
    object: { normalKey: 'string value', [Symbol('key')]: 'oh\n\n\n\n      hi' },
    date: new Date(),
    url: new URL('https://alicebob.website/?ref=abcdefg#about'),
    promise: Promise.resolve({
      name: 'a',
      b: { name: 'b', c: { name: 'c', d: { name: 'd' } } },
      g: [{ name: 'b', c: { name: 'c', d: { name: 'd' } } }],
      d: {},
    }),
    a: { b: { name: 'b', c: { name: 'c', d: { name: 'd' } } }, g: [{}], d: {}, name: 'a' },
    asyncfn: async function () {
      const boop = await Promise.resolve('boop')
      return boop
    },
    onelinerArrow: () => 2,
    normalFunction: function (some: string, thing: string) {
      const { log } = console
      log(some + 'thing')
      return 'some' + thing
    },
    errors: {
      error: new Error('oh no!'),
      typeerror: new TypeError('snapple'),
    },
    set: new Set([1, 2, 3]),
    weakSet: new WeakSet(),
    map: new Map<unknown, unknown>([
      [0, 0],
      [{ id: 123 }, 1],
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
    emptyObject: {},
    [Symbol('hi')]: 'hi',
    test: {
      [Symbol('hi')]: 'hi',
    },
  }
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

<Inspect value={{ steps, currentStep }} />
<Inspect {style} value={allTypes} />

<div class="flex row flex-wrap">
  {#each keys as key}
    <label>
      {key.replaceAll('--base', '')}
      <input
        type="color"
        bind:value={currentColors[key]}
        onchange={() => saveStep()}
        defaultValue="#ffffff"
        disabled={rotated != null}
      />
      <button
        type="button"
        disabled={rotated != null || currentColors[key] === 'transparent'}
        title="set transparent"
        class="set-transparent"
        onclick={() => {
          colors[key] = 'transparent'
          saveStep()
        }}>x</button
      >
    </label>
  {/each}
  <button
    onclick={() => console.log($state.snapshot(currentColors))}
    style="width: 2em; height: 2em;"
  >
    <Console />
  </button>
  <button type="button" disabled={steps[currentStep - 1] == null} onclick={undo}>undo</button>
  <button type="button" disabled={steps[currentStep + 1] == null} onclick={redo}>redo</button>
</div>

<label>
  hue rotate
  <div class="flex row">
    <input type="number" min={-360} max={360} bind:value={rotation} defaultValue={0} />
    <input type="range" min={-360} max={360} bind:value={rotation} defaultValue={0} />
  </div>
  {rotation}
</label>
<div class="flex row gap">
  <button
    type="button"
    title="clear rotation"
    class="set-transparent"
    disabled={rotation === 0}
    onclick={() => {
      rotated = undefined
      rotation = 0
    }}>cancel</button
  >

  <button
    type="button"
    title="set transparent"
    disabled={rotation === 0}
    class="set-transparent"
    onclick={() => {
      if (rotated) colors = { ...rotated }
      saveStep()
      rotated = undefined
      rotation = 0
    }}>apply</button
  >
</div>
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

  .gap {
    gap: 1em;
  }

  label {
    display: flex;
    /* border-right: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color); */
    padding: 0.5em;
  }

  input[type='range'] {
    flex-basis: 100%;
    width: 100%;
  }

  input[type='color'] {
    aspect-ratio: 1 / 1;
    height: 2em;
    width: 2em;
    border: none;
    padding: 0;
    margin: 0;
    background-color: transparent;
  }

  .set-transparent {
    all: unset;
    cursor: pointer;

    &:disabled {
      color: var(--border-color);
    }
  }
</style>
