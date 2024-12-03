<script lang="ts">
  let { children } = $props()
</script>

<div class="line">
  {@render children()}
</div>

<style>
  .line {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5em;
    /* border: 1px solid salmon; */

    &:hover {
      background-color: var(--base01);
    }
  }
</style>
