import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // GitHub 사용자 페이지 주소. 커스텀 도메인을 쓰면 여기를 바꾸세요.
  site: 'https://mw-jeong.github.io',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
