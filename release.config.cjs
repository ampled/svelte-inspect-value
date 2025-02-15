/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ['main', { name: 'next', prerelease: true }],
  repositoryUrl: 'https://github.com/ampled/svelte-inspect-value.git',
}
