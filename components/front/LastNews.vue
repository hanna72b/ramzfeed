<template>
  <div class="mx-5">
    <h3 class="mt-3 mb-4 text_color_grey--text">آخرین خبرها</h3>
    <div class="news-title">
      <div v-if="posts.length === 0">
        <loading></loading>
      </div>
      <div
        v-for="(post, index) in posts"
        :key="index"
        class="pt-4 font-font-weight-light"
      >
        <div class="d-flex">
          <nuxt-link :to="`/news/${post.uuid}`" class="text_color_grey--text">
            <v-avatar size="30">
              <v-img :src="getPath('long_news') + post.image_path"></v-img>
            </v-avatar>

            <span class="font-weight-regular mr-2">
              {{ post.title_translated }}
            </span>
          </nuxt-link>
        </div>

        <v-divider class="mt-3"></v-divider>
      </div>
    </div>
  </div>
</template>

<script>
import lastTweets from '~/components/front/LastTweets'
export default {
  components: {
    lastTweets,
  },
  data: () => {
    return {
      posts: [],
      news_short: [],
      loading: false,
      titles: 'd-flex',
      brief: 'd-none',
    }
  },

  async activated() {
    await this.lastNews()
    await this.lastNewsShort()
  },

  methods: {
    async lastNews() {
      const response = await this.$axios.get('/news/last')
      this.posts = response.data.data
    },

    async lastNewsShort() {
      const response = await this.$axios.get('/news-short/last')
      this.news_short = response.data.data
    },
  },
}
</script>
