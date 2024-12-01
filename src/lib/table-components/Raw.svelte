<script lang="ts">
  import { stringify } from '$lib/util.js'

  type RawProps = {
    value?: any
    rawIndent?: number
  }

  let { value = undefined, rawIndent = 2 }: RawProps = $props()
</script>

<pre>{stringify(value, rawIndent) ?? 'undefined'}</pre>

<style>
  pre {
    margin: 0;
  }
</style>
