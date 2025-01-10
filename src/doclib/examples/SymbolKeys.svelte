<script lang="ts">
  import { Inspect } from '$lib/index.js'

  import Code from '../Code.svelte'
  import code from './symbolkeys.txt?raw'
</script>

<div class="flex col">
  <h2>symbol keys</h2>
  <p>
    object properties where keys are symbols are displayed. these are skipped by
    <code>JSON.stringify()</code>
    or <code>Object.keys()</code><br />

    this is achieved using <code>Reflect.ownKeys</code>
  </p>

  <div class="flex row" style="width: 100%">
    <Code {code} />

    <Inspect
      value={{
        stringKey: 'string value',
        anotherKey: 2,
        [Symbol('i am key')]: 'my key is a symbol',
      }}
      name="objectWithSymbolKey"
      style="max-width: 400px;"
      expandAll
    />
  </div>
</div>
