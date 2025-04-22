// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://mops.web.id',
  trailingSlash: 'always',
  output: 'server',

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        'react-dom/server': 'react-dom/server.edge', // Directly set the alias
      },
    },
  },

  integrations: [react()],
  adapter: cloudflare(),
});
