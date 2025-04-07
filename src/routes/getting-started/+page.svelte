<script lang="ts">
  // import { page } from '$app/stores'
  import Inspect from '$lib/Inspect.svelte'
  import { SvelteMap } from 'svelte/reactivity'
  import Code from '../../doclib/Code.svelte'
  import ConfiguredExample from '../../doclib/examples/ConfiguredExample.svelte'
  import globalConfigCode from '../../doclib/examples/globalconfig.txt?raw'
  import globalConfigCodeLayout from '../../doclib/examples/globalconfiglayout.txt?raw'
  import inlineconfigcode from '../../doclib/examples/inlineconfig.txt?raw'
  import MinimalExample from '../../doclib/examples/MinimalExample.svelte'
  import minimalcode from '../../doclib/examples/minimalexample.txt?raw'
  import MinimalExampleValues from '../../doclib/examples/MinimalExampleValues.svelte'
  import MultiCode from '../../doclib/examples/MultiCode.svelte'

  let { data } = $props()
  let { minimalCode, valuesCode, configuredCode } = $derived(data.codeSamples)

  const packageName = 'svelte-inspect-value'
  let stringCollapse = $state(20)

  const toc = new SvelteMap<string, string>([
    ['Usage & Conditional Rendering', 'usage'],
    ['Inspect.Values', 'values'],
    ['Global Options', 'global'],
    ['Props', 'props'],
  ])
</script>

<div class="toc">
  {#each toc as [title, id]}
    <a href={`#${id}`}>{title} </a>
    <hr />
  {/each}
</div>

<h2 id="usage">Usage & Conditional Rendering</h2>

<p>
  Install <code>{packageName}</code> with your favorite package manager.<br />
</p>

<p>
  A common use case for a component like this is to only render it during development.<br />If you
  are using SvelteKit, you can conditionally render Inspect using the <code>dev</code> variable
  exported from
  <code>'$app/environment'</code>.<br />
  If you are not using SvelteKit or Vite,
  <a href="https://github.com/benmccann/esm-env/tree/main"><code>esm-env</code></a> is a good alternative
  for checking conditional environment variables with different bundlers and runtimes.
</p>

<Code code={minimalcode}>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html minimalCode}
</Code>

Result:
<div class="center">
  <MinimalExample />
</div>

<h2 id="values">Inspect.Values</h2>

<p>
  The basic <code>Inspect</code> component is a "single value"-inspector, meaning it can only have
  one "root" node. If you have multiple values you want to inspect, you can pack the values into an
  object and array and pass it to the <code>value</code>-prop. Another solution is passing the
  values as props to <code>Inspect.Values</code>:
</p>

<Code code={valuesCode}>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html valuesCode}
</Code>

Result:
<div class="center">
  <MinimalExampleValues />
</div>

<p>
  <code>Inspect.Values</code> does not accept any configuration props since any value passed as a
  prop will simply be inspected. If you want to change the behavior of <code>Inspect.Values</code>
  you can use <a href="#global">global options</a> or define a pre-configured version of the
  component with
  <code>Inspect.Values.withOptions</code>
  or the <code>configured</code>-function:
</p>

<Code code={configuredCode}>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html configuredCode}
</Code>

<p>
  <code>Inspect.Values</code> and configured variants can all have <code>expandLevel</code> set by using
  "Expand" properties from 0 to 30 (default 1.)
</p>

Result:
<div class="center">
  <ConfiguredExample />
</div>

<h3>Chainable inline configuration</h3>

<p>
  A final method to configuring <code>Inspect.Values</code> that will override global options and
  <code>withOptions</code>-variations is "chainable inline configuration":
</p>

<Code code={inlineconfigcode} />

<p></p>

<h2 id="global">Global Options</h2>

<p>
  <code>{packageName}</code> exports a utility function to set a "global" config for every instance
  of the Inspect-component in or under the component where the function is called (it sets context).
  Alternatively, you can use the <code>InspectOptionsProvider</code>-component.
</p>

<p>
  Passing a function returning a reactive object to the function will update the components if any
  property of the object is changed.<br />

  You can try this now if you change any options in the configurator at the bottom of your screen!
  (hover it)
</p>

<MultiCode
  examples={[
    { code: globalConfigCodeLayout, label: '+layout.svelte', language: 'svelte' },
    { code: globalConfigCode, label: '+page.svelte', language: 'svelte' },
  ]}
/>

Result:

<label>
  string collapse
  <input type="number" bind:value={stringCollapse} />
</label>
<Inspect value={'no long strings in this neighbourhood thanks'} {stringCollapse} />

