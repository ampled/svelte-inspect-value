<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'
  import Code from '../doclib/Code.svelte'
  import globalConfigCode from '../doclib/examples/globalconfig.txt?raw'
  import MinimalExample from '../doclib/examples/MinimalExample.svelte'

  let packageName = 'svelte-inspect-value'

  import minimalcode from '../doclib/examples/minimalexample.txt?raw'
</script>

<h2>What it is</h2>

<div class="center">
  <Inspect style="max-width: 400px;" name="helloWorld" value={{ key: 'value' }} />
</div>

<p>
  Svelte Value Inspect is a "json tree"-like inspector inspired by the likes of <code
    >react-json-view</code
  >, and <code>svelte-json-tree</code>. <br />

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
  <li>view arrays & objects in a tree-like view</li>
  <li>support for most JavaScript built-ins, including <code>Set</code> and <code>Map</code></li>
  <li>
    syntax highlighting for functions and html elements (outer selector) using <code>hljs</code>
  </li>
  <li>embed media if string ends with image / audio extension (optional)</li>
  <li>customizable colors</li>
  <li>use custom components for any type</li>
  <li>configurable with global options utiltiy as alternative to passing props</li>
</ul>

<h3>Planned features</h3>

<ul>
  <li>built-in functionality for pinning the component to a fixed position</li>
  <li>draggable</li>
  <li>edit-mode (maybe)</li>
</ul>

<h2>Usage</h2>

<p>
  Install <code>{packageName}</code> with your favorite package manager.
</p>

<Code code={minimalcode} />

Result:
<div class="center">
  <MinimalExample />
</div>

<h2>Props</h2>

<!-- <div class="center">
  <Inspect
    style="max-width: 1000px"
    name="props"
    expandAll
    value={{
      value: {
        description: 'required. value to inspect. can be any javascript value',
        default: null,
      },
      name: {
        description: `name of outer value. \n displayed as key, e.g. 'props' in this instance`,
        default: undefined,
      },
      stringCollapse: {
        description: `set a max display length for string values.\n0 means full string will be displayed`,
        default: 0,
      },
    }}
  />
</div> -->

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
        available built-in themes: 'drak','stereo','dark','light','cotton-candy'
      </td>
      <td><code>'drak'</code></td>
    </tr>
    <tr>
      <td> expandAll </td>
      <td> expand all nodes by default. can be a performance hitch with a lot of entries </td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td> expandLevel </td>
      <td> default level of initially expanded nested nodes </td>
      <td><code>1</code></td>
    </tr>
    <tr>
      <td> borderless </td>
      <td> remove background color, border and padding </td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td> quotes </td>
      <td> quote type for string values. <code>'single'</code> or <code>'double'</code></td>
      <td><code>'single'</code></td>
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
  </tbody>
</table>

<h2>Global config</h2>

<p>
  <code>{packageName} </code> exports a utility function to set a "global" config for every instance
  of the Inspect-component in or under the component where the function is called (it sets context).
</p>

<p>
  Passing a reactive object to the function will update the components if any property of the object
  is changed beceause its reactive (yup!)<br />

  You can try this now if you change any options in the configurator at the bottom of your screen!
  (hover it)
</p>

<Code code={globalConfigCode} label="GlobalConfigExample.svelte" />

<Inspect value={'no long strings in this neighbourhood thanks'} />

<p>Options set with the function will have priority over options passed as props.</p>

<!-- <BasicEditable /> -->
<style>
  .center {
    display: flex;
    justify-content: center;
  }

  table {
    border-collapse: collapse;
    border: 2px solid rgb(140 140 140);
    background-color: var(--bg-lighter);
  }

  th,
  td {
    border: 1px solid rgb(160 160 160);
    padding: 8px 10px;
    text-align: left;
  }
</style>
