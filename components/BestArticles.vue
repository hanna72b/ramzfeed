<template>
  <div class="best-articles">
    <div class="mx-5">
      <h3 class="mt-5 mb-3 text_color_grey--text">
        آخرین تحلیل‌ها و مقالات آموزشی
      </h3>

      <div class="news-title">
        <div v-if="articles.length === 0">
          <loading></loading>
        </div>
        <div
          v-for="(article, index) in articles"
          :key="index"
          class="font-font-weight-light"
        >
          <div class="">
            <nuxt-link
              :to="`/articles/${article.slug}`"
              class="text_color_grey--text"
            >
              <v-img
                :src="getPath('article') + article.image_path"
                :lazy-src="getPath('article') + article.image_path"
                class="image"
                width="100%"
                aspect-ratio="1"
                height="200px"
              ></v-img>

              <h3 class="font-weight-regular a-title">
                {{ article.title_translated }}
              </h3>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lastNews from '~/components/front/LastNews'
import live from '~/components/front/Live'
import lastTweets from '~/components/front/LastTweets'

export default {
  components: {
    lastNews,
    live,
    lastTweets,
  },
  data: () => {
    return {
      articles: [],
    }
  },
  async mounted() {
    await this.bestArticles()
  },
  methods: {
    async bestArticles() {
      const response = await this.$axios.get(`/articles/best`)
      this.articles = response.data.data
    },
  },
}
</script>
