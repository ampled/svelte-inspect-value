<script>
  import Inspect, { addToPanel } from '$lib/index.js'
  import { flip } from 'svelte/animate'
  import { quintOut } from 'svelte/easing'
  import { crossfade } from 'svelte/transition'

  const [send, receive] = crossfade({
    fallback(node) {
      const style = getComputedStyle(node)
      const transform = style.transform === 'none' ? '' : style.transform

      return {
        duration: 600,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
      }
    },
  })

  let todos = $state([
    { id: 1, done: false, description: 'write some docs' },
    { id: 2, done: false, description: 'tune the banjo' },
    { id: 3, done: false, description: 'fix some bugs' },
    { id: 4, done: false, description: 'mow the lawn' },
    { id: 5, done: true, description: 'feed the turtle' },
  ])

  // svelte-ignore state_referenced_locally
  let uid = todos.length + 1

  // @ts-expect-error foo
  function add(input) {
    const todo = {
      id: uid++,
      done: false,
      description: input.value,
    }

    todos = [todo, ...todos]
    input.value = ''
  }

  // @ts-expect-error foo
  function remove(todo) {
    todos = todos.filter((t) => t !== todo)
  }

  let todo = $derived(todos.filter((t) => !t.done))
  let done = $derived(todos.filter((t) => t.done))

  addToPanel(
    'isTurtleFed',
    () => {
      const turtle = todos.find((t) => t.description.includes('turtle'))
      if (turtle) {
        return turtle.done
      }
      return 'dunno'
    },
    'Todo.svelte'
  )

  addToPanel('allTodos', () => todos, 'Added manually')
</script>

<Inspect
  values={{ msg: 'add to panel from here!!', allTodos: todos }}
  showLength={false}
  name="all"
  style="max-width: 420px"
/>

<Inspect.Panel
  values={{ todo, done }}
  heading="todos"
  expandLevel={0}
  previewEntries={Infinity}
  style="position:absolute"
  appearance="solid"
  open
  zIndex={999}
>
  <p>👈 try resizing the panel!</p>
</Inspect.Panel>
<div class="board">
  <input
    class="new-todo"
    name="new-todo"
    placeholder="what needs to be done?"
    onkeydown={(event) => event.key === 'Enter' && add(event.target)}
  />

  <div class="left">
    <h2>todo</h2>
    {#each todos.filter((t) => !t.done) as todo (todo.id)}
      <label in:receive={{ key: todo.id }} out:send={{ key: todo.id }} animate:flip>
        <input name={todo.description} type="checkbox" bind:checked={todo.done} />
        {todo.description}
        <button onclick={() => remove(todo)}>x</button>
        <button onclick={() => addToPanel(`todo.${todo.id}`, () => todo)}>i</button>
      </label>
    {/each}
  </div>

  <div class="right">
    <h2>done</h2>
    {#each todos.filter((t) => t.done) as todo (todo.id)}
      <label in:receive={{ key: todo.id }} out:send={{ key: todo.id }} animate:flip>
        <input name={todo.description} type="checkbox" bind:checked={todo.done} />
        {todo.description}
        <button onclick={() => remove(todo)}>x</button>
      </label>
    {/each}
  </div>
</div>

<style>
  .new-todo {
    font-size: 1.4em;
    width: 100%;
    margin: 2em 0 1em 0;
  }

  .board {
    max-width: 36em;
    margin: 0 3em;
  }

  .left,
  .right {
    float: left;
    width: 50%;
    padding: 0 1em 0 0;
    box-sizing: border-box;
  }

  h2 {
    font-size: 2em;
    font-weight: 200;
    user-select: none;
  }

  label {
    top: 0;
    left: 0;
    display: block;
    font-size: 1em;
    line-height: 1;
    padding: 0.5em;
    margin: 0 auto 0.5em auto;
    border-radius: 2px;
    background-color: #eee;
    user-select: none;
    color: black;
  }

  input {
    margin: 0;
  }

  .right label {
    background-color: rgb(180, 240, 100);
  }

  button {
    float: right;
    height: 1em;
    box-sizing: border-box;
    padding: 0 0.5em;
    line-height: 1;
    background-color: transparent;
    border: none;
    color: rgb(170, 30, 30);
    opacity: 0;
    transition: opacity 0.2s;
  }

  label:hover button {
    opacity: 1;
  }

  p {
    color: var(--_text-color);
  }
</style>
