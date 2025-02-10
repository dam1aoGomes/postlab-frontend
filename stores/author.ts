import { defineStore } from 'pinia'

interface Author {
  id: number,
  name: string,
  email: string
}

export const useMyAuthorStore = defineStore('author', () => {
  const config = useRuntimeConfig()

  async function registerAuthor(name: string, tag: string, email: string) {
    try {
      const response = await $fetch<Author>(config.public.api_url + '/authors/',
        {
          method: "POST",
          body: {
            name: name,
            tag: `@${tag}`,
            email: email
          }
        });
        return response;
    } catch {
      return null;
    }
  }
  return {registerAuthor}
})
