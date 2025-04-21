<h2 id="add-to-panel">addToPanel()</h2>

```ts
function addToPanel(name: PropertyKey, value: () => unknown, addedBy?: string): () => void
```

Register a "global" value to be inspected with `Inspect.Panel`.
It is recommended to call this during component initialization.

Returns a function that removes the added value when called.

If called during component initialization, the value will automatically be removed when the component is unmounted.

If called after component initialization (i.e. on click) the returned remove-function should be called when the component is destroyed.
If not, value will lose reactivity and may cause weird side-effects or throw errors.

Can also safely be run inside an $effect that will re-add the value if removed and it changes.

#### Example

```svelte
<script>
  import { onDestroy } from 'svelte'
  import Inspect, { addToPanel } from 'svelte-inspect-value'

  let value = $state('test')
  let anObject = $state({})
  let anotherValue = $state(123)

  // call during initialization
  // will be removed when this component is destroyed.
  addToPanel('a', () => value)

  $effect(() => {
    // re-set the value if it changes
    // will be removed when this component is destroyed.
    addToPanel('b', () => anObject)
  })

  let remove
  function addToPanel() {
    // called after initialization. value will not be removed
    remove = addToPanel('b', () => anotherValue)
  }

  onDestroy(() => {
    if (remove) remove?.()
  })
</script>

<button onclick={addToDrawer}>add</button>
```

### Parameters

#### name

`PropertyKey`

display name of inspected value

#### value

`() => unknown`

function returning value to be inspected

#### addedBy?

`string`

(optional) label of where value was added from
