<template>
    <div class="w-full container">
        <h1 class="text-3xl font-bold underline">Lesson</h1>
        <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
            Lesson {{ chapter.number }} - {{ lesson.number }}
        </p>
        <h2 class="my-0">{{ lesson.title }}</h2>
        <div class="flex space-x-4 mt-2 mb-8">
            <NuxtLink v-if="lesson.sourceUrl" class="font-normal text-md text-gray-500" :to="lesson.sourceUrl">
                Download Source Code
            </NuxtLink>
            <NuxtLink v-if="lesson.downloadUrl" class="font-normal text-md text-gray-500" :to="lesson.downloadUrl">
                Download Video
            </NuxtLink>
        </div>
        <VideoPlayer v-if="lesson.videoId" :videoId="lesson.videoId" />
        <p>{{ lesson.text }}</p>
        
        <LessonCompleteButton />
    </div>
</template>
<script setup>
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
</script>