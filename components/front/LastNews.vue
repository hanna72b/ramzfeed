<template>
  <div class="mx-5">
    <h3 class="mt-3 mb-2 text_color_grey--text">آخرین خبرها</h3>
    <h5 class="orange_color_1--text mb-3 font-weight-light">
      خبرهای بیش از پنجاه سایت خبری را در این قسمت مشاهده کنید
    </h5>
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
          <router-link :to="`/news/${post.slug}`" class="text_color_grey--text">
            <v-avatar size="30">
              <v-img :src="getPath('long_news') + post.image_path"></v-img>
            </v-avatar>

            <span class="font-weight-regular mr-2">
              {{ post.title_translated }}
            </span>
          </router-link>
        </div>

        <div class="like-dislike d-flex mt-3 justify-end">
          <keep-alive>
            <component
              :is="`likes`"
              content="news"
              :id="post.id"
              :actions="post.news_like"
            ></component>
          </keep-alive>
        </div>

        <v-divider class="mt-3"></v-divider>
      </div>
    </div>
    <v-pagination
      class="mx-auto d-block my-6"
      color="cyan"
      v-model="page"
      @input="lastNews"
      :total-visible="7"
      :length="last_page"
      light
      circle
      dark
    ></v-pagination>
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
      page: 1,
      last_page: null,
    }
  },

  async activated() {
    await this.lastNews()
    await this.lastNewsShort()
  },

  methods: {
    async lastNews() {
      const response = await this.$axios.get(`/news/last?page=${this.page}`)
      this.posts = response.data.data
      this.page = response.data.pagination.current_page
      this.last_page = response.data.pagination.last_page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    async lastNewsShort() {
      const response = await this.$axios.get('/news-short/last')
      this.news_short = response.data.data
    },
  },
}
</script>
