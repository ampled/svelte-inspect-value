<script lang="ts">
  import './app.css'
  import TableJsonView from '$lib/TableJsonView.svelte'
  import { stringify } from '$lib/util.js'
  import { SvelteMap } from 'svelte/reactivity'
  import { browser } from '$app/environment'

  let showLength = $state(true)
  let showTypes = $state(true)
  let stringCollapse = $state(0)
  let stringRender: 'stringify' | 'pre' = $state('pre')
  let theme = $state('dracula')
  let draggable = $state(false)

  let options = $derived({
    showLength,
    showTypes,
    stringCollapse,
    stringRender,
    class: theme,
    draggable
  })

  let div = $state()

  let returnValue = <T,>(value: T) => value

  let date = $state(new Date())

  let symbolKey = Symbol('key')

  let image = new Image()
  image.src = 'hello.jpg'

  class IAmAClass {
    iHaveAProperty = 'hello'
    static staticProperty = 'HI'
  }

  let allTypesValue = $derived(
    browser
      ? {
          emptyArr: [],
          emptyObj: {},
          div,
          image,
          longString: 'lorem ipsum dolor sit amet. boy is this string long!!',
          multiLineString: '-line one\n-line two\n-line three',
          numberValue: 1484789234,
          bigInteger: 1n,
          nanValue: NaN,
          infinity: Infinity,
          undefinedValue: undefined,
          nullValue: null,
          map: new Map<any, any>([
            ['yeah', 1],
            [3, 2],
            [{ name: 'object key' }, 3]
          ]),
          url: new URL(
            'https://anon:hunter2@example.org:8080/pathname/index.html?q=query&p=123#result'
          ),
          search: new URLSearchParams([
            ['a', '1'],
            ['a', '2'],
            ['b', '3'],
            ['b', '4'],
            ['c', '5']
          ]),
          // anotherSearch: new URLSearchParams('?q&b=foo'),
          set: new Set([1, 2, 3]),
          date: date,
          booleanVal: true,
          arrayValue: [1, 2, 3, 14, 'u2'],
          symbolProp: Symbol('hi i am symbol'),
          [symbolKey]: 'my key is a symbol',
          reg: /^[re(g)ex]$/,
          arrowFunction: returnValue,
          normalFunction() {
            return 'normal'
          },
          classWithStaticProperties: IAmAClass,
          instanceOfClass: new IAmAClass(),
          simpleClass: class SimpleClass {},
          error: new TypeError('can not access property of undefined')
        }
      : {}
  )
</script>

<main>
  <div class="options" bind:this={div}>
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
      string mode
      <select bind:value={stringRender}>
        <option>stringify</option>
        <option>pre</option>
      </select>
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
  <TableJsonView value={allTypesValue} name={'demo'} {...options} />

  <TableJsonView value={options} name={'options'} {...options} />

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
  .options {
    margin: 4px;
    display: flex;
    gap: 1em;
    flex-flow: row wrap;
    align-items: center;
    justify-items: flex-start;
  }

  label {
    height: 3.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    gap: 0.5rem;
    border: 1px solid black;
    padding: 1em;
  }
</style>
