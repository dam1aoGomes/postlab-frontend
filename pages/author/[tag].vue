<template>
  <Nav></Nav>
  <div class="flex flex-col items-center justify-center min-h-screen w-100">
    <h1 class="p-5">Latest posts from <button class="btn btn-primary">{{ $route.params.tag }}</button></h1>

    <div class="flex flex-col items-center mt-10">
      <div class="card bg-base-100 w-5/6 md:w-96 shadow-xl mt-5" v-for="post in posts">
        <div class="card-body">
          <h2 class="card-title">{{ post.title }}</h2>
          <p class="w-100 break-words">{{ post.text }}</p>
          <div class="card-actions justify-end">
            <NuxtLink :to="{ name: 'author-tag', params: { tag: post.author.tag } }">
              <button class="btn btn-primary">{{ post.author.tag }}</button>
            </NuxtLink>
          </div>
        </div>
      </div>
      <!---->
      <div class="flex flex-col items-center mt-20" v-if="error">
        <div class="card bg-base-100 w-5/6 md:w-96 shadow-xl mt-5">
          <div class="card-body">
            <h2 class="card-title">No posts for this author</h2>
            <p class="w-100 break-words">Maybe this author doesn't exist or hasn't posted anything</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>


<script setup lang="ts">
const postsStore = useMyPostStore();
const posts: Ref = ref([]);

const error = ref(false)

const route = useRoute();

const tag = <string>route.params.tag;

onBeforeMount(async () => {
  posts.value = await postsStore.getPostByAuthorTag(tag);
  if (posts.value == null) {
    error.value = true;
  }
})
</script>
