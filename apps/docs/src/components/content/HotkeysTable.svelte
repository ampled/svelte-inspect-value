<script lang="ts">
</script>

{#snippet metaKey()}
  <kbd><dfn title="⌘ or Ctrl">Meta</dfn></kbd>
  <!-- <kbd>⌘</kbd> <span style="font-weight: bolder;">/</span> <kbd>Ctrl</kbd> -->
{/snippet}

<table class="not-content">
  <tbody>
    <tr>
      <td>
        {@render metaKey()} + <kbd>&rightarrow;</kbd>
      </td>
      <td> Expand top level nodes </td>
    </tr>
    <tr>
      <td>
        {@render metaKey()} + <kbd>&leftarrow;</kbd>
      </td>
      <td> Collapse top level nodes </td>
    </tr>
    <tr>
      <td><kbd>Shift</kbd> + {@render metaKey()} + <kbd>F</kbd></td>
      <td> Focus search field (if enabled) </td>
    </tr>
  </tbody>
</table>

<p style="font-style: italic">
  Note: {@render metaKey()} means <kbd>⌘</kbd> on macOS and <kbd>Ctrl</kbd> on Windows / Linux
</p>

<style>
  table {
    border: 1px solid var(--docs-border-color);
    border-collapse: collapse;
    width: 100%;
  }

  tbody,
  tr {
    width: 100%;
  }

  td {
    border: 1px solid var(--docs-border-color);
    padding: 1ch;
    width: 100%;
    text-align: left;
    white-space: nowrap;
  }

  td:first-of-type {
    width: fit-content;
    font-family: monospace;
  }
</style>
