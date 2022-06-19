<template>
  <div class="mx-5 short-news-front">
    <h3 class="mt-3 mb-1 text_color_grey--text">خبرهای فوری و کوتاه</h3>

    <h5 class="orange_color_1--text mb-3 font-weight-light">
      پخش زنده سرخط خبر‌های دنیای کریپتوکارنسی
    </h5>

    <div class="news-title-short">
      <div class="inner">
        <div
          v-for="(ns, index) in news_short"
          :key="index"
          class="pt-4 font-font-weight-light"
        >
          <h4
            v-if="ns.publish > 1"
            class="font-weight-regular text_color_grey--text"
          >
            <span v-if="ns.publish === 2">
              <v-chip
                v-if="ns.important"
                color="red"
                dark
                label
                small
                class="my-2"
              >
                خـبر مهم
              </v-chip>
              {{ ns.title_translated }}
            </span>
            <span v-if="ns.publish === 3">
              <v-chip
                v-if="ns.important"
                color="red"
                dark
                label
                small
                class="my-2"
              >
                خـبر مهم
              </v-chip>
              {{ ns.description_translated }}
            </span>
            <span v-if="ns.publish === 4">
              <v-chip
                v-if="ns.important"
                color="red"
                dark
                label
                small
                class="my-2"
              >
                خـبر مهم
              </v-chip>
              {{ ns.title_translated }}
              <br />
              {{ ns.description_translated }}
            </span>

            <div class="like-dislike d-flex my-3 justify-end">
              <keep-alive>
                <component
                  :is="`likes`"
                  content="short_news"
                  :actions="ns.news_like"
                  :id="ns.id"
                ></component>
              </keep-alive>
            </div>
            <v-divider class="mt-4"></v-divider>
          </h4>
        </div>
      </div>
    </div>
  </div>
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
    await this.lastNewsShort()
  },

  methods: {
    async lastNewsShort() {
      const response = await this.$axios.get('/news-short/last')
      this.news_short = response.data.data
    },
  },
}
</script>
