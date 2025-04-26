import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types.js'

export type Document = {
  title: [string, string]
  children?: [string, string][]
  type?: string
}

async function getPosts() {
  const posts: Document[] = []

  try {
    const paths = import.meta.glob('/src/doclib/typedoc/md/**/*.md', { eager: true })
    for (const path in paths) {
      const file = paths[path]
      const type = path.split('/').at(-2)

      if (file && typeof file === 'object' && 'metadata' in file) {
        const metadata = file.metadata as Omit<Document, 'slug'>
        const post = { ...metadata, type } satisfies Document
        posts.push(post)
      }
    }
    return posts
  } catch (_err) {
    return []
  }

  // posts = posts.sort(
  //   (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
  // )
  return []
}

export const GET: RequestHandler = async () => {
  const posts = await getPosts()
  return json(posts)
}
