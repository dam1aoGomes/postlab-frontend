<template>
    <form @submit.prevent="onSubmit" class="w-5/6 md:w-1/3">
        <label class="input input-bordered flex items-center gap-2 mb-5 md:m-5 w-full">
            @tag
            <input type="text" class="grow" placeholder="yourtag" v-model="tag" required />
        </label>
        <label class="input input-bordered flex items-center gap-2 mb-5 md:m-5 w-full">
            Email
            <input type="text" class="grow" placeholder="your@email.com" v-model="email" required />
        </label>
        <label class="input input-bordered flex items-center gap-2 mb-5 md:m-5 w-full">
            Title
            <input type="text" class="grow" placeholder="Title" v-model="title" required />
        </label>
        <textarea placeholder="Text" v-model="text"
            class="textarea textarea-bordered textarea-lg w-full resize-none md:ml-5" rows="2" cols="20" wrap="hard" required></textarea>
        <button class="btn btn-primary md:ml-5">Post</button>
    </form>
    <!--error-->
    <div role="alert" class="alert alert-error w-1/2 mt-10" v-if="showError">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error! Incompatible data.</span>
    </div>
    <!--sucess-->
    <div role="alert" class="alert alert-success w-1/2 mt-10" v-if="showSucess">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Post created successfully!</span>
    </div>
</template>

<script setup>
const tag = ref("");
const email = ref("");
const title = ref("");
const text = ref("");

const showError = ref(false);
const showSucess = ref(false);

const postsStores = useMyPostStore();

async function onSubmit() {
    const response = await postsStores.newPost(tag.value, email.value, title.value, text.value);
    if (response) {
        showSucess.value = true;
        showError.value = false;
        setTimeout(disableMessages,3000);
    } else {
        showError.value = true;
        showSucess.value = false;
        setTimeout(disableMessages,3000);
    }
}

function disableMessages() {
    showError.value = false;
    showSucess.value = false;
}
</script>