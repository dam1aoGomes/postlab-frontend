import { defineStore } from 'pinia'

interface Author {
  id: number,
  name: string,
  tag: string,
  email: string
}

interface Post {
  id: number,
  title: string,
  text: string,
  author: {
    id: number,
    name: string,
    tag: string,
    email: string
  }
}

export const useMyPostStore = defineStore('posts', () => {
  const config = useRuntimeConfig()

  const showingPost = ref(true);
  const offset = ref(0);

  async function authAuthor(tag: string, email: string) {
    try {
      const response = await $fetch<Author>(config.public.api_url + '/auth/',
        {
          method: "POST",
          body: {
            tag: `@${tag}`,
            email: email
          }
        });
      return response;
    } catch (err) {
      return null;
    }
  }

  async function getPosts() {
    try {
      const response = await $fetch<Post[]>(config.public.api_url + '/posts/' + offset.value);
      showingPost.value = true;
      return response;
    } catch {
      showingPost.value = false;
      return null;
    }
  }

  async function getPostByAuthorTag(tag: string) {
    try {
      const response = await $fetch<Post[]>(config.public.api_url + '/author/' + tag, {
        method: "GET"
      });
      return response;
    } catch {
      return null;
    }
  }

  async function newPost(tag: string, email: string, title: string, text: string) {
    try {
      const reponseAuth = await authAuthor(tag, email);
      if (reponseAuth) {
        const responsePost = await $fetch<Post>(config.public.api_url + '/posts/',
          {
            method: "POST",
            body: {
              title: title,
              text: text,
              author_id: reponseAuth.id
            }
          })
        return responsePost;
      } else {
        return null;
      }
    } catch {
      return null;
    }
  }

  async function nextPage() {
    offset.value += 5;
    let res = await getPosts();
    if (res) {
      if (res.length == 0) {
        offset.value -= 5;
      }
    }
  }

  function previuosPage() {
    if (offset.value - 5 >= 0) {
      offset.value -= 5;
    }
  }

  return { getPosts, showingPost, newPost, nextPage, previuosPage, getPostByAuthorTag }
});
