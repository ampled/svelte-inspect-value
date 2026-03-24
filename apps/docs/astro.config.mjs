// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc'
import svelte from '@astrojs/svelte'

import compress from 'astro-compress'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Svelte <Inspect {value} />',
      customCss: [
        // Relative path to your custom CSS file
        './src/styles/custom.css',
        '@fontsource/eb-garamond',
      ],
      logo: {
        alt: 'Svelte Inspect Value',
        replacesTitle: true,
        light: './src/assets/logolight.svg',
        dark: './src/assets/logodark.svg',
      },
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      expressiveCode: {
        styleOverrides: {
          codeFontSize: '12px',
        },
      },
      plugins: [
        // Generate the documentation.
        starlightTypeDoc({
          entryPoints: ['../../packages/svelte/src/lib/typedoc.ts'],
          tsconfig: '../../packages/svelte/tsconfig.json',
          sidebar: {
            collapsed: true,
            label: 'TypeDoc',
          },
          typeDoc: {
            expandObjects: true,
            useCodeBlocks: true,
            sort: ['documents-first'],
          },
          watch: true,
        }),
      ],
      components: {
        Sidebar: './src/components/starlight/Sidebar.astro',
        Head: './src/components/starlight/Head.astro',
      },
      sidebar: [
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
        {
          label: 'Theming',
          autogenerate: { directory: 'theming' },
        },
        typeDocSidebarGroup,
      ],
    }),
    svelte({ extensions: ['.svelte'], compilerOptions: { runes: true } }),
    // compress({
    //   JavaScript: {
    //     terser: {
    //       compress: true,
    //       keep_classnames: true,
    //       keep_fnames: true,
    //     },
    //   },
    // }),
  ],
  vite: {
    optimizeDeps: {
      exclude: ['astro/virtual-modules/prefetch.js'],
    },
  },
})
