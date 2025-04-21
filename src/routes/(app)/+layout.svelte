<script lang="ts">
  import { page } from '$app/state'
  import Inspect, { InspectOptionsProvider, addToPanel, type InspectOptions } from '$lib/index.js'
  import { DEV } from 'esm-env'
  import { setContext } from 'svelte'
  import './app.css'
  import GlobalOptions from './GlobalOptions.svelte'

  let drawerOpen = $state(true)
  let showDevItems = true

  const { children } = $props()

  let routes = [
    // { href: '/examples', title: 'Examples' },
    {
      title: '',
      children: [
        {
          href: '/getting-started',
          title: 'Getting Started',
        },
        {
          href: '/examples',
          title: 'Examples',
        },
      ],
    },
    {
      title: 'Reference',
      children: [
        {
          href: '/reference/inspect',
          title: 'Inspect',
        },
        {
          href: '/reference/values',
          title: 'Values',
        },
        {
          href: '/reference/panel',
          title: 'Panel',
        },
        {
          href: '/reference/options',
          title: 'Options',
        },
      ],
    },
    {
      href: '/theming',
      title: 'Theming',
      children: [
        {
          href: '/theming/define',
          title: 'Define',
        },
        {
          href: '/theming/vars',
          title: 'Variables',
        },
      ],
    },
    { title: 'Other', children: [{ href: '/custom', title: 'Custom components' }] },
    { href: '/alltypes', title: 'All Types', devonly: true },
    { href: '/testing', title: 'Testing', devonly: true },
    { href: '/global', title: 'Global', devonly: true },
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
    renderIf: true,
    stores: 'full',
  })

  let renderDevOnlyPanel = $state(true)
  function onkeydown(event: KeyboardEvent & { currentTarget: EventTarget & Window }) {
    if (event.key === 'æ') {
      options.renderIf = !options.renderIf
    }
    if (event.key === 'ø') {
      renderDevOnlyPanel = !renderDevOnlyPanel
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setOption = (name: keyof InspectOptions, value: any) => {
    options[name] = value
  }

  setContext('set-global-option', setOption)

  $effect(() => {
    addToPanel('page', () => ({ ...page }))
  })
</script>

<svelte:window {onkeydown} />

<InspectOptionsProvider {options}>
  <Inspect.Panel
    style="width: 290px; min-width: 290px;"
    bind:open={drawerOpen}
    position={['full-y', 'left']}
    hideGlobalValues
    openOnHover
    hideToolbar
    resize={false}
  >
    <div class="drawer-content">
      <nav class="drawer-nav">
        <ul>
          <li><a style="font-size: 32px;" href="/">Home</a></li>
          {#each routes as { href, title, devonly, children }}
            {#if !devonly || (devonly && DEV && showDevItems)}
              <li>
                {#if href}
                  <a class:active={page.url.pathname.includes(href)} {href}>{title}</a>
                {:else}
                  <span class:active={page.url.pathname.includes(title.toLowerCase())}>{title}</span
                  >
                {/if}
                {#if children}
                  <ul>
                    {#each children as child}
                      <a class:active={page.url.pathname.includes(child.href)} href={child.href}
                        >{child.title}</a
                      >
                    {/each}
                  </ul>
                {/if}
              </li>
            {/if}
          {/each}
        </ul>
      </nav>

      <div style="display: flex; flex-direction: column;gap: 1em">
        <GlobalOptions bind:options />

        <div class="badges">
          <a
            href="https://www.npmjs.com/package/svelte-inspect-value"
            aria-label="npm"
            target="_blank"
          >
            <img alt="npm" src="https://img.shields.io/npm/v/svelte-inspect-value" />
          </a>

          <a href="https://github.com/ampled/svelte-inspect-value">
            <img
              alt="github"
              src="https://img.shields.io/github/stars/ampled/svelte-inspect-value?style=social"
            />
          </a>
        </div>
      </div>
    </div>
  </Inspect.Panel>
  <Inspect.Panel appearance="floating" theme="stereo" renderIf={DEV && renderDevOnlyPanel}
  ></Inspect.Panel>

  <svelte:boundary>
    {#snippet failed(error, reset)}
      <Inspect value={error} />
      <button onclick={reset}>reset</button>
    {/snippet}
    <main class:drawer-open={drawerOpen}>
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
      </header>
      {@render children()}
    </main>
  </svelte:boundary>
</InspectOptionsProvider>

<style>
  header {
    display: flex;
    /* justify-content: space-between; */
    align-items: flex-start;
    gap: 1em;
    /* padding-inline: 1em; */
    padding-top: 1em;
    flex-wrap: wrap;
    view-transition-name: header;
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
    transition: all 200ms ease-in-out;
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 0.5em;
    padding-left: 3em;
    padding-top: 0.5em;
    width: 100%;
    margin-bottom: 150px;
  }

  nav {
    padding-inline: 1em;
    padding-top: 0.5em;
    view-transition-name: nav;
  }

  nav:not(.drawer-nav) {
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
  }

  a {
    color: #fafafa;
    transition: color 300ms linear;
    text-decoration: none;
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

  a.active,
  span.active {
    color: var(--red);
    /* text-decoration: underline; */
    position: relative;
  }

  @media (min-width: 768px) {
    main {
      width: 90%;
      /* padding-left: 3em; */
      padding-top: 0.5em;
      padding-right: 3em;
    }

    main.drawer-open {
      width: 90%;
      padding-left: calc(1.5em + 320px);
      /* padding-right: 0; */
    }

    .title {
      font-size: 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    main {
      width: 90%;
      /* padding-left: 1em; */
      padding-right: 3em;
    }

    .title {
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

  .badges {
    display: flex;
    gap: 1ch;
    width: 100%;
    /* justify-content: flex-end; */
  }

  nav.drawer-nav {
    font-family: 'EB Garamond', serif;
    font-size: 16px;

    ul {
      display: flex;
      flex-direction: column;
      padding: 0;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 1em;

      ul {
        padding-left: 1ch;
        font-size: 20px;
        font-weight: normal;
      }
    }

    ul li a,
    ul li span {
      color: var(--_text-color) !important;
      line-height: 1.5;

      &:hover {
        text-decoration: underline;
      }
    }

    ul li a.active {
      color: var(--red) !important;
    }

    li {
      list-style-type: none;
    }
  }

  .drawer-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
