<script lang="ts">
  import { inspectElement } from '$lib/attachments/inspect-element.js'
  import Inspect from '$lib/index.js'

  let array = $state.raw<number[]>([])

  let asdf = {
    [Symbol('bababa')]: 'hei',
  }
</script>

<div class="flex row">
  <button onclick={() => (array = [...array, array.length])}>+</button>
  <button onclick={() => (array = array.filter((n) => n !== array.length - 1))}>+</button>
</div>
<span data-lalala="hello" data-fff={undefined} {@attach inspectElement()}>boop</span>

<Inspect values={{ array }} expandLevel={0} {@attach inspectElement('inspect')} />

<Inspect.Values {array} {...asdf} {@attach inspectElement('inspectvalues')} />
