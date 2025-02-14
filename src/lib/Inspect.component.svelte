<svelte:options
  customElement={{
    tag: 'inspect-value',
    props: {
      value: {
        attribute: 'value',
        type: 'Object',
      },
    },
  }}
/>

<script lang="ts">
  import Inspect from './Root.svelte'

  let props = $props()
</script>

<Inspect {...props} />
