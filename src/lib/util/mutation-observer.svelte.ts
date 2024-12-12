import { onMount } from 'svelte'

export function htmlState<T extends HTMLElement = HTMLElement>(ele: T) {
  let element: T | null = $state(ele)

  const observer = new MutationObserver(([mutation]) => {
    // console.log('mutation!')
    element = null
    element = mutation.target as T
  })

  // observer.observe(ele, { attributes: true })

  onMount(() => {
    observer.observe(ele, { attributes: true })
    return () => {
      observer.disconnect()
    }
  })

  return {
    get ele() {
      return element
    },
    destroy: () => {
      observer.disconnect()
    },
  }
}
