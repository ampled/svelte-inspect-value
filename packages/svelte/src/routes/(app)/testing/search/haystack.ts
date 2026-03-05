export type NestedStructure =
  | string
  | number
  | NestedStructure[]
  | { [key: string]: NestedStructure }

/**
 * Generates a random string suitable for use as a property key.
 */
function randomKey(): string {
  return Math.random().toString(36).slice(2, 8)
}

function shuffle<T = unknown>(array: T[]) {
  let currentIndex = array.length

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

/**
 * Returns a random string or number, but never "needle".
 */
function randomPrimitive(): string | number {
  let value: string | number
  do {
    value =
      Math.random() < 0.5
        ? Math.random().toString(36).slice(2, 7)
        : Math.floor(Math.random() * 1000)
  } while (value === 'needle')
  return value
}

/**
 * Generates a nested structure with randomized property names and array contents,
 * inserting exactly one instance of "needle" at the deepest level.
 * @param depth The depth to which the nesting should go.
 * @param useRandomStructure Whether to randomly switch between array and object nesting.
 */
export function generateNestedNeedle(
  depth: number,
  withNeedle = true,
  useRandomStructure: boolean = true
): NestedStructure {
  const insertNeedle = (currentDepth: number): NestedStructure => {
    if (currentDepth === depth) {
      if (withNeedle) {
        if (Math.random() < 0.5) {
          return shuffle(['needle', randomPrimitive()])
        } else {
          return {
            [randomKey()]: 'needle',
            [randomKey()]: randomPrimitive(),
          }
        }
      } else {
        return ['not here']
      }
    }

    const useArray = useRandomStructure ? Math.random() < 0.5 : currentDepth % 2 === 0

    if (useArray) {
      const child = insertNeedle(currentDepth + 1)
      return shuffle([
        child,
        randomPrimitive(),
        Math.random() < 0.5 ? generateNestedNeedle(1, false) : randomPrimitive(),
      ])
    } else {
      return {
        [randomKey()]: Math.random() < 0.5 ? generateNestedNeedle(1, false) : ['boo!'],
        [randomKey()]: insertNeedle(currentDepth + 1),
        [randomKey()]: randomPrimitive(),
        [randomKey()]: Math.random() < 0.5 ? generateNestedNeedle(1, false) : { isItHere: 'no' },
        [randomKey()]: randomPrimitive(),
      }
    }
  }

  return insertNeedle(0)
}
