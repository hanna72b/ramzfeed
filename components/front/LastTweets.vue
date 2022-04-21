<template>
  <div class="tweets-in-front">
    <div class="" v-for="(tweet, index) in tweets" :key="index">
      <v-card class="tweets my-5">
        <v-card-text>
          <div class="profile">
            <v-avatar>
              <v-img :src="tweet.influencer.profile_image"></v-img>
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
