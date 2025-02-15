<script lang="ts">
  import DevOnly from '$lib/components/DevOnly.svelte'
  import Console from '$lib/icons/Console.svelte'
  import Inspect from '$lib/Inspect.svelte'
  import { colord } from 'colord'
  import HueRotate from './HueRotate.svelte'
  import './theme.css'
  import { themes } from './themes.js'
  import Theming from './Theming.svelte'

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

<h2>Theming</h2>

<p>
  <code>Inspect</code> has 16 css variables that can be set directly on the component or via a
  (global) class.<br />
  If you have favorite <a href="https://github.com/chriskempson/base16">base16</a> color-scheme it
  should probably be supported very well. The variables <code>base04, base06</code> and
  <code>base0F</code>
  is currently not used by any default components, but is still defined and can be used in
  <a href="/custom">custom components.</a><br />

  More fine-grained control might be implemented in the future.
</p>

<div class="flex row gap align-end">
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

<!-- <AllTypes {style} --inspect-font={font} --inspect-font-size={fontSizePx} /> -->

<div class="colors-and-preview">
  <div class="colors">
    {#each keys as key}
      {@const locked = lockedColors.includes(key)}
      <label class="color">
        {key.replaceAll('--base', '')}
        <div class="colorpicker">
          <input
            type="color"
            bind:value={currentColors[key]}
            onchange={() => saveStep()}
            defaultValue="#ffffff"
            disabled={rotated != null || locked}
          />
        </div>
        <!-- <button
          type="button"
          disabled={rotated != null || currentColors[key] === 'transparent'}
          title="set transparent"
          class="unstyled"
          onclick={() => {
            colors[key] = 'transparent'
            saveStep()
          }}>x</button
        > -->
        <DevOnly>
          <button
            type="button"
            title="lock"
            class="unstyled sm lock"
            onclick={() => {
              if (locked) {
                lockedColors = lockedColors.filter((k) => k !== key)
              } else {
                lockedColors.push(key)
              }
            }}><small>{locked ? 'unlock' : 'lock'}</small></button
          >
        </DevOnly>
      </label>
    {/each}
  </div>
  <div style="flex-basis: 100%">
    <Theming --inspect-font={font} --inspect-font-size={fontSizePx} {style} {colors} />
  </div>
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
  <button
    class="unstyled"
    style="width: 2em; height: 2em;"
    onclick={() => console.log($state.snapshot(colors))}
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
    if (rotated) applyToUnlocked({ ...rotated })
    saveStep()
    rotated = undefined
    rotation = 0
  }}
/>

<DevOnly>
  <Inspect value={{ steps, currentStep }} />
</DevOnly>

<!-- <pre>
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
</pre> -->

<h2>Defining a theme</h2>

<p>
  Add your custom theme class to a global css file and import it, then set the theme-class using the
  class or theme-prop on the inspect component or via global options.
</p>

<pre>
<span class="selector">.my-inspect-theme</span> {'{'}
{#each keys as key, i (key)}<span class="key">{key}</span>: <span class="value">{colors[key]}</span
    >;{#if i !== 15}<br />{/if}{/each}
{'}'}</pre>
<p>Alternatively, set css variables directly on the component.</p>
<pre>
{'<'}<span style="color:var(--blue);">Inspect</span>
  <span style="color: var(--green)">theme</span>=""
{#each keys as key, i (key)}<span class="value" style="padding-left: 1em;">{key}</span>=<span
      style="color: var(--yellow);">"{colors[key]}"</span
    >{#if i !== 15}<br />{/if}{/each}
{'/>'}
</pre>

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

  .colors-and-preview {
    display: flex;
    flex-direction: column-reverse;
  }

  .colors {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  label.color {
    display: flex;
    flex-direction: column;
  }

  .lock {
    min-width: 37px;
    text-align: center;
  }

  @media (min-width: 1024px) {
    .colors-and-preview {
      flex-direction: row;
      gap: 1em;
      justify-content: center;
      margin-left: 1em;
    }

    .colors {
      flex-direction: column;
      justify-content: space-between;
    }

    label.color {
      flex-direction: row;
      gap: 1em;
    }
  }

  .colorpicker {
    width: 3.5em;
    height: 2em;
    overflow: hidden;
    position: relative;
    outline: 1px solid white;
    border-radius: 4px;
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

  pre {
    font-size: 12px;
    background-color: var(--bg-lighter);
    border-radius: 8px;
    border: 1px solid var(--border-color);
    padding: 1em;

    .key {
      padding-left: 1em;
    }

    .selector {
      color: var(--green);
    }

    .value {
      color: var(--blue);
    }
  }
</style>
