import gettersAndSettersCode from '$doclib/examples/gettersandsetters.txt?raw'
import iteratorsCode from '$doclib/examples/iterators.txt?raw'
import promisesCode from '$doclib/examples/promises.txt?raw'
import { highlight } from '$doclib/shiki.js'

export const load = async () => {
  const [promises, gettersAndSetters, iterators] = await Promise.all([
    highlight(promisesCode),
    highlight(gettersAndSettersCode),
    highlight(iteratorsCode),
  ])

  return {
    codeSamples: {
      promises,
      gettersAndSetters,
      iterators,
    },
  }
}
