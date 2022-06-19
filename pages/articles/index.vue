<template>
  <div class="front">
    <v-row class="last-news" no-gutters>
      <v-col cols="12" md="6" lg="7">
        <div class="mx-5">
          <h3 class="mt-3 mb-2 text_color_grey--text">
            آخرین تحلیل‌ها و مقالات آموزشی
          </h3>
          <h5 class="orange_color_1--text mb-3 font-weight-light">
            آخرین مقالات و تحلیل‌ها، از سراسر اینترنت
          </h5>
          <div class="news-title">
            <div v-if="articles.length === 0">
              <loading></loading>
            </div>
            <div
              v-for="(article, index) in articles"
              :key="index"
              class="pt-4 font-font-weight-light"
            >
              <div class="d-flex">
                <nuxt-link
                  :to="`/articles/${article.slug}`"
                  class="text_color_grey--text"
                >
                  <v-avatar size="30">
                    <v-img
                      :src="getPath('article') + article.image_path"
                    ></v-img>
                  </v-avatar>

                  <span class="font-weight-regular mr-2">
                    {{ article.title_translated }}
                  </span>
                </nuxt-link>
              </div>

              <v-divider class="mt-3"></v-divider>
            </div>
          </div>
          <v-pagination
            class="mx-auto d-block my-6"
            color="cyan"
            v-model="page"
            @input="lastArticles"
            :total-visible="7"
            :length="last_page"
            light
            circle
            dark
          ></v-pagination>
        </div>
      </v-col>
      <v-col cols="12" md="6" lg="5">
        <keep-alive>
          <component :is="`lastTweets`"></component>
        </keep-alive>
        <div class="divider-1"></div>
        <keep-alive>
          <component :is="`lastNewsShort`"></component>
        </keep-alive>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import lastNews from '~/components/front/LastNews'
import lastNewsShort from '~/components/front/LastNewsShort'
import lastTweets from '~/components/front/LastTweets'

export default {
  components: {
    lastNews,
    lastNewsShort,
    lastTweets,
  },
  data: () => {
    return {
      articles: [],
      page: 1,
      last_page: null,
    }
  },
  async mounted() {
    await this.lastArticles()
  },
  methods: {
    async lastArticles() {
      const response = await this.$axios.get(`/articles/last?page=${this.page}`)
      this.articles = response.data.data
      this.page = response.data.pagination.current_page
      this.last_page = response.data.pagination.last_page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>
