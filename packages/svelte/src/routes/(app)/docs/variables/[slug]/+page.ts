import type { Document } from '$doclib/types.js'
import { error } from '@sveltejs/kit'
import type { Component } from 'svelte'
import type { PageLoad } from './$types.js'

export const load = (async ({ params }) => {
  try {
    const post = await import(`$doclib/typedoc/md/variables/${params.slug}.md`)

    return {
      content: post.default as Component,
      meta: post.metadata as Partial<Document>,
    }
  } catch (_e) {
    console.error(_e)
    error(404, `Could not find ${params.slug}`)
  }
}) satisfies PageLoad
