<script lang="ts">
  const { children } = $props()
</script>

<div class="stack">
  {@render children?.()}
</div>

<style>
  .stack {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  @media (min-width: 1024px) {
    .stack {
      flex-direction: row;
    }
  }
</style>
