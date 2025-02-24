<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'

  let data = { a: `{}`, b: `[`, c: '[ "a", "b", "c", 1, 2, 3, true,false, { "a": [1,2,3] } ]' }
  let nestedData = {
    a: `{}`,
    b: `[`,
    b2: `{`,
    c: '[ "a", "b", "c", 1, 2, 3, true,false,null ]',
    d: JSON.stringify(data),
  }
  let parseJson = $state(false)
</script>

<label>
  parse
  <input type="checkbox" bind:checked={parseJson} />
</label>

<Inspect value={data} {parseJson} />
<Inspect
  value={JSON.stringify(nestedData, undefined, 2)}
  parseJson
  expandPaths={['root.d.c.8.a']}
  debug
/>
