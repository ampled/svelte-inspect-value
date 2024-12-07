<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'

  let anObject = $state({
    aString: 'some string',
    counter: 0,
    subObject: {
      yo: 'haha',
    },
    lol: {
      testing: 123,
    },
  })
</script>

<Inspect class="monokai" value={anObject} name="anObject" />
