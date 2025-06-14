<script lang="ts">
  import Inspect from '$lib/index.js'

  let array = $state.raw<number[]>([])
</script>

<div class="flex row">
  <button onclick={() => (array = [...array, array.length])}>+</button>
  <button onclick={() => (array = array.filter((n) => n !== array.length - 1))}>+</button>
</div>

<Inspect values={{ array }} expandLevel={0} />
