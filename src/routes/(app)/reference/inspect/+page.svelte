<script lang="ts">
  import Inspect from './Inspect.md'

  const toc = new Map([
    ['Props', 'props'],
    ['- value', 'value'],
    ['- values', 'values'],
    ['- name', 'name'],
    ['- heading', 'heading'],
  ])
</script>

<div class="toc">
  {#each toc as [title, id]}
    <a href={`#${id}`}>{title} </a>
    <hr />
  {/each}
</div>

<Inspect />
