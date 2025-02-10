<template>
    <button class="btn btn-primary" @click="reloadPosts">Reload Posts</button>

    <div class="card bg-base-100 w-5/6 md:w-96 shadow-xl mt-5" v-for="post in posts">
        <div class="card-body">
            <h2 class="card-title">{{ post.title }}</h2>
            <p class="w-100 break-words">{{ post.text }}</p>
            <div class="card-actions justify-end">
                <NuxtLink :to="{name: 'author-tag', params: {tag: post.author.tag}}">
                    <button class="btn btn-primary">{{ post.author.tag }}</button>
                </NuxtLink>
            </div>
        </div>
    </div>

    <div class="card bg-base-100 w-5/6 md:w-96 shadow-xl mt-5 mb-10" v-if="showError == false">
        <div class="card-body">
            <h2 class="card-title">Sorry</h2>
            <p>We are having problems at the moment</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">@system</button>
            </div>
        </div>
    </div>

    <div class="card bg-base-100 w-5/6 md:w-96 shadow-xl mt-5 mb-10" v-if="showNotHavePost">
        <div class="card-body">
            <h2 class="card-title">No posts</h2>
            <p>We are out of posts at the moment, post something!</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">@system</button>
            </div>
        </div>
    </div>

    <div class="join grid grid-cols-2 mb-10 mt-10" v-if="showIndex">
        <button class="join-item btn btn-outline" @click="previuosPage">Previous page</button>
        <button class="join-item btn btn-outline" @click="nextPage">Next</button>
    </div>
</template>

<script setup lang="ts">
const postsStore = useMyPostStore()
const posts: Ref = ref([])
const showError = ref(false);
const showNotHavePost = ref(false);
const showIndex = ref(true);

function verifyPosts() {
    if(posts.value.length == 0) {
        showNotHavePost.value = true;
        showIndex.value = false;
    } else {
        showNotHavePost.value = false;
        showIndex.value = true;
    }
}

onBeforeMount(async () => {
    posts.value = await postsStore.getPosts();
    showError.value = postsStore.showingPost;
    verifyPosts();
});

async function reloadPosts() {
    posts.value = await postsStore.getPosts();
    showError.value = postsStore.showingPost;
    verifyPosts();
}

async function nextPage() {
    await postsStore.nextPage();
    posts.value = await postsStore.getPosts();
    showError.value = postsStore.showingPost;
    verifyPosts();
}

async function previuosPage() {
    postsStore.previuosPage();
    posts.value = await postsStore.getPosts();
    showError.value = postsStore.showingPost;
    verifyPosts();
}
</script>