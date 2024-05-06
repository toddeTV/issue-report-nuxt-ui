// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@tresjs/nuxt',
  ],
  ui: {
    global: true, // this will break on `pnpm build` -> if set to `false` | `undefined` the build will work
  },
})