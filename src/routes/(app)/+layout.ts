export const prerender = 'auto'

import type { Document } from '$doclib/types.js'
import type { LayoutLoad } from './$types.js'

export const load = (async ({ fetch }) => {
  const docs: Document[] = await fetch('/api/docs').then((r) => r.json())

  return { docs }
}) satisfies LayoutLoad
