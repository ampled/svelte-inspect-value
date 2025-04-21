<script lang="ts">
  import AddToPanel from './AddToPanel.md'
  import PanelExample from './PanelExample.svelte'
  import Props from './Props.md'

  const toc = [
    'appearance',
    'children',
    'hideGlobalValues',
    'opacity',
    'open',
    'openOnHover',
    'position',
    'resize',
  ]
</script>

<div class="toc">
  <a href="#props" style="font-weight: bold">Props</a>
  {#each toc as prop}
    <a href={`#${prop}`}>- {prop} </a>
    <hr />
  {/each}
  <a href="#add-to-panel" style="font-weight: bold">addToPanel()</a>
</div>

<h2 id="panel">Inspect.Panel</h2>

<p>
  <code>Inspect.Panel</code> is a fixed-position version of <code>Inspect</code>.<br />
  It can be resized, repositioned, customized and takes all the same props as <code>Inspect</code>
  does and a few extra ones.
</p>

<PanelExample />

<p>
  <code>Inspect.Panel</code> will also render any children passed to it, a nice place to put any
  extra debugging tools or information. In fact, the navigation menu on this website is an instance
  of <code>Inspect.Panel</code>
  simply used for it's capability to render children.
</p>

<h2 id="global-values">Global values</h2>

<p>
  In addition to using the <code>value</code> or
  <code>values</code>-props, panels can also receive "global" values with the utility function
  <a href="#add-to-panel"><code>addToPanel</code></a>.<br />
  Also, if any instances of <code>Inspect</code> / <code>Inspect.Panel</code> are used outside of a panel,
  you can add values to the panel from those instances.
</p>

<div class="md-types">
  <Props />

  <AddToPanel />
</div>
