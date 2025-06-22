<template>
    <div class="w-full container">
        <h1 class="text-3xl font-bold underline">Lesson</h1>
        <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
            Lesson {{ chapter?.number }} - {{ lesson?.number }}
        </p>
        <h2 class="my-0">{{ lesson?.title }}</h2>
        <div class="flex space-x-4 mt-2 mb-8">
            <NuxtLink v-if="lesson?.sourceUrl" class="font-normal text-md text-gray-500" :to="lesson.sourceUrl">
                Download Source Code
            </NuxtLink>
            <NuxtLink v-if="lesson?.downloadUrl" class="font-normal text-md text-gray-500" :to="lesson.downloadUrl">
                Download Video
            </NuxtLink>
        </div>
        <VideoPlayer v-if="lesson?.videoId" :videoId="lesson?.videoId" />
        <p>{{ lesson?.text }}</p>
        
        <LessonCompleteButton :model-value="isLessonComplete" @update:modelValue="toggleComplete"/>
    </div>
</template>
<script lang="ts" setup>
import { useCourse } from "../../../../../composables/useCourse";

const course = useCourse();
const route = useRoute();


const chapter = computed(() => {
    return course.chapters.find((chapter) => {
        return chapter.slug.trim() === route.params.chapterSlug.trim()
    }
    );
});

const lesson = computed(() => {
    return chapter.value?.lessons.find(
        (lesson) => lesson.slug === route.params.lessonSlug
    );
});

const title = computed(() => {
    return `${lesson.value?.title} - ${course.value?.title}`;
});
useHead({
    title,
});

const progress = useState('progress', () => {
  return [];
});

const throwError = () => {
  throw new Error("This is a test error from the lesson page.");
};

const isLessonComplete = computed(() => {
  if (!progress.value[chapter.value.number - 1]) {
    return false;
  }

  if (
    !progress.value[chapter.value.number - 1][
      lesson.value.number - 1
    ]
  ) {
    return false;
  }

  return progress.value[chapter.value.number - 1][
    lesson.value.number - 1
  ];
});

const toggleComplete = () => {
  if (!progress.value[chapter.value.number - 1]) {
    progress.value[chapter.value.number - 1] = [];
  }

  progress.value[chapter.value.number - 1][
    lesson.value.number - 1
  ] = !isLessonComplete.value;
};

/**
 * @description This will create a middleware function that validates the chapter and lesson slugs.
 * This function validates the chapter and lesson slugs from the route parameters.
 * It checks if the chapter and lesson exist in the course data.
 * If not, it throws a 404 error.
 * @returns {boolean} Returns true if both chapter and lesson are found.
 * @throws {Error} Throws a 404 error if chapter or lesson is not found.
 */
definePageMeta({
  validate({ params }) {
    const course = useCourse();

    const chapter = course.chapters.find(
      (chapter) => chapter.slug === params.chapterSlug
    );

    if (!chapter) {
      return createError({
        statusCode: 404,
        message: 'Chapter not found',
      });
    }

    const lesson = chapter.lessons.find(
      (lesson) => lesson.slug === params.lessonSlug
    );

    if (!lesson) {
      return createError({
        statusCode: 404,
        message: 'Lesson not found',
      });
    }

    return true;
  },
});
</script>