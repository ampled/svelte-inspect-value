/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  useTabs: false,
  singleQuote: true,
  trailingComma: "es5",
  semi: false,
  printWidth: 100,
  plugins: ['prettier-plugin-css-order'],
};

export default config;