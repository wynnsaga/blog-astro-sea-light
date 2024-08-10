import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './remark-reading-time.mjs';
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.wynn.host/',
  integrations: [vue()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});