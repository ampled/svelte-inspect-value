import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types.js'

export const load = (async ({ params }) => {
  try {
    const post = await import(`$doclib/typedoc/md/${params.file}.md`)

    return {
      content: post.default,
      meta: post.metadata,
    }
  } catch (_e) {
    console.error(_e)
    error(404, `Could not find ${params.file}`)
  }
}) satisfies PageLoad
