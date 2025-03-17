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
  import Stores from '../../doclib/examples/Stores.svelte'
  import Urls from '../../doclib/examples/Urls.svelte'

  let { data } = $props()

  let { codeSamples } = data

  const toc = new SvelteMap<string, string>()

  setContext('toc', toc)
</script>

<div class="toc">
  {#each toc as [title, id]}
    <a href={`#${id}`}>{title} </a>
    <hr />
  {/each}
</div>

<h2>Examples</h2>

<BasicEditable />
<MultiLineStrings />
<MapAndSet />
<Promises code={codeSamples.promises} />
<Stores />
<HtmlElements />
<Classes />
<Functions />
<Urls />
<GettersAndSetters code={codeSamples.gettersAndSetters} />
<Iterators code={codeSamples.iterators} />
<EmbedMedia />
<Other />
