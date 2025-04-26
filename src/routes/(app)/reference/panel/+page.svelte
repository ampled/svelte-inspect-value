<script lang="ts">
  import PanelExample from './PanelExample.svelte'
  import PanelExampleCode from './PanelExampleCode.md'
</script>

<h2 id="panel">Inspect.Panel</h2>

<a href="/docs/types/PanelProps">Props</a>

<p>
  <code>Inspect.Panel</code> is a fixed-position version of <code>Inspect</code>.<br />
  It can be resized, repositioned, customized and takes all the same props as <code>Inspect</code>
  does and a few extra ones.
</p>

<PanelExample />

<PanelExampleCode />

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
  <a href="/docs/functions/addToPanel"><code>addToPanel</code></a>.<br />
  Also, if any instances of <code>Inspect</code> / <code>Inspect.Panel</code> are used outside of a panel,
  you can add values to the panel from those instances.
</p>
