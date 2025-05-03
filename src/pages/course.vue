<template>
    <div class="flex items-start justify-start min-h-screen py-2 gap-4">
        <div class="flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-4 w-1/3">
            <div class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[30ch] flex flex-col">
                <h1 class="text-3xl font-bold underline">
                    Chapters
                </h1>
            </div>
            <div class="space-y-1 mb-4 flex flex-col w-full" v-for="chapter in chapters" :key="chapter.slug">
                <h4>{{ chapter.title }}</h4>
                <NuxtLink v-for="(lesson, index) in chapter.lessons" :key="lesson.slug"
                    class="flex flex-row space-x-1 no-underline prose-sm font-normal py-1 px-4 -mx-4" :to="lesson.path"
                    :class="{
                        'bg-gray-200 text-blue-500': $route.fullPath === lesson.path,
                        'text-gray-600 hover:text-blue-500': $route.fullPath !== lesson.path,
                    }">
                    <span class="text-gray-500">{{ index + 1 }}.</span>
                    <span>{{ lesson.title }}</span>
                </NuxtLink>
            </div>
        </div>
        <div class="flex items-center justify-center border-2 border-gray-300 rounded-lg p-4 w-2/3">
            <NuxtPage />
        </div>
    </div>
</template>

<script setup>
const { chapters } = useCourse();
</script>
