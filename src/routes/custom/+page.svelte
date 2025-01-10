<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'
  import Code from '../../doclib/Code.svelte'
  import CustomNumber from './CustomNumber.svelte'
  import customNumberCode from './CustomNumber.txt?raw'
  import ErrorOnHover from './ErrorOnHover.svelte'
  import code from './example.txt?raw'

  let anObject = $state({
    oneBillion: 1000000000,
    oneTwoThreeFourEtc: 1234567890,
    maxSafe: Number.MAX_SAFE_INTEGER,
  })
</script>

<h2>Custom Components</h2>

<p>Better documentation soon! Here's a minimal example:</p>

<div class="center">
  <Code code={customNumberCode} label="GoofyNumber.svelte" />
  <Code {code} label="" />
</div>

Result
<Inspect
  value={anObject}
  customComponents={{ number: [CustomNumber, (props) => ({ value: props.value })] }}
  name="customNumber"
/>

<h2>Error handling</h2>

<p>
  If any component, built-in or custom, should throw an error it will be caught by a boundary on an
  entry-per-entry basis and render error details
</p>

<Inspect
  value={{
    hoverToError: 'hover me',
    hey: 'dont hover me i will error',
  }}
  name="customString"
  customComponents={{ string: [ErrorOnHover] }}
/>
