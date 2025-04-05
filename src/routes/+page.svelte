<script lang="ts">
  // import { page } from '$app/stores'
  import Inspect from '$lib/Inspect.svelte'

  let { data } = $props()
</script>

<div class="center">
  <Inspect
    showTools
    style="max-width: 640px"
    name="packageInfo"
    value={{
      name: 'svelte-inspect-value',
      installCommands: [
        'copy to clipboard 👉',
        'npm install svelte-inspect-value',
        'pnpm add svelte-inspect-value',
        'bun add svelte-inspect-value',
        'yarn add svelte-inspect-value',
      ],
      npm: {
        package: 'https://www.npmjs.com/package/svelte-inspect-value',
        'dist-tags': data.packageMetaData['dist-tags'],
        versions: data.packageMetaData.versions,
      },
      github: 'https://github.com/ampled/svelte-inspect-value',
      docs: 'https://inspect.eirik.space/',
      playground: 'https://svelte.dev/playground/956365d6905c44298234ff4d9c60741e?version=5.17.3',
    }}
  />
</div>

<h2>What it is</h2>
<p>
  Svelte Inspect Value is a "JSON tree"-like value inspector.<br />

  The main purpose of the component is to be a developer utility. When developing apps it can be
  useful to have a "live" preview of state like API data, form values, the state of a promise and so
  on.
</p>

<h2>Features</h2>

<p>
  The <a href="/examples">examples page</a> is the quickest way to get an overview of what this component
  can do, but here is a list of its key features:
</p>

<ul>
  <li>Display arrays & objects in a tree-like view</li>
  <li>Support for most JavaScript built-ins, including <code>Set</code> and <code>Map</code></li>
  <li>
    Syntax highlighting for functions and html elements (outer selector) using <code>hljs</code>
  </li>
  <li>Embed media if string ends with image / audio extension (optional)</li>
  <li>Customizable colors</li>
  <li>Configurable with global options utility as alternative to passing props</li>
</ul>

<style>
  .center {
    display: flex;
    justify-content: flex-start;
  }
</style>
