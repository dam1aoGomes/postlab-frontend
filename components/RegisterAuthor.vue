<template>
  <div class="h-screen w-full flex flex-col justify-center items-center">
    <h3 class="text-lg text-center">Please provide a fictitious email address, this site is for portfolio purposes only.</h3>
    <form @submit.prevent="onSumibt" class="w-5/6 md:w-1/3">
      <label class="input input-bordered flex items-center gap-2 mb-5 md:m-5 w-full">
        Name
        <input type="text" class="grow" placeholder="your name" v-model="name" required />
      </label>
      <label class="input input-bordered flex items-center gap-2 mb-5 md:m-5 w-full">
        @tag
        <input type="text" class="grow" placeholder="your tag" v-model="tag" required />
      </label>
      <label class="input input-bordered flex items-center gap-2 mb-5 md:m-5 w-full">
        Email
        <input type="text" class="grow" placeholder="your@email.com" v-model="email" required />
      </label>
      <button class="btn btn-primary md:ml-5">Register</button>
    </form>

    <!--error-->
    <div role="alert" class="alert alert-error w-1/2 mt-10" v-if="showErro">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Registration error, try another @tag or E-mail.</span>
    </div>

    <!--sucess-->
    <div role="alert" class="alert alert-success w-1/2 mt-10" v-if="showSucess">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Registration completed successfully!</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMyAuthorStore } from '~/stores/author';

const name = ref("");
const tag = ref("");
const email = ref("");

const showSucess = ref(false);
const showErro = ref(false);

const authorStore = useMyAuthorStore()

async function onSumibt() {
  let response = await authorStore.registerAuthor(name.value, tag.value, email.value);
  if (response) {
    showSucess.value = true;
    showErro.value = false;
  } else {
    showErro.value = true;
    showSucess.value = false;
  }
}
</script>