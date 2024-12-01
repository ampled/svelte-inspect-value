<script lang="ts">
  import './app.css'
  import TableJsonView from '$lib/TableJsonView.svelte'
  import { stringify } from '$lib/util.js'

  let showLength = $state(true)
  let showTypes = $state(true)
  let stringCollapse = $state(20)
  let theme = $state('dracula')
  let draggable = $state(false)

  let returnValue = <T,>(value: T) => value

  let date = $state(new Date())

  let symbolKey = Symbol('key')

  class IAmAClass {
    iHaveAProperty = 'hello'
    static staticProperty = 'HI'
  }

  let weirdos = {
    0: 'my key is a number',
    big: 1n,
    arr: [1, 2, 3, 4, [5, 6, 7, 8]],
    error: new TypeError('can not access property of undefined')
  }

  let allTypesValue = $derived({
    name: 'allTypesValue',
    options: {
      theme,
      showLength,
      showTypes,
      stringCollapse
    },
    emptyArr: [],
    emptyObj: {},
    emptyString: '',
    longString: 'lorem ipsum dolor sit amet. boy is this string long!!',
    numberValue: 1484789234,
    decimalValue: 123.45,
    nanValue: NaN,
    infinity: Infinity,
    undefinedValue: undefined,
    map: new Map<string | number, any>([
      ['yeah', 1],
      [3, 2]
    ]),
    nullValue: null,
    date: date,
    booleanVal: true,
    arrayValue: [1, 2, 3, 14, 'u2'],
    symbolProp: Symbol('hi i am symbol'),
    [symbolKey]: 'my key is a symbol',
    reg: /^[re(g)ex]$/,
    weirdos,
    arrowFunction: returnValue,
    normalFunction() {
      return 'normal'
    },
    propertyThatIsAClass: IAmAClass,
    instanceOfClass: new IAmAClass()
  })
</script>

<main>
  <div>
    <label>
      <input type="checkbox" bind:checked={draggable} />
      draggable
    </label>

    <label>
      <input type="checkbox" bind:checked={showLength} />
      show length of entries
    </label>

    <label>
      <input type="checkbox" bind:checked={showTypes} />
      show types
    </label>

    <label>
      collapse strings
      <input type="number" bind:value={stringCollapse} />
    </label>

    <label>
      theme
      <select bind:value={theme}>
        <option>dracula</option>
        <option>monokai</option>
        <option>solarized-dark</option>
        <option>none (uggo)</option>
      </select>
    </label>
  </div>
  <TableJsonView
    value={allTypesValue}
    name={allTypesValue.name}
    {showLength}
    {showTypes}
    {stringCollapse}
    {draggable}
    class={theme}
  />

  <TableJsonView
    value={returnValue}
    {showLength}
    {showTypes}
    {stringCollapse}
    {draggable}
    class={theme}
  />

  <TableJsonView
    value={[{ name: 'one' }, { name: 'two' }, { name: 'three' }]}
    {showLength}
    {showTypes}
    {stringCollapse}
    {draggable}
    class={theme}
  />
  <TableJsonView
    value={{
      firstName: 'Bob',
      lastName: 'Alice',
      email: 'bob@alice.lol',
      birthDate: new Date(),
      age: -42,
      interests: ['radio', 'tv', 'internet', 'kayaks']
    }}
    name={'simple'}
    {showLength}
    {showTypes}
    {stringCollapse}
    {draggable}
    class={theme}
  />
</main>

<!-- <TableJsonView value={weirdos.arr} />
<TableJsonView value={'i am string'} />
<TableJsonView value={1234} /> -->

<style>
  label {
    border: 1px solid black;
    padding: 1em;
  }
</style>
