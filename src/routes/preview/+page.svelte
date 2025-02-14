<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'

  class Foo {}
</script>

<Inspect
  value={{
    a: {},
    b: { foo: new Foo(), cls: Foo },
  }}
/>
