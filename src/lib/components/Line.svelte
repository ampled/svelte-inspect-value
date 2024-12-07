<script lang="ts">
  let { children } = $props()
</script>

<div class="line">
  {@render children()}
</div>

<style>
  .line {
    transition: all 0.2s ease-in-out;
    transition-delay: 0.2s;
    padding-left: calc(var(--indent) * 0.5);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    /* padding-left: 0.5em; */
    gap: 0.5em;
    /* border: 1px solid salmon; */

    &:hover {
      background-color: var(--bg-lighter);
    }
  }
</style>
