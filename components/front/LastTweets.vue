<template>
  <div class="mx-5">
    <h3 class="mt-3 mb-1 text_color_grey--text">خبرهای فوری و کوتاه</h3>

    <h6 class="orange_color_1--text mb-3 font-weight-light">
      خبرهای این بخش به صورت لحظه‌ای از بیش از صد سایت خبری خارج و ترجمه میشود
    </h6>
    <div class="tweets-in-front">
      <div v-for="(tweet, index) in tweets" :key="index">
        <v-card color="grey_deep_1" class="tweets mb-5">
          <v-card-text class="px-15 py-0">
            <div class="profile">
              <v-avatar>
                <v-img
                  :src="tweet.influencer.profile_image"
                  width="100%"
                ></v-img>
              </v-avatar>
              <h5>{{ tweet.influencer.name }}</h5>

              <h6>@{{ tweet.influencer.screen_name }}</h6>
            </div>
            <div class="tweet">{{ tweet.text_translated }}</div>
            <div v-if="tweet.media.length" class="media">
              <v-img :src="getPath('twitter') + tweet.media[0].path"></v-img>
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
