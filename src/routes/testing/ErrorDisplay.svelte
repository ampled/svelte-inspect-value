<script lang="ts">
  import ErrorDisplay from './ErrorDisplay.svelte'

  type Props = {
    error: Error
  }

  let { error = new Error() }: Props = $props()
</script>

{error.name}<br />
{error.message}<br />
<pre>
{error.stack}
</pre>

{#if error.cause instanceof Error}
  <ErrorDisplay error={error.cause} />
{:else if typeof error.cause === 'string'}
  cause: {error.cause}
{/if}
