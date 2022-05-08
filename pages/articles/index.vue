<template>
  <div class="front">
    <v-row class="last-news" no-gutters>
      <v-col cols="12" md="6" lg="7">
        <div class="mx-5">
          <h3 class="mt-3 mb-4 text_color_grey--text">آخرین مقالات آموزشی</h3>
          <div class="news-title">
            <div
              v-for="(article, index) in articles"
              :key="index"
              class="pt-4 font-font-weight-light"
            >
              <div class="d-flex">
                <nuxt-link
                  :to="`/articles/${article.uuid}`"
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
        </div>
      </v-col>
      <v-col cols="12" md="4" lg="5">
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
    }
  },
  async mounted() {
    await this.lastArticles()
  },
  methods: {
    async lastArticles() {
      const response = await this.$axios.get('/articles/last')
      this.articles = response.data.data
    },
  },
}
</script>
