<template>
  <v-row class="last-news px-7">
    <v-col cols="12" md="6">
      <h3 class="mt-3 mb-4 text_color_grey--text">آخرین خبرها</h3>
      <div class="news-title">
        <div class="inner">
          <div
            v-for="(post, index) in posts"
            :key="index"
            class="pt-4 font-font-weight-light"
          >
            <nuxt-link :to="`/news/${post.uuid}`" class="text_color_grey--text">
              <h5 class="font-weight-regular">
                {{ post.title_translated }}
              </h5>
            </nuxt-link>
            <v-divider class="mt-3"></v-divider>
          </div>
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="6">
      <h3 class="mt-3 mb-1 text_color_grey--text">خبرهای فوری و کوتاه</h3>

      <h6 class="orange_color_1--text mb-3 font-weight-light">
        خبرهای این بخش به صورت لحظه‌ای از بیش از صد سایت خبری خارج و ترجمه میشود
      </h6>

      <div class="news-title-short">
        <div class="inner">
          <div
            v-for="(ns, index) in news_short"
            :key="index"
            class="pt-4 font-font-weight-light"
          >
            <nuxt-link :to="`/news/${ns.uuid}`" class="text_color_grey--text">
              <h5 class="font-weight-regular">
                {{ ns.title_translated }}
              </h5>
            </nuxt-link>
            <v-divider class="mt-3"></v-divider>
          </div>
        </div>
      </div>
      <div class="divider-1"></div>
      <div class="tweets-front">
        <h3 class="mt-3 mb-1 text_color_grey--text">
          سیگنال‌ها و خبرهای توییتر
        </h3>

        <h6 class="orange_color_1--text mb-3 font-weight-light">
          توییت‌های بزرگان توییتر را به صورت لحظه‌ای و به زبان فارسی مشاهده کنید
        </h6>

        <div class="news-title-short">
          <div class="inner">
            <div
              v-for="(ns, index) in news_short"
              :key="index"
              class="pt-4 font-font-weight-light"
            >
              <nuxt-link :to="`/news/${ns.uuid}`" class="text_color_grey--text">
                <h5 class="font-weight-regular">
                  {{ ns.title_translated }}
                </h5>
              </nuxt-link>
              <v-divider class="mt-3"></v-divider>
            </div>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
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
