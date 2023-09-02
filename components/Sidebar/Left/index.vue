<script setup>
import { HomeIcon } from "@heroicons/vue/24/solid";

import {
    HashtagIcon,
    BellIcon,
    InboxIcon,
    BookmarkIcon,
    DocumentTextIcon,
    UserIcon,
} from "@heroicons/vue/24/outline";

const { defaultTransition } = useTailwindConfig();
</script>

<template>
    <div class="h-screen flex flex-col">
        <div
            class="my-2 w-min p-2 hover:bg-blue-50 rounded-full dark:hover:bg-white/20"
            :class="defaultTransition"
        >
            <NuxtLink to="/">
                <div class="w-8 h-8">
                    <LogoTwitter />
                </div>
            </NuxtLink>
        </div>

        <div class="mt-2 space-y-3">
            <SidebarLeftTab active>
                <template #icon>
                    <HomeIcon />
                </template>
                <template #name> Home </template>
            </SidebarLeftTab>

            <SidebarLeftTab active>
                <template #icon>
                    <HashtagIcon />
                </template>
                <template #name> Explore </template>
            </SidebarLeftTab>

            <SidebarLeftTab active>
                <template #icon>
                    <BellIcon />
                </template>
                <template #name> Notification </template>
            </SidebarLeftTab>

            <SidebarLeftTab active>
                <template #icon>
                    <InboxIcon />
                </template>
                <template #name> Message </template>
            </SidebarLeftTab>

            <SidebarLeftTab active>
                <template #icon>
                    <BookmarkIcon />
                </template>
                <template #name> Booksmarks </template>
            </SidebarLeftTab>

            <SidebarLeftTab active>
                <template #icon>
                    <DocumentTextIcon />
                </template>
                <template #name> List </template>
            </SidebarLeftTab>

            <SidebarLeftTab active>
                <template #icon>
                    <UserIcon />
                </template>
                <template #name> Profile </template>
            </SidebarLeftTab>
        </div>
    </div>
</template>
