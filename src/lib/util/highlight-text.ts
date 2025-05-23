type HighlightSearchTerm = {
  value: string
  exact: boolean
}

type Chunk = {
  match: boolean
  text: string
  start: number
  end: number
}
export function highlightText(text: string, terms: HighlightSearchTerm[]): Chunk[] {
  if (!text || !terms.length) {
    return []
  }

  const chunks: Chunk[] = []
  let currentIndex = 0

  // Build a regex pattern to match all terms
  const regexParts = terms.map(({ value, exact }) =>
    exact ? `\\b${escapeRegex(value)}\\b` : escapeRegex(value)
  )
  const regex = new RegExp(regexParts.join('|'), 'gi') // Case-insensitive global match

  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    const matchStart = match.index
    const matchEnd = regex.lastIndex

    // Add unmatched text before the match
    if (currentIndex < matchStart) {
      chunks.push({
        match: false,
        text: text.slice(currentIndex, matchStart),
        start: currentIndex,
        end: matchStart,
      })
    }

    // Add the matched text
    chunks.push({
      match: true,
      text: text.slice(matchStart, matchEnd),
      start: matchStart,
      end: matchEnd,
    })

    currentIndex = matchEnd
  }

  // Add any remaining unmatched text
  if (currentIndex < text.length) {
    chunks.push({
      match: false,
      text: text.slice(currentIndex),
      start: currentIndex,
      end: text.length,
    })
  }

  return chunks
}

// Helper function to escape special regex characters
function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
