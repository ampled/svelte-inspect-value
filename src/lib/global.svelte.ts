import { SvelteMap } from 'svelte/reactivity'

export const globalValues = new SvelteMap<unknown, () => unknown>()
