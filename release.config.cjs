// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config()

console.log(process.env)

/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: [
    'main',
    { name: 'release-setup-versioning', channel: 'foo', prerelease: true },
    { name: 'next', prerelease: true },
  ],
  repositoryUrl: 'https://github.com/ampled/svelte-inspect-value.git',
}
