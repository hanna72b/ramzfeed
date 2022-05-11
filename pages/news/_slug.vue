<template>
  <v-row class="last-news px-7">
    <v-col cols="12" md="7">
      <div class="news-brief">
        <div v-if="news_detail" class="mt-6">
          <div class="d-flex justify-space-between mb-5">
            <h6 class="my-2 text_color_grey--text">
              {{ news_detail.source_name }}
            </h6>
            <v-btn small to="/">
              <span>بازگشـت</span>
              <v-icon right>mdi-arrow-left</v-icon>
            </v-btn>
          </div>
          <div :href="news_detail.url" class="text_color_grey--text d-flex">
            <h2 class="mb-4 cyan--text">
              {{ news_detail.title_translated }}
            </h2>
          </div>

          <div class="text_color_grey--text lh-2 text-justify">
            <div v-html="news_detail.brief_translated"></div>
          </div>
          <a :href="news_detail.url" target="_blank">
            <v-btn text color="orange_color_1">
              <v-icon color="orange_color_1 " small left>
                mdi-open-in-new
              </v-icon>
              مـشاهده کل خـبر
            </v-btn>
          </a>
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="4" lg="5" class="front">
      <keep-alive>
        <component :is="`lastTweets`"></component>
      </keep-alive>
      <div class="divider-1"></div>
      <keep-alive>
        <component :is="`lastNewsShort`"></component>
      </keep-alive>
    </v-col>
  </v-row>
</template>

<script>
import lastNewsShort from '~/components/front/LastNewsShort'
import lastTweets from '~/components/front/LastTweets'
export default {
  components: {
    lastNewsShort,
    lastTweets,
  },
  data: () => {
    return {
      slug: null,
      news_detail: null,
    }
  },
  async mounted() {
    console.log(33333333333333333333)
    this.slug = this.$route.params.slug
    console.log(this.slug)
    await this.displayBrief()
  },
  methods: {
    async displayBrief() {
      const response = await this.$axios.get(`/news/slug/${this.slug}`)
      this.news_detail = response.data.data
      console.log(this.news_detail)
    },
  },
}
</script>
