import type { PageLoad } from './$types.js'

export const load: PageLoad = async ({ fetch }) => {
  const packageMetaData = await fetch('https://registry.npmjs.org/svelte-inspect-value').then(
    (res) => res.json()
  )

  return {
    packageMetaData,
  }
}
