<script lang="ts">
  type Props = {
    collapsed?: boolean
  }

  let { collapsed = $bindable(false) }: Props = $props()
</script>

<button class="collapse" onclick={() => (collapsed = !collapsed)}>
  <span style:rotate={collapsed ? '0deg' : '90deg'}>&rsaquo;</span>
</button>
