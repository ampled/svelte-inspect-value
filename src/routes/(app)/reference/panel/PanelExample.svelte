<script lang="ts">
  import Todo from './Todo.svelte'
</script>

<h3>Demo</h3>

<div id="panel-example">
  <Todo />
</div>

<style>
  #panel-example {
    padding: 2ch;
    position: relative;
    width: 100%;
    height: 800px;
    background-color: rgb(94, 84, 106);
    border-radius: 8px;
    overflow: hidden;
    font-family: monospace;
    color: black;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    gap: 1ch;
  }
</style>
