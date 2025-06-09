<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements'
  import { flashOnUpdate, type FlashFn } from '../../action/update-flash.svelte.js'
  import { useOptions } from '../../options.svelte.js'

  type Props = { value?: unknown } & SVGAttributes<SVGElement>

  const { value, ...svgAttributes }: Props = $props()

  const options = useOptions()

  let flashFn = $state<FlashFn>()

  export function flash() {
    flashFn?.({ color: 'var(--_child-update-flash-color)', filter: 'none' })
  }
</script>

<svg
  use:flashOnUpdate={{
    value: () => value ?? '',
    enabled: () => options?.value?.flashOnUpdate,
    flashStyle: () => ({
      color: 'var(--_update-flash-color)',
      filter: 'drop-shadow(0 0 4px var(--_update-flash-color))',
      overflow: 'visible',
    }),
    onInit: (trigger) => (flashFn = trigger),
  }}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 1024 1024"
  {...svgAttributes}
  ><path
    fill="currentColor"
    d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37"
  /></svg
>
