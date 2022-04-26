<template>
  <v-row class="last-news px-7">
    <v-col cols="12" md="7">
      <div class="news-brief">
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
          <a
            :href="news_detail.url"
            target="_blank"
            class="text_color_grey--text"
          >
            <h4 class="mb-4 orange_color_1--text">
              {{ news_detail.title_translated }}
            </h4>
          </a>

          <div class="text_color_grey--text">
            {{ news_detail.brief_translated }}
            <a :href="news_detail.url" target="_blank">
              <v-icon color="orange darken-4" small right>
                mdi-open-in-new
              </v-icon>
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
      uuid: null,
      news_detail: null,
    }
  },
  async mounted() {
    console.log(33333333333333333333)
    this.uuid = this.$route.params.uuid
    await this.displayBrief()
  },
  methods: {
    async displayBrief() {
      console.log('ssssssssssssssssssss')
      const response = await this.$axios.get(`/article/uuid/${this.uuid}`)
      this.news_detail = response.data.data
      console.log(this.news_detail)
    },
  },
}
</script>
