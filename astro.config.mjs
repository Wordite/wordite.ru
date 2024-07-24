import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import turbolinks from '@astrojs/turbolinks'
import svgr from 'vite-plugin-svgr'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    routing: {
      redirectToDefaultLocale: true,
      prefixDefaultLocale: true,
    },
  },

  vite: {
    plugins: [
      svgr({
        svgrOptions: {
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
          memo: true,
        },
      }),
    ],
  },
})
