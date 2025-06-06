// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	// Specify the source directory
	srcDir: "src/",
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss"],
});