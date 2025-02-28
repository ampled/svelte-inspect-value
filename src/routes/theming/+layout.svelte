<script lang="ts">
  import { page } from '$app/stores'

  let { children } = $props()

  let routes = [
    { href: '/theming', title: 'Base16' },
    { href: '/theming/define', title: 'Define' },
    { href: '/theming/vars', title: 'CSS Variables' },
  ]
</script>

<nav>
  <ul>
    {#each routes as { href, title } (href)}
      <li>
        <a class:active={href === $page.url.pathname} {href}>{title}</a>
      </li>
    {/each}
  </ul>
</nav>

{@render children?.()}

<style>
  ul {
    padding: 0;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 1em;

    li {
      display: inline;
      list-style-type: none;
    }
  }

  a {
    color: #fafafa;
    transition: color 300ms linear;
    text-decoration: none;
    font-size: 1.1rem;
    line-height: 1;
    white-space: nowrap;
  }

  a.active {
    color: var(--red);
    text-decoration: underline;
    position: relative;
  }
</style>
