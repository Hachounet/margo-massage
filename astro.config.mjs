import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: "https://margomassage.fr", // update me!
  integrations: [
    sitemap()
  ]
});