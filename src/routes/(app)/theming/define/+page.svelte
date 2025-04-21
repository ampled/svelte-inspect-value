<script lang="ts">
  import DevOnly from '$lib/components/DevOnly.svelte'
  import Console from '$lib/icons/Console.svelte'
  import Inspect from '$lib/Inspect.svelte'
  import { colord } from 'colord'
  import HueRotate from '../HueRotate.svelte'
  import { themes } from '../themes.js'
  import Theming from '../Theming.svelte'

  let font = $state('monospace')
  let fontSize = $state(12)
  let fontSizePx = $derived(fontSize + 'px')
  let indent = $state(0.75)
  let colors = $state({ ...themes.inspect })
  let lockedColors = $state<string[]>([])
  let keys = $derived(Object.keys(colors) as (keyof typeof colors)[])
  let rotated = $state<typeof colors>()
  let rotation = $state(0)
  let steps = $state<(typeof colors)[]>([{ ...themes.inspect }])
  let currentStep = $state(0)

  let currentColors = $derived(rotated == null ? colors : rotated)

  let style = $derived(keys.map((k) => `${k}: ${currentColors[k]};`).join(''))

  let presets = Object.keys(themes) as (keyof typeof themes)[]
  let selectedPreset = $state<keyof typeof themes>('inspect')

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
    <Theming
      --indent="{indent}em"
      --inspect-font={font}
      --inspect-font-size={fontSizePx}
      {style}
      {colors}
    />
  </div>
</div>

<div class="flex row flex-wrap gap">
  <label>
    indent (em)
    <input type="number" style="max-width: 5em" step={0.125} bind:value={indent} />
  </label>
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

<h2>Extended customization</h2>

<p>
  Behind the scenes, the base16 theme is mapped to internal CSS-variables. This mapping can be
  overriden by setting additional CSS-variables on your custom theme class or passing them to the
  component.<br />
  See the <a href="/theming/vars">full overview</a> of available css-variables than can be passed to
  <code>Inspect</code>.
</p>

<pre>
{'<'}<span style="color:var(--blue);">Inspect</span>
<span style="padding-left: 1em;color: var(--green);">theme</span>=<span
    style="color: var(--yellow);">"inspect"</span
  >
<span style="padding-left: 1em;color: var(--green);">value</span>=<span
    style="color: var(--yellow);">{'{'}...{'}'}</span
  >
<span class="value" style="padding-left: 1em;">--inspect-background</span>=<span
    style="color: var(--yellow);">"linear-gradient(45deg, var(--base00) 50%, hotpink)"</span
  >
<span class="value" style="padding-left: 1em;">--caret-color</span>=<span
    style="color: var(--yellow);">"white"</span
  >
<span class="value" style="padding-left: 1em;">--caret-focus-color</span>=<span
    style="color: var(--yellow);">"hotpink"</span
  >
<span class="value" style="padding-left: 1em;">--bullet-color</span>=<span
    style="color: var(--yellow);">"hotpink"</span
  >
<span class="value" style="padding-left: 1em;">--string-value-color</span>=<span
    style="color: var(--yellow);">"var(--base08)"</span
  >
{'/>'}
</pre>

Result:
<Inspect
  theme="inspect"
  --inspect-background="linear-gradient(45deg, var(--base00) 50%, hotpink)"
  --caret-color="white"
  --caret-focus-color="hotpink"
  --bullet-color="hotpink"
  --string-value-color="var(--base08)"
  value={{
    test: 'lorem ipsum dolor sit amet',
  }}
/>

<style>
  .row {
    gap: 0;
    justify-content: center;
    align-items: center;
  }

  label {
    display: flex;
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
    background-color: var(--bg);
    border-radius: 8px;
    border: 1px solid var(--docs-border-color);
    padding: 1em;
    overflow-x: auto;

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
