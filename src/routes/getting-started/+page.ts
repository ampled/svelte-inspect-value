import configured from '../../doclib/examples/configured.txt?raw'
import valuesexample from '../../doclib/examples/inspectvalueexample.txt?raw'
import minimalcode from '../../doclib/examples/minimalexample.txt?raw'
import { highlight } from '../../doclib/shiki.js'

export const load = async () => {
  const [minimalCode, valuesCode, configuredCode] = await Promise.all([
    highlight(minimalcode),
    highlight(valuesexample),
    highlight(configured),
  ])

  return {
    codeSamples: {
      minimalCode,
      valuesCode,
      configuredCode,
    },
  }
}
