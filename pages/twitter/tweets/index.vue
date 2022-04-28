<template>
  <div class="mx-5">
    <div class="d-flex justify-space-between">
      <h3 class="mt-3 mb-1 text_color_grey--text">آخرین توییت ها</h3>
    </div>

    <h6 class="orange_color_1--text mb-3 font-weight-light">
      در این بخش می‌توانید به صوررت لحظه‌ای ،توییت‌های تریدرهای حرفه ای را به
      زبان فارسی مشاهده کنید
    </h6>
    <div>
      <keep-alive>
        <component :is="`tweet`" :cols="12" :md="6" :lg="4" :xl="4"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import tweet from '@/components/TweetCard.vue'
export default {
  components: {
    tweet,
  },
  data: () => {
    return {
      tweets: [],
    }
  },

  async mounted() {
    await this.lastTweets()
  },

  methods: {
    async lastTweets() {
      const response = await this.$axios.get('/tweets/index')
      this.tweets = response.data.data
      console.log(this.tweets)
    },
  },
}
</script>
