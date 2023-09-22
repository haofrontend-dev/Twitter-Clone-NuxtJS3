// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "Nuxt tutorial with YouTube",
            meta: [
                {
                    name: "description",
                    content: "This is a tutorial to learn how to use YouTube",
                },
            ],
        },
    },
    devtools: { enabled: true },
    css: ["@/assets/_main.scss"],
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-icon"],
    ssr: false,
    runtimeConfig: {
        jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
        jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    },
});