<p>
  Options set with props, <code>withOptions</code> or <code>configured</code> will override any global
  options
</p>

<h2 id="props">Props</h2>

<!-- <Inspect name="props" value={propsDocObj} expandAll /> -->

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td> value </td>
      <td>required. value to inspect. can be any javascript value</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td> name </td>
      <td> name of outer value. displayed as key </td>
      <td><code>undefined</code></td>
    </tr>
    <tr>
      <th>Options</th>
      <th colspan="2"
        >The following props can also be set using <code>setGlobalInspectOptions</code> or
        <code>InspectOptionsProvider</code></th
      >
    </tr>
    <tr>
      <td> stringCollapse </td>
      <td> set a max display length for string values. 0 means full string will be displayed </td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td> showLength </td>
      <td>
        display length of arrays or strings and number of nested entries in objects / maps etc
      </td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td> showTypes </td>
      <td>
        display type labels before values e.g. "string" / "number." Mainly affects basic primitive
        types
      </td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td> showPreview </td>
      <td> display preview of nested values of object, array, map, set etc. </td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td> previewDepth </td>
      <td> how deeply nested items should be previewed before simply showing types </td>
      <td><code>1</code></td>
    </tr>
    <tr>
      <td> previewEntries </td>
      <td> how many nested items should be previewed </td>
      <td><code>3</code></td>
    </tr>
    <tr>
      <td> showTools </td>
      <td> display row of utility-"tools" when hovering an entry </td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td> noanimate </td>
      <td> disable animations / transitions </td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td> embedMedia </td>
      <td>
        embed images and audio if a string value is a path or url that ends with an image or audio
        file extension
      </td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td> theme </td>
      <td>
        set color theme class<br />
        available built-in themes: 'inspect','drak','stereo','dark','light','cotton-candy'
      </td>
      <td><code>'inspect'</code></td>
    </tr>
    <tr>
      <td> expandAll </td>
      <td> initially expand all nodes. can be a performance hitch with a lot of entries </td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td> expandLevel </td>
      <td> default level of initially expanded nested nodes </td>
      <td><code>1</code></td>
    </tr>
    <tr>
      <td> expandPaths </td>
      <td> array of paths (string) to initially expanded nodes </td>
      <td><code>[]</code></td>
    </tr>
    <tr>
      <td> borderless </td>
      <td> remove background color, border and padding </td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td> quotes </td>
      <td>
        quote type for string values. <code>'single'</code>, <code>'double'</code> or
        <code>'none'</code></td
      >
      <td><code>'single'</code></td>
    </tr>
    <tr>
      <td> renderIf </td>
      <td>
        function or value. render condition for <code>Inspect</code>. if value or return value of
        function is truthy, <code>Inspect</code> will render.
      </td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td> customComponents </td>
      <td>
        custom components for values.<br />
        object with type as keyname and tuple of component and optional prop modification function.<br
        /> <a href="/custom">extended documentation here</a>
      </td>
      <td><code>{'{}'}</code></td>
    </tr>
    <tr>
      <td> parseJson </td>
      <td>
        if enabled, attempt to parse strings that start with <code>{"'{'"}</code> or
        <code>{"'['"}</code> and display the parsed value if it was valid JSON
      </td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td> stores </td>
      <td>
        if enabled, treat any object with a <code>subscribe</code> function as a store or observable
        and show the last value emitted when subscribed to
      </td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td> onCopy </td>
      <td>
        custom callback run when clicking copy tool-button.<br />
        if this option is set without a <code>canCopy</code>-function, the copy button will be shown
        for all values.<br />
        this overrides the default copy-button behavior.
      </td>
      <td><code>undefined</code></td>
    </tr>
    <tr>
      <td> canCopy </td>
      <td> custom predicate that determines if copy-button should be displayed for a value </td>
      <td><code>undefined</code></td>
    </tr>
    <tr>
      <td> onLog </td>
      <td>
        custom callback run when clicking log tool-button.<br />
        this overrides the default log-button behavior.
      </td>
      <td><code>undefined</code></td>
    </tr>
  </tbody>
</table>

<!-- <BasicEditable /> -->
<style>
  .center {
    display: flex;
    justify-content: center;
  }

  table {
    border-collapse: collapse;
    border: 1px solid var(--border-color);
    background-color: var(--bg);
    font-family: monospace;
    font-size: 0.7em;
  }

  th,
  td {
    border: 1px solid var(--border-color);
    padding: 8px 10px;
    text-align: left;
  }
</style>
