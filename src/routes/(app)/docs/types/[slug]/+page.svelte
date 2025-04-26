<script lang="ts">
  import type { PageData } from './$types.js'

  let { data }: { data: PageData } = $props()
</script>

{#if data.meta.children}
  <div class="toc">
    {#if data.meta.title}
      <a href="#{data.meta.title[0]}" style="font-weight: bold;">{data.meta.title[1]}</a>
    {/if}
    {#each data.meta.children as [id, title]}
      <a href="#{id}">- {title}</a>
      <hr />
    {/each}
  </div>
{/if}

<data.content />
