<script lang="ts">
  import { copyToClipBoard, logToConsole } from '$lib/hello.js'
  import Console from '$lib/icons/Console.svelte'
  import Copy from '$lib/icons/Copy.svelte'

  type Props = {
    value: any
  }

  let { value }: Props = $props()

  let copied = $state(false)

  async function copy(val: any) {
    try {
      await copyToClipBoard(val)
      copied = true
      window.setTimeout(() => {
        copied = false
      }, 5000)
    } catch {
      copied = false
    }
  }
</script>

<button onclick={() => logToConsole(value)}><Console /></button>
<button onclick={() => copy(value)} class:copied><Copy /></button>
