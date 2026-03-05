// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

import svelte from '@astrojs/svelte'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Svelte <Inspect {value} />',
      customCss: [
        // Relative path to your custom CSS file
        './src/styles/custom.css',
      ],
      logo: {
        alt: 'Svelte <Inspect {value} />',
        replacesTitle: true,
        light: './src/assets/logolight.svg',
        dark: './src/assets/logodark.svg',
      },
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'guides/example' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
    svelte(),
  ],
})
