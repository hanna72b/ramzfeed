<template>
  <div>
    <v-row justify="center">
      <v-col cols="12">
        <v-card v-for="(post, index) in posts" :key="index" class="mb-5">
          <v-card-text
            ><h3 class="mb-4">{{ post.title }}</h3>
            <div v-html="post.content"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      posts: [],
    }
  },

  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const response = await this.$axios.get('/posts')
      this.posts = response.data.data
    },
  },
}
</script>
