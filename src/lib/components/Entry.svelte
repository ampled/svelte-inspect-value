<script lang="ts">
  let { i = 0, children } = $props()
</script>

<div role="listitem" class="entry" style="--i: {i}">
  {@render children?.()}
</div>
