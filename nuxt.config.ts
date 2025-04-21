// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: 'src/',  // Specify the source directory
  devtools: { enabled: true },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
