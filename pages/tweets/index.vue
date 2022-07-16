<template>
  <div class="mx-5 tweets-page">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="5" xl="4" class="bg-main">
        <div class="d-flex justify-space-between">
          <h3 class="mt-3 mb-1 cyan--text">آخرین توییت ها</h3>
        </div>

        <h5 class="white--text mb-3 font-weight-light">
          در این بخش می‌توانید به صوررت لحظه‌ای ،توییت‌های تریدرهای حرفه ای را
          به زبان فارسی مشاهده کنید
        </h5>
        <div class="news-title">
          <div v-if="tweets.length === 0">
            <loading></loading>
          </div>
          <div v-else class="tweet-cards">
            <div
              v-for="(tweet, index) in tweets"
              :key="index"
              class="pt-4 font-font-weight-light"
            >
              <div v-if="tweet.influencer" class="profile pt-2">
                <span class="ml-3">
                  <h5 class="text_color_grey--text text-left d-inline-block">
                    {{ tweet.influencer.screen_name }}@
                  </h5>
                  <h3 class="text-left d-inline-block">
                    {{ tweet.influencer.name }}
                  </h3>
                  <h5 class="text-left mt-1">
                    {{ numberFormat(tweet.influencer.followers)
                    }}<small class="ml-1 text_color_grey--text text-left"
                      >Followers</small
                    >
                  </h5>
                </span>
                <v-avatar size="60" class="ml-2">
                  <v-img
                    :src="
                      getPath('influencer') + tweet.influencer.profile_image
                    "
                    width="100%"
                    class="mx-auto d-block"
                  ></v-img>
                </v-avatar>
              </div>

              <div>
                <div
                  class="tweet mt-2 mb-2"
                  dir="rtl"
                  v-html="tweet.text_translated"
                ></div>

                <div v-if="tweet.attachment" class="media mt-3">
                  <div
                    v-for="(attachment, index) in tweet.attachment"
                    :key="index"
                  >
                    <div
                      v-if="attachment.type === 'url'"
                      class="mt-2 tweet-link"
                    >
                      <v-icon color="cyan" small> mdi-open-in-new </v-icon>
                      <a :href="attachment.url" target="_blank">{{
                        attachment.url
                      }}</a>
                    </div>
                    <div v-if="attachment.type === 'img'" class="mt-2"></div>
                  </div>
                </div>
              </div>
              <div class="text-left grey--text mt-3 ml-3">
                <br />
                <small>{{
                  toJalali(
                    new Date(tweet.twitter_created_at).getTime() / 1000,
                    true
                  )
                }}</small>
              </div>
              <v-divider class="mt-3"></v-divider>
            </div>
          </div>
        </div>
        <v-pagination
          class="mx-auto d-block my-6"
          color="cyan"
          v-model="page"
          @input="lastTweets"
          :total-visible="7"
          :length="last_page"
          light
          circle
          dark
        ></v-pagination>
      </v-col>

      <!-- ==============================================DETAILS======================================= -->
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
      active: [],
      page: 1,
      last_page: null,

      detail_loading: false,
    }
  },

  async mounted() {
    await this.lastTweets()
  },

  methods: {
    async lastTweets() {
      const response = await this.$axios.get(`/tweets/index?page=${this.page}`)
      this.tweets = response.data.data
      this.page = response.data.pagination.current_page
      this.last_page = response.data.pagination.last_page

      console.log(this.last_page, 'eee')
    },
  },
}
</script>
