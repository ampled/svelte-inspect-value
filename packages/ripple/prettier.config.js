import rootconfig from '../../prettier.config.js'

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  ...rootconfig,
  plugins: [...rootconfig.plugins, '@tsrx/prettier-plugin'],
}

export default config
