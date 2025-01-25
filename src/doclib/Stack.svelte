<script lang="ts">
  const { children } = $props()
</script>

<div class="stack">
  {@render children?.()}
</div>

<style>
  .stack {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1em;
  }

  @media (min-width: 1024px) {
    .stack {
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: nowrap;
    }
  }
</style>
