<template>
  <div class="mx-5">
    <div class="d-flex justify-space-between">
      <h3 class="mt-3 mb-1 text_color_grey--text">تحلیل‌ها و خـبرهای توییتر</h3>
      <v-btn small to="/tweets" color="orange darken-4" depressed class="mt-3">
        مشاهده همه توییت‌ها
      </v-btn>
    </div>

    <h5 class="orange_color_1--text mb-3 font-weight-light">
      در این بخش می‌توانید به صوررت لحظه‌ای ،توییت‌های تریدرهای حرفه ای را به
      زبان فارسی مشاهده کنید
    </h5>
    <div class="tweets-in-front">
      <div v-for="(tweet, index) in tweets" :key="index">
        <v-card color="grey_deep_1" class="tweets mb-5 pb-5">
          <v-card-text class="px-10 py-0">
            <div class="profile pt-4 mb-3">
              <v-avatar size="60">
                <v-img
                  :src="getPath('influencer') + tweet.influencer.profile_image"
                  width="100%"
                  class="mx-auto d-block"
                ></v-img>
              </v-avatar>
              <span class="d-inline-block mr-3">
                <h4>{{ tweet.influencer.name }}</h4>
                <h5>@{{ tweet.influencer.screen_name }}</h5>
              </span>
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
          </v-card-text>
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
