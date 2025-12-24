import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'q',
  description: "The Shell's Quiet Companion",
  base: '/q/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#e135ff' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Reference', link: '/reference/cli' },
      { text: 'GitHub', link: 'https://github.com/hyperb1iss/q' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Modes', link: '/guide/modes' },
          ],
        },
        {
          text: 'Configuration',
          items: [
            { text: 'Config File', link: '/guide/configuration' },
            { text: 'Shell Integration', link: '/guide/shell-integration' },
          ],
        },
      ],
      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'CLI', link: '/reference/cli' },
            { text: 'Configuration', link: '/reference/config' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/hyperb1iss/q' }],

    footer: {
      message: 'Released under the Apache-2.0 License.',
      copyright: 'Copyright © 2024 hyperb1iss',
    },

    search: {
      provider: 'local',
    },
  },
});
