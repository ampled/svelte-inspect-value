<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'
  import Code from '../../doclib/Code.svelte'
  import CustomNumber from './CustomNumber.svelte'
  import customNumberCode from './CustomNumber.txt?raw'
  import ErrorOnHover from './ErrorOnHover.svelte'
  import code from './example.txt?raw'
  import ExpandableNumber from './ExpandableNumber.svelte'

  let anObject = $state({
    oneBillion: 1000000000,
    oneTwoThreeFourEtc: 1234567890,
    maxSafe: Number.MAX_SAFE_INTEGER,
  })
</script>

<h2>Custom Components <sup>beta</sup></h2>

<p>
  <code>svelte-inspect-value</code> aims to (eventually) export all the building blocks to extend the
  component with custom components.
</p>

<p>Better documentation soon! Here's a minimal example:</p>

<h3>Custom line</h3>

<div class="center">
  <Code code={customNumberCode} label="GoofyNumber.svelte" />
  <Code {code} label="svelte" />
</div>

Result
<Inspect
  value={anObject}
  customComponents={{ number: [CustomNumber, (props) => ({ value: props.value })] }}
  name="customNumber"
/>

<h3>Custom expandable</h3>

<Inspect value={2} customComponents={{ number: [ExpandableNumber] }} />

<h2>Error handling</h2>

<p>
  If any component, built-in or custom, should throw an error it will be caught by a boundary on an
  entry-per-entry basis and render error details.<br />
  The error value display component reverts to using default components to avoid further issues.
</p>

<Inspect
  value={{
    hoverToError: 'hover me',
    hey: 'dont hover me i will error',
  }}
  name="customString"
  customComponents={{ string: [ErrorOnHover] }}
/>
