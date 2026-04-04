import { vitePreprocess } from '@astrojs/svelte'

export default {
  preprocess: vitePreprocess(),
  compilerOptions: { runes: true },
}
