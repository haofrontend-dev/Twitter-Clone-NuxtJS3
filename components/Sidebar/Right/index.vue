<script setup lang="ts">
const whatsHappenings = reactive([
    {
        title: 'SpaceX',
        count: '18.8k Tweets'
    },
    {
        title: '#CodingIsFun',
        count: '8.8k Tweets'
    },
    {
        title: '#artforall',
        count: '1.8k Tweets'
    }
])

const whoToFollowItem = reactive([
    {
        name: 'Joe Biden',
        handle: '@Joeden',
        image: 'https://picsum.photos/200/200'
    },
])
</script>
<template>
    <div class="flex flex-col">
        <!-- Preview Card : What's happening -->
        <SidebarRightPreviewCard title="What's happening">
            <SidebarRightPreviewCardItem 
                v-for="whatsHappening in whatsHappenings" 
                :key="whatsHappening.title"
            >
               <div>
                    <h2 class="font-bold text-gray-800 text-md dark:text-white">{{ whatsHappening.title }}</h2>
                    <p class="text-xs text-gray-400">{{ whatsHappening.count }}</p>
               </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>


        <!-- Preview Card : Who to follow -->
        <SidebarRightPreviewCard title="Who to follow " >
            <SidebarRightPreviewCardItem
                v-for="whoToFollow in whoToFollowItem"
                :key="whoToFollow.name"
            >
                <div class="flex flex-row justify-between p-2">
                    <div class="flex flex-row">
                        <img :src="whoToFollow.image" :alt="whoToFollow.name" class="w-10 h-10 rounded-full">

                        <div class="flex flex-col ml-2">
                            <h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ whoToFollow.name }}</h1>
                            <p class="text-xs text-gray-400">{{ whoToFollow.handle }}</p>
                        </div>
                    </div>

                    <div class="flex items-center h-full">
                        <button class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full" >Follow</button>
                    </div>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>
    </div>
</template>

<style lamg="css" coped></style>
