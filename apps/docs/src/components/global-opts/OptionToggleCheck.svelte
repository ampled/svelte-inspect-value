<script lang="ts" generics="TKey extends keyof InspectOptions">
  import type { Snippet } from 'svelte'
  import type { InspectOptions } from 'svelte-inspect-value'
  import type { SvelteHTMLElements } from 'svelte/elements'
  import { globalOpts } from './globalopts.svelte'

  type OptionToggleProps = {
    children?: Snippet
    key: TKey
    disabled?: boolean
  } & SvelteHTMLElements['label']

  let { children, key, disabled, ...rest }: OptionToggleProps = $props()

  let checked = $derived(Boolean(globalOpts[key]))

  function oncheckboxcheckedchangelolol(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    ;(globalOpts[key] as unknown as boolean) = event.currentTarget.checked
  }
</script>

<label {...rest}>
  {@render children?.()}
  <input {disabled} type="checkbox" {checked} onchange={oncheckboxcheckedchangelolol} />
</label>

<style>
  input {
    margin-right: 50px;
    width: 1.5em;
    height: 1.5em;
  }
</style>
