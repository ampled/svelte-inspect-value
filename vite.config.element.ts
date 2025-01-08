import { svelte } from '@sveltejs/vite-plugin-svelte'
import { sveltePreprocess } from 'svelte-preprocess'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    // svelte({
    //   // prebundleSvelteLibraries: true,
    //   configFile: false,
    //   compilerOptions: { customElement: true, runes: true },
    //   // onwarn(warning, defaultHandler) {
    //   //   if (warning.code === 'unused-export-let') return
    //   //   defaultHandler(warning)
    //   // },
    // }),
    svelte({
      prebundleSvelteLibraries: true,
      configFile: false,
      preprocess: sveltePreprocess({ typescript: true }),
      // include: '*.component.svelte',
      compilerOptions: {
        customElement: true,
        runes: true,
      },
      emitCss: false,
      // onwarn(warning, _defaultHandler) {
      //   console.log(warning.code)
      // },
    }),
  ],
  build: {
    sourcemap: true,
    target: 'modules',
    outDir: 'dist/ele',
    lib: {
      entry: 'src/lib/element.ts',
      name: '<<name>>',
      fileName: 'index',
    },
  },
})
