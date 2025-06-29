export default defineNuxtRouteMiddleware((to, from) => {
    /**
     * 
     * @param to check if the user is logged in before accessing the lesson page except for the first chapter.
     * @param from 
     */
    if (to.params.chapterSlug === '1-chapter-1') {
        return
    }
    return navigateTo('/login')
})
