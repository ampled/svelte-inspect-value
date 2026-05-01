// @ts-check
import starlight from '@astrojs/starlight'
import { ExpressiveCodeTheme } from '@astrojs/starlight/expressive-code'
import svelte from '@astrojs/svelte'
import vercel from '@astrojs/vercel'
import { defineConfig } from 'astro/config'
import fs from 'node:fs'
import starlightChangelogs, { makeChangelogsSidebarLinks } from 'starlight-changelogs'
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc'
import starlightDocSearch from '@astrojs/starlight-docsearch'

// expressive code theme
const jsoncString = fs.readFileSync(new URL(`./inspect-theme.jsonc`, import.meta.url), 'utf-8')
const myTheme = ExpressiveCodeTheme.fromJSONString(jsoncString)

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  site: 'https://inspect.eirik.space',
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        keep_classnames: true,
        keep_fnames: true,
        mangle: false,
      },
    },
  },
  integrations: [
    starlight({
      title: 'Svelte <Inspect {value} />',
      titleDelimiter: '-',
      favicon: '/favicon.png',
      customCss: [
        './src/styles/custom.css',
        '@fontsource/eb-garamond/400.css',
        '@fontsource/eb-garamond/600.css',
      ],
      logo: {
        alt: 'Svelte Inspect Value',
        replacesTitle: true,
        light: './src/assets/svilogolight.png',
        dark: './src/assets/svilogodark.png',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/ampled/svelte-inspect-value' },
        { icon: 'npm', label: 'npm', href: 'https://www.npmjs.com/package/svelte-inspect-value' },
      ],
      expressiveCode: {
        frames: {
          extractFileNameFromCode: false,
        },
        styleOverrides: {
          codeFontSize: '12px',
          borderRadius: '8px',
        },
        shiki: {
          bundledLangs: ['svelte', 'typescript', 'javascript', 'css'],
        },
        themes: [myTheme, 'min-light'],
      },
      components: {
        Head: './src/components/starlight/Head.astro',
        PageFrame: './src/components/starlight/PageFrame.astro',
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
          collapsed: true,
        },
        typeDocSidebarGroup,
        ...makeChangelogsSidebarLinks([{ type: 'all', base: 'changelog', label: 'Changelog' }]),
      ],
      plugins: [
        starlightChangelogs(),
        starlightTypeDoc({
          entryPoints: ['../../packages/svelte/src/lib/typedoc.ts'],
          tsconfig: '../../packages/svelte/tsconfig.json',
          sidebar: {
            collapsed: true,
            label: 'TypeDoc',
          },
          typeDoc: {
            formatWithPrettier: true,
            prettierConfigFile: '../../.prettierrc',
            disableSources: true,
            expandObjects: true,
            useCodeBlocks: true,
          },
          watch: false,
        }),
        starlightDocSearch({
          appId: 'AIGTN0IYT1',
          apiKey: 'ce7552a342fda13ea0251618e1e6c2ff',
          indexName: 'inspect-eirik',
        }),
      ],
    }),
    svelte({ extensions: ['.svelte'], compilerOptions: { runes: true } }),
  ],
  adapter: vercel(),
})
