import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],
  content: {},

  // proxy: {
  //   '/api/': { target: 'http://localhost:8000'}, //, pathRewrite: {'^/api/': ''} }
  // },
  publicRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL
  },

  tailwindcss: {
    cssPath: '~/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true
  }
});
