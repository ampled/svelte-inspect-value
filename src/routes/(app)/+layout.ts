export const prerender = 'auto'

import type { Document } from '$doclib/types.js'
import type { LayoutLoad } from './$types.js'

export const load = (async ({ fetch }) => {
  try {
    const result = await fetch('/api/docs').then((r) => {
      if (r.ok) {
        return r.json()
      } else {
        return r.text()
      }
    })

    console.log('RESULT')
    console.log(result)

    const docs: Document[] = await fetch('/api/docs').then((r) => r.json())
    return { docs }
  } catch (e) {
    console.error('LAYOUT LOAD ERROR:')
    console.error(e)
  }
}) satisfies LayoutLoad
