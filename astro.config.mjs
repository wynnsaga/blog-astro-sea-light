import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './remark-reading-time.mjs';
import vue from "@astrojs/vue";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.wynn.host/',
  integrations: [vue(), mdx()],
  markdown: {
    remarkPlugins: [remarkReadingTime]
  }
});