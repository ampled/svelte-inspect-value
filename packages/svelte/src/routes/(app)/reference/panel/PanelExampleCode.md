```svelte
<script lang="ts">
  import Inspect, {addtoPanel} from 'svelte-inspect-value'
  import MyTodoApp from './TodoApp.svelte'

  const todos = [
    // ...
    {
      id: 3,
      description: 'feed the turtle'
      done: true
    },
    //...
  ]

  let todo = $derived(todos.filter((t) => !t.done))
  let done = $derived(todos.filter((t) => t.done))

  addToPanel('isTurtleFed', () => todos[2].done)
  addToPanel('allTodos', () => todos)
</script>

<h3>Demo</h3>

<Inspect.Panel values={{ todo, done }} heading="todos" />
<MyTodoApp {todos} />
```
