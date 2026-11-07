// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';

// The live address of the website. Used for canonical URLs, the sitemap
// and social-sharing previews. Change it only if the domain changes.
export default defineConfig({
  site: 'https://premgaire.com.np',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { format: 'directory' },
  vite: { plugins: [yaml()] },
});
