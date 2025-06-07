import type { PageLoad } from './$types.js'

export const load = (async ({ fetch }) => {
  const installCount = fetch(
    'https://api.npmjs.org/downloads/point/1970-01-01:2038-01-19/svelte-inspect-value'
  )
    .then((res) => res.json())
    .then((res) => res.downloads as number)

  const githubStars = fetch('https://api.github.com/repos/ampled/svelte-inspect-value')
    .then((res) => res.json())
    .then((data) => data.stargazers_count as number)

  return {
    stats: Promise.all([installCount, githubStars]).then(([installCount, githubStars]) => ({
      installCount,
      githubStars,
    })),
  }
}) satisfies PageLoad
