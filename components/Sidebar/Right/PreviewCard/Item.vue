<script setup lang="ts">
const { defaultTransition, twitterBorderColor } = useTailwindConfig()
const wrapperClasses = computed(() => `${defaultTransition} ${twitterBorderColor}`)
</script>
<template>
    <div 
        class="p-3 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-350"
        :class="wrapperClasses"
    >
        <slot />
    </div>
</template>