<script lang="ts">
  import vars from './vars-defaults.js'
</script>

<h2>CSS Variables</h2>

<table>
  <thead>
    <tr>
      <th>Variable</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    {#each vars as [v, def]}
      <tr>
        <td class="varname">{v}</td>
        <td>{def}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    font-family: monospace;
    text-align: left;
    border-collapse: collapse;
    border: 1px solid var(--docs-border-color);
    font-size: 14px;
  }

  td,
  th {
    border: 1px solid var(--docs-border-color);
    padding: 0.5em;
  }

  .varname {
    width: 400px;
  }
</style>
