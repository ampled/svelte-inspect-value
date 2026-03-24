<table class="not-content">
  <tbody>
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
        If expanded: focus previously focused or first child node<br />
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
