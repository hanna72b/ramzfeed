<template>
  <v-row class="last-news" no-gutters>
    <v-col cols="12" md="7">
      <div class="news-brief mx-5">
        <div v-if="news_detail" class="mt-6">
          <div class="d-flex justify-space-between mb-5">
            <h6 class="my-2 text_color_grey--text">
              {{ news_detail.source_name }}
            </h6>
            <v-btn small to="/articles">
              <span>بازگشـت</span>
              <v-icon right>mdi-arrow-left</v-icon>
            </v-btn>
          </div>

          <h2 class="mb-4 cyan--text">
            {{ news_detail.title_translated }}
          </h2>
          <small>
            {{
              toJalali(new Date(news_detail.created_at).getTime() / 1000, true)
            }}
          </small>

          <div class="text_color_grey--text lh-2 text-justify">
            <div v-html="news_detail.brief_translated"></div>
            <a :href="news_detail.url" target="_blank">
              <v-btn text color="orange_color_1">
                <v-icon color="orange_color_1 " small left>
                  mdi-open-in-new
                </v-icon>
                مـشاهده کل مقاله
              </v-btn>
            </a>
          </div>
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
    this.slug = this.$route.params.slug
    await this.displayBrief()
  },
  methods: {
    async displayBrief() {
      const response = await this.$axios.get(`/article/slug/${this.slug}`)
      this.news_detail = response.data.data
      console.log(this.news_detail)
    },
  },
}
</script>
