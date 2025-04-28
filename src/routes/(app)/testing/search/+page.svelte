<script lang="ts">
  import Inspect from '$lib/index.js'

  let values = { top: { child1: 'bababa', child2: 'fafafa', child3: 'kakaka' } }
</script>

<Inspect heading="search" {values} />
