<script>
  import Options from './Options.md'

  const entries = [
    'borderless',
    'canCopy',
    'customComponents',
    'elementView',
    'embedMedia',
    'expandAll',
    'expandLevel',
    'expandPaths',
    'flashOnUpdate',
    'noanimate',
    'onCollapseChange',
    'onCopy',
    'onLog',
    'parseJson',
    'previewDepth',
    'previewEntries',
    'quotes',
    'renderIf',
    'showLength',
    'showPreview',
    'showTools',
    'showTypes',
    'stores',
    'stringCollapse',
    'theme',
  ]
</script>

<div class="toc">
  <a href="#inspect-options" style="font-weight: bold">InspectOptions</a>
  {#each entries as child}
    <a href={`#${child}`}>- {child} </a>
    <hr />
  {/each}
  <a href="#set-global" style="font-weight: bold">setGlobalInspectOptions()</a>
</div>

<h2>Options</h2>

<div class="md-types">
  <Options />
</div>
