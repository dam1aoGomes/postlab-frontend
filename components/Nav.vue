<template>
    <div class="navbar bg-base-100">
        <div class="flex-1">
            <NuxtLink class="btn btn-ghost text-xl" href="/">PostLab</NuxtLink>
        </div>
        <div class="flex-none gap-2">
            <NuxtLink href="/register"><button class="btn btn-primary">Sign Up</button></NuxtLink>
            <form class="form-control" @submit.prevent="onsubmit">
                <input type="text" placeholder="@tag" v-model="tag" class="input input-bordered w-24 md:w-auto" />
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
const tag = ref("");

function onsubmit() {
    if (useRoute().name == "author-tag") {
        useRouter().push({ path: `@${tag.value}` });
    } else {
        useRouter().push({ path: `author/@${tag.value}` });
    }
}
</script>