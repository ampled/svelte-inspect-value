import fs from 'node:fs/promises'

async function compileReleases() {
  const releases: { body: string; name: string }[] = await fetch(
    'https://api.github.com/repos/ampled/svelte-inspect-value/releases'
  ).then((r) => r.json())

  let output = ''

  releases.forEach((r) => {
    if (!r.name.includes('next')) {
      output += r.body + '\n'
    }
  })

  await fs.writeFile('./src/doclib/typedoc/Releases.md', output)
}

compileReleases()
