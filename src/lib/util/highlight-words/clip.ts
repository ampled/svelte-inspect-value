import type { Chunk, Clip } from './index.js'

const hasProp =
  <T>(prop: string) =>
  (obj: T) =>
    obj !== null && typeof obj === 'object' && prop in obj
const hasMatch = hasProp<Chunk>('match')

const chunkExists = (chunk: Chunk | undefined): chunk is Chunk => typeof chunk !== 'undefined'

/**
 * This provides context around a chunk's text, based on the next and previous chunks.
 * e.g. If we have the string "The quick brown fox jumped over the lazy dog",
 * and the search term "fox jumped", with a padding of 2, we want to have the end result be:
 * "... quick brown fox jumped over the ..."
 * The search term, "fox jumped" is left as is, and the left and right chunks, instead of having
 * the text in full, will be clipped.
 */
export default function clip({ curr, next, prev, clipBy = 3 }: Clip): string {
  const words = curr.text.split(' ')
  const len = words.length

  // If the current is a match, we leave it alone
  // Or if the clipBy is greater than or equal to the length of the words, there's nothing to clip
  if (curr.match || clipBy >= len) {
    return curr.text
  }

  // If we have a clipBy greater than the length of the words in the current match,
  // it means we can clip the words in the current chunk
  const ellipsis = '...'

  if (chunkExists(next) && chunkExists(prev) && hasMatch(prev) && hasMatch(next)) {
    // Both the previous and the next chunks are a match
    // Let's check if we have enough words to clip by on both sides
    if (len > clipBy * 2) {
      return [...words.slice(0, clipBy), ellipsis, ...words.slice(-clipBy)].join(' ')
    }

    return curr.text
  }

  // We start to check the next and previous matches in order to
  // properly position the elipsis
  if (chunkExists(next) && hasMatch(next)) {
    // The chunk right after this one is a match
    // So we need the elipsis at the start of the returned text
    // so that it sticks correctly to the next (match)'s text
    return [ellipsis, ...words.slice(-clipBy)].join(' ')
  }

  if (chunkExists(prev) && hasMatch(prev)) {
    // The chunk right before this one is a match
    // So we need the elipsis at the end of the                                 returned text
    // so that it sticks correctly to the previous (match)'s text
    return [...words.slice(0, clipBy), ellipsis].join(' ')
  }

  // If we made it this far, just return the text
  return curr.text
}
