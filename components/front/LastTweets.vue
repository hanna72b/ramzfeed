<template>
  <div class="mx-5 tweet-bg-in-front">
    <div class="d-flex justify-space-between">
      <h3 class="mb-2 text_color_grey--text">تحلیل‌ها و خـبرهای توییتر</h3>
      <!-- <v-btn small to="/tweets" color="orange darken-4" depressed class="mt-3">
        مشاهده همه توییت‌ها
      </v-btn> -->
    </div>

    <h5 class="orange_color_1--text mb-4 font-weight-light">
      در این بخش می‌توانید به صوررت لحظه‌ای ،توییت‌های تریدرهای حرفه ای را به
      زبان فارسی مشاهده کنید
    </h5>
    <div class="tweets-in-front">
      <div v-for="(tweet, index) in tweets" :key="index">
        <v-card class="tweet-cards mb-5 pb-5">
          <div class="profile pt-4 mb-3">
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
                :src="getPath('influencer') + tweet.influencer.profile_image"
                width="100%"
                class="mx-auto d-block"
              ></v-img>
            </v-avatar>
          </div>
          <div class="tweet" v-html="tweet.text_translated"></div>
          <div v-if="tweet.attachment.length" class="media">
            <div v-for="(attachment, index) in tweet.attachment" :key="index">
              <div v-if="attachment.type === 'url'" class="mt-2 tweet-link">
                <v-icon color="cyan" small> mdi-open-in-new </v-icon>
                <a :href="attachment.url" target="_blank">{{
                  attachment.url
                }}</a>
              </div>
              <div v-if="attachment.type === 'img'" class="mt-2">
                <v-img :src="getPath('twitter') + attachment.path"></v-img>
              </div>
            </div>
          </div>
          <div class="text-left grey--text mt-3 ml-3">
            <small>Twitter Web App</small>
            <br />
            <small>{{
              toJalali(new Date(tweet.published_at).getTime() / 1000, true)
            }}</small>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      tweets: [],
    }
  },

  async activated() {
    await this.lastNews()
  },

  methods: {
    async lastNews() {
      const response = await this.$axios.get('/tweets/last')
      this.tweets = response.data.data
      console.log(this.tweets)
    },
  },
}
</script>
