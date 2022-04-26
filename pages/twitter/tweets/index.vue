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
      <v-row>
        <v-col
          v-for="(tweet, index) in tweets"
          :key="index"
          cols="12"
          md="6"
          lg="3"
        >
          <v-card color="grey_deep_1" class="tweets mb-5 pb-5">
            <v-card-text class="px-10 py-0">
              <div v-if="tweet.influencer" class="profile pt-4 mb-3">
                <nuxt-link
                  :to="`/twitter/influencer/${tweet.influencer.screen_name}`"
                >
                  <v-avatar size="60">
                    <v-img
                      :src="tweet.influencer.profile_image"
                      width="100%"
                    ></v-img>
                  </v-avatar>
                  <span class="d-inline-block mr-3">
                    <h4>{{ tweet.influencer.name }}</h4>
                    <h5>@{{ tweet.influencer.screen_name }}</h5>
                  </span>
                </nuxt-link>
              </div>
              <div class="tweet" v-html="tweet.text_translated"></div>
              <div v-if="tweet.attachment.length" class="media">
                <div
                  v-for="(attachment, index) in tweet.attachment"
                  :key="index"
                >
                  <div v-if="attachment.type === 'url'" class="mt-2">
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
        </v-col>
      </v-row>
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
