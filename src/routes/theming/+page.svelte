<script lang="ts">
  import { dev } from '$app/environment'
  import Console from '$lib/icons/Console.svelte'
  import Inspect from '$lib/Inspect.svelte'
  import { colord } from 'colord'
  import Code from '../../doclib/Code.svelte'
  import AllTypes from '../../doclib/examples/AllTypes.svelte'
  import HueRotate from './HueRotate.svelte'
  import { themes } from './themes.js'

  let font = $state('monospace')
  let fontSize = $state(12)
  let fontSizePx = $derived(fontSize + 'px')
  let colors = $state({ ...themes.drak })
  let lockedColors = $state<string[]>([])
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
      ...Object.fromEntries(
        keys.map((k) => [
          k,
          lockedColors.includes(k)
            ? colors[k as keyof typeof colors]
            : colord(colors[k]).rotate(value).toHex(),
        ])
      ),
    } as typeof colors
  }

  function loadPreset() {
    applyToUnlocked({ ...themes[selectedPreset] })
    saveStep()
    rotated = undefined
    rotation = 0
  }

  function applyToUnlocked(newColors: typeof colors) {
    colors = Object.fromEntries(
      keys.map((k) => {
        if (lockedColors.includes(k)) {
          return [k, colors[k]]
        } else {
          return [k, newColors[k]]
        }
      })
    ) as typeof colors
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
    steps.push($state.snapshot(colors))
    if (changeCurrentStep) currentStep = steps.length - 1
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

<AllTypes {style} --inspect-font={font} --inspect-font-size={fontSizePx} />
{#if dev}
  <Inspect value={{ steps, currentStep }} />
{/if}

<div class="flex row flex-wrap">
  {#each keys as key}
    {@const locked = lockedColors.includes(key)}
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
      <button
        type="button"
        title="set transparent"
        class="unstyled sm"
        onclick={() => {
          if (locked) {
            lockedColors = lockedColors.filter((k) => k !== key)
          } else {
            lockedColors.push(key)
          }
        }}><small>{locked ? 'unlock' : 'lock'}</small></button
      >
    </label>
  {/each}
</div>

<div class="flex row flex-wrap gap">
  <label>
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
  </label>
  <button class="unstyled" style="width: 2em; height: 2em;">
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
    if (rotated) applyToUnlocked({ ...rotated })
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
