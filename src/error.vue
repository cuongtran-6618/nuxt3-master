<template>
    <NuxtLayout>
        <div v-if="error?.statusCode === 404" class="flex items">
            <div class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[30ch] flex flex-col">
                <h1 class="text-3xl font-bold underline">
                    Page Not Found
                </h1>
            </div>
        </div>
        <div v-else class="prose">
            <h1 class="text-3xl font-bold underline">
                Error
            </h1>
            <p>
                An error occurred while trying to load the page.
            </p>
            <p>
                Please try again later or contact support if the issue persists.                            
            </p>
            <p>
                <strong>{{ error.message }}</strong>
            </p>
        </div>
    </NuxtLayout>
</template>
<script lang="ts" setup>
const error = useError();
</script>