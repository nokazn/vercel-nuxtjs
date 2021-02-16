import * as path from 'path';
import type { NuxtConfig } from '@nuxt/types';

const generateRelativePath = (r: string) => (p?: string) => {
  return path.join(__dirname, r, p || '');
};
const relative = generateRelativePath('./');

const nuxtConfig: NuxtConfig = {
  ssr: true,
  rootDir: relative(),
  srcDir: relative(),
  telemetry: false,
  head: {
    titleTemplate: `%s - ${process.env.npm_package_name}`,
    title: process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    script: [],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
  ],
  modules: [
  ],
  server: {
    port: process.env.PORT || 3000,
  },
  build: {
    extend(config, { isServer }) {
      config.resolve = config.resolve || { alias: {} };
      Object.assign(config.resolve.alias, {
        ...config.resolve.alias,
        '~': relative(),
      });
    },
  },
  plugins: [],
  router: {},
  css: [],
  loading: { color: '#fff' },
};

export default nuxtConfig;
