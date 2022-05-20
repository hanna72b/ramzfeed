<template>
  <div class="mx-5">
    <div class="d-flex justify-space-between">
      <h3 class="mt-3 mb-1 text_color_grey--text">آخرین توییت ها</h3>
    </div>

    <h6 class="orange_color_1--text mb-3 font-weight-light">
      در این بخش می‌توانید به صوررت لحظه‌ای ،توییت‌های تریدرهای حرفه ای را به
      زبان فارسی مشاهده کنید
    </h6>
    <v-row>
      <v-col cols="12" md="6">
        <div class="news-title">
          <div
            v-for="(tweet, index) in tweets"
            :key="index"
            class="pt-4 font-font-weight-light"
          >
            <div class="d-flex">
              <nuxt-link :to="`/news/`" class="text_color_grey--text">
                <span class="font-weight-regular mr-2">
                  {{ tweet.text_translated }}
                </span>
              </nuxt-link>
            </div>

            <v-divider class="mt-3"></v-divider>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => {
    return {
      tweets: [],
      dialog: false,
      dialog_img: false,
      tweet: null,
      slug: null,
    }
  },

  async mounted() {
    this.slug = this.$route.params.slug

    await this.getTweet()
  },

  methods: {
    async getTweet() {
      this.tweet = null
      this.dialog = true
      const response = await this.$axios.get(`/tweets/show/slug/${this.slug}`)
      this.tweet = response.data.data
      console.log(this.tweet)
    },
  },
}
</script>
