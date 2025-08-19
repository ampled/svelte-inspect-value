```svelte
<!-- Use default persist settings -->
<Inspect.Panel persist />
<!-- Use default persist settings with tab syncing enabled -->
<Inspect.Panel persistSync />
<!-- Use default persist settings with alternative key -->
<Inspect.Panel persist="todo-app-panel" />
<!-- Use default persist settings tab syncing enabled and alternative key -->
<Inspect.Panel persistSync="todo-app-panel" />
<!-- Use custom persist settings -->
<Inspect.Panel persist={{ key: 'todo-app-panel', storage: 'local', syncTabs: true }} />
```
