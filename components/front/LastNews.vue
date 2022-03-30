<template>
  <v-main class="mt-3">
    <v-list-item v-for="(post, index) in posts" :key="index" class="px-0">
      <v-list-item-content>
        <v-list-item-title>
          <v-icon color="cyan" small>mdi-arrow-bottom-left-thick</v-icon>
          {{ post.title }}</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>
  </v-main>
</template>

<script>
export default {
  data: () => {
    return {
      posts: [],
    }
  },

  async activated() {
    await this.lastNews()
  },

  methods: {
    async lastNews() {
      const response = await this.$axios.get('/posts/last')
      this.posts = response.data.data
    },
  },
}
</script>
