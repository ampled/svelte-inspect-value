<script lang="ts">
  import AllTypes from '$doclib/examples/AllTypes.svelte'
</script>

{#snippet metaKey()}
  <kbd>⌘</kbd> <span style="font-weight: bolder;">/</span> <kbd>Ctrl</kbd>
{/snippet}

<h2 id="usage">Usage</h2>

<p>
  The <code>Inspect</code> component offers a lot of different functionality and interactivity.<br
  />
  This page covers how to interact with the component outside of code.<br />
  See the <a href="/getting-started">Getting Started</a> and <a href="/examples">Examples</a>-pages
  for installation instructions and code examples.
</p>

<h3>Keyboard Controls</h3>

<p>
  Every node/row/line in <code>Inspect</code> is focusable. Using the <kbd>Tab</kbd> key will shift
  focus between every focusable element and is required to focus the tools or <code>get</code> /
  <code>next</code>-actions of getters / iterables.<br />
  Using <kbd>Tab</kbd> in combination with the following keyboard shortcuts, everything should be reachable
  using only your keyboard.
</p>

<table>
  <tbody>
    <tr>
      <td>
        {@render metaKey()} + <kbd>E</kbd>
      </td>
      <td> Expand top level nodes </td>
    </tr>
    <tr>
      <td>
        {@render metaKey()} + <kbd>C</kbd>
      </td>
      <td> Collapse top level nodes </td>
    </tr>
    <tr>
      <td>{@render metaKey()} + <kbd>F</kbd></td>
      <td> Focus search field (if enabled) </td>
    </tr>
    <tr>
      <td>
        <kbd>&uparrow;</kbd>
      </td>
      <td> Focus previous node </td>
    </tr>
    <tr>
      <td>
        <kbd>&downarrow;</kbd>
      </td>
      <td> Focus next node </td>
    </tr>
    <tr>
      <td>
        <kbd>End</kbd>
      </td>
      <td> Focus last node </td>
    </tr>
    <tr>
      <td>
        <kbd>Home</kbd>
      </td>
      <td> Focus first node </td>
    </tr>
    <tr>
      <td>
        <kbd>&rightarrow;</kbd>
      </td>
      <td>
        If collapsed: expand node<br />
        If expanded: focus previously expanded child node<br />
        Non expandable: focus next node
      </td>
    </tr>
    <tr>
      <td>
        <kbd>&leftarrow;</kbd>
      </td>
      <td>
        If collapsed: focus parent node / focus previous node<br />
        If expanded: collapse node<br />
        Non expandable: focus previous mode
      </td>
    </tr>
    <tr>
      <td>
        <kbd>Enter</kbd>
      </td>
      <td> Expand node and focus first child </td>
    </tr>
    <tr>
      <td>
        <kbd>Space</kbd>
      </td>
      <td> Expand / collapse node </td>
    </tr>
  </tbody>
</table>
<h3>Type to focus</h3>
While a node is focused, you can type to focus a certain (visible) node.<br />
A box will appear showing your query, and a node matching the typed letters will be focused, prioritizing
keys.

<h2 id="search">Search and Text Highlight</h2>

<p>
  If <code><a href="/docs/types/InspectOptions#search">search</a></code> is enabled, a search input
  will be visible in the header.<br />
  Typing a query and hitting enter will index the inspected values, search it and highlight any paths
  with keys, paths and values that matches the query.
</p>

<p>Search results can be narrowed by using multiple terms and the following prefixes:</p>
<ul>
  <li>
    <code>value:</code> to search the content of the value, e.g. <code>true</code> /
    <code>'foo'</code>
    / <code>12356n</code>
  </li>
  <li>
    <code>type:</code> to search that matches a specific type, e.g. <code>number</code> /
    <code>boolean</code>
    / <code>date</code>
  </li>
  <li>
    <code>path:</code> to search within the path to a value, e.g.
    <code>people.3.contact.email</code>
  </li>
</ul>

<p>
  Wrapping terms in quotes will require an exact match. With a prefix it would look like <code
    >value:"1234"</code
  >
</p>

<h3 id="multiple-terms">Multiple terms</h3>

<p>
  If multiple terms are entered (separated by space) a mode-selector appears letting you choose
  between <code>and</code> / <code>or</code>-mode. The initial mode can be set with the
  <a href="/docs/types/InspectOptions#search-mode"><code>searchMode</code></a>-prop.
</p>

<p>
  For example, querying <code>type:"string" path:foo</code> would match all string values and / or
  values with
  <code>'foo'</code> in their path / key.
</p>

<h3 id="expanding-matches">Expanding matches</h3>

<p>
  All matching paths will be expanded. To keep highlighted matching paths expanded after clearing
  the search results, hit <kbd>Enter</kbd> again without changing the query.<br />
  The <kbd>Esc</kbd>-button will clear the input and search results when the search field is
  focused, and if the search field was focused using the keyboard shortcut, the last focused node
  will be re-focused.
</p>

<p>
  If <a href="/docs/types/InspectOptions#highlight-matches"><code>highlightMatches</code></a> is
  enabled, matching text will be highlighted when you type your query.<br />
  Text highlighting also respects prefixes like <code>path</code> and <code>type</code>.
</p>

<p>
  <b>Note:</b> Text highlighting and indexed search works a bit differently. For example, the query
  <code>type:undefined type:null</code>
  will highlight any visible value with type
  <code>undefined</code>
  and <code>null</code> regardless of search mode, but since a value can't be both
  <code>undefined</code>
  and <code>null</code> at the same time, no values will be a match in <code>and</code>-mode. So,
  even if something is highlighted it might not count as a match.
</p>

<AllTypes search="highlight" highlightMatches />

<style>
  table {
    border: 1px solid var(--docs-border-color);
    border-collapse: collapse;
  }

  td {
    border: 1px solid var(--docs-border-color);
    padding: 1ch;
    text-align: left;
    white-space: nowrap;
  }

  td:first-of-type {
    font-family: monospace;
  }
</style>
