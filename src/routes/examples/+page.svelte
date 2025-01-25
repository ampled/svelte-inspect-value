<script lang="ts">
  import { setContext } from 'svelte'
  import { SvelteMap } from 'svelte/reactivity'
  import BasicEditable from '../../doclib/examples/BasicEditable.svelte'
  import Classes from '../../doclib/examples/Classes.svelte'
  import EmbedMedia from '../../doclib/examples/EmbedMedia.svelte'
  import Functions from '../../doclib/examples/Functions.svelte'
  import GettersAndSetters from '../../doclib/examples/GettersAndSetters.svelte'
  import HtmlElements from '../../doclib/examples/HTMLElements.svelte'
  import Iterators from '../../doclib/examples/Iterators.svelte'
  import MapAndSet from '../../doclib/examples/MapAndSet.svelte'
  import MultiLineStrings from '../../doclib/examples/MultiLineStrings.svelte'
  import Other from '../../doclib/examples/Other.svelte'
  import Promises from '../../doclib/examples/Promises.svelte'
  import SymbolKeys from '../../doclib/examples/SymbolKeys.svelte'
  import Urls from '../../doclib/examples/Urls.svelte'

  const toc = new SvelteMap<string, string>()

  setContext('toc', toc)
</script>

<h2>Examples</h2>

<BasicEditable />
<MultiLineStrings />
<MapAndSet />
<Promises />
<HtmlElements />
<Classes />
<Functions />
<SymbolKeys />
<Urls />
<GettersAndSetters />
<Iterators />
<EmbedMedia />
<Other />

<div class="toc">
  {#each toc as [title, id]}
    <a href={`#${id}`}>{title} </a>
    <hr />
  {/each}
</div>

<style>
  .toc {
    display: none;
    transition: all 250ms ease-in;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    padding: 1em;
    position: fixed;
    /* display: flex; */
    right: 0;
    top: 50%;
    bottom: 50%;
    margin-top: auto;
    margin-bottom: auto;

    max-height: max-content;
    flex-direction: column;
    opacity: 0.5;
    transform: translateX(50%);
    z-index: 50;

    hr {
      transition: all 250ms ease-in;
    }

    &:hover {
      background-color: var(--bg);
      /* border-color: var(--border-color);
      border-width: 1px 0 1px 1px;
      border-style: solid; */
      opacity: 1;
      transform: translateX(0);

      a {
        opacity: 1;
        color: var(--fg);
        background-color: transparent;
      }

      hr {
        opacity: 0;
        border-color: var(--border-color);
      }
    }

    a {
      opacity: 0;
      transition: all 250ms ease-in;
      font-size: 0.857em;
      margin-top: 2px;
      line-height: 1;
      padding: 0.25em;
      text-decoration: none;
      color: var(--comments);
      /* background-color: var(--comments); */
      border-radius: 8px;
    }
  }

  @media (min-width: 1024px) {
    .toc {
      display: flex;
    }
  }
</style>
