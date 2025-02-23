<script lang="ts">
  import './app.css'

  import { DEV } from 'esm-env'

  import { page } from '$app/stores'
  import Inspect from '$lib/Inspect.svelte'
  import InspectOptionsProvider from '$lib/InspectOptionsProvider.svelte'
  import { type InspectOptions } from '$lib/options.svelte.js'
  import GlobalOptions from './GlobalOptions.svelte'

  // onNavigate((navigation) => {
  //   if (!document.startViewTransition) return

  //   return new Promise((resolve) => {
  //     document.startViewTransition(async () => {
  //       resolve()
  //       await navigation.complete
  //     })
  //   })
  // })

  const { children } = $props()

  let routes = [
    { href: '/getting-started', title: 'Getting started' },
    { href: '/examples', title: 'Examples' },
    { href: '/custom', title: 'Custom components', devonly: true },
    { href: '/theming', title: 'Theming' },
    { href: '/alltypes', title: 'alltypes', devonly: true },
  ]

  let options = $state<Partial<InspectOptions>>({
    theme: 'inspect',
    stringCollapse: 0,
    showTools: true,
    showTypes: true,
    showLength: true,
    showPreview: true,
    previewDepth: 1,
    previewEntries: 3,
    flashOnUpdate: true,
    noanimate: false,
    quotes: 'single',
    borderless: false,
    embedMedia: true,
    elementView: 'simple',
    parseJson: false,
  })
</script>

<InspectOptionsProvider {options}>
  <svelte:boundary>
    {#snippet failed(error, reset)}
      <Inspect value={error} />

      <button onclick={reset}>reset</button>
    {/snippet}
    <header>
      <a href="/" class="title">
        <h1>
          Svelte
          <code
            >{'<'}<span class="inspect">Inspect</span>
            {'{'}<span class="value">{'value'}</span>{'}'}
            {'/>'}
          </code>
        </h1>
      </a>
      <ul>
        <li>
          <a
            href="https://www.npmjs.com/package/svelte-inspect-value"
            aria-label="npm"
            target="_blank"
          >
            <img alt="npm" src="https://img.shields.io/npm/v/svelte-inspect-value" />
          </a>
        </li>
        <li>
          <a href="https://github.com/ampled/svelte-inspect-value">
            <img
              alt="github"
              src="https://img.shields.io/github/stars/ampled/svelte-inspect-value?style=social"
            />
          </a>
        </li>
      </ul>
    </header>
    <nav>
      <ul>
        {#each routes as { href, title, devonly } (href)}
          {#if !devonly || (devonly && DEV)}
            <li>
              <a class:active={href === $page.url.pathname} {href}>{title}</a>
            </li>
          {/if}
        {/each}
      </ul>
    </nav>
    <main>
      {@render children()}
      <GlobalOptions bind:options />
    </main>
  </svelte:boundary>
</InspectOptionsProvider>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1em;
    padding-inline: 1em;
    padding-top: 1em;
    flex-wrap: wrap;
    view-transition-name: header;
  }

  nav {
    padding-inline: 1em;
    padding-top: 0.5em;
    view-transition-name: nav;
  }

  .title {
    text-decoration: none;
    font-weight: bold;
    font-size: 0.8rem;
    width: max-content;
  }

  h1 {
    max-width: max-content;
    text-decoration: none;
    text-wrap: nowrap;
    white-space: nowrap;
  }

  main {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 1em;
    padding: 1em;
    width: 100%;
    margin-bottom: 150px;
  }

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

    h1 {
      text-decoration: none;

      code {
        font-size: 0.8em;
        padding-inline: 0.2em;
        font-weight: normal;
        background: transparent;

        .inspect {
          color: var(--red);
          font-weight: bold;
        }

        .value {
          font-weight: normal;
          color: var(--blue);
        }
      }
    }
  }

  a.active {
    color: var(--red);
    text-decoration: underline;
    position: relative;
  }

  @media (min-width: 768px) {
    main {
      width: 90%;
      padding: 1em;
      padding-right: 3em;
    }

    .title {
      font-size: 1.5rem;
    }

    a {
      font-size: 1.25rem;
    }
  }

  @media (min-width: 1024px) {
    main {
      width: 90%;
      padding: 1em;
      padding-right: 3em;
    }

    .title {
      font-size: 1.5rem;
    }

    a {
      font-size: 1.5rem;
    }
  }

  /* VIEW TRANSITIONS */
  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }

  @keyframes fade-out {
    to {
      opacity: 0;
    }
  }

  @keyframes slide-from-right {
    from {
      transform: translateX(30px);
    }
  }

  @keyframes slide-to-left {
    to {
      transform: translateX(-30px);
    }
  }

  :root::view-transition-old(root) {
    animation:
      90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
      300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
  }

  :root::view-transition-new(root) {
    animation:
      210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
      300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
  }
</style>
