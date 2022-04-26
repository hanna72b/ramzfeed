<template>
  <div class="mx-5">
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
          <h4 class="font-weight-regular text_color_grey--text">
            {{ ns.title_translated }}
          </h4>

          <v-divider class="mt-3"></v-divider>
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
