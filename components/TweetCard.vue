<template>
  <div class="tweet-cards">
    <v-row>
      <v-col
        v-for="(tweet, index) in tweets"
        :key="index"
        :cols="cols"
        :md="md"
        :lg="lg"
        :xl="xl"
      >
        <v-card
          color="grey_deep_1"
          class="tweets mb-5 pb-5"
          @click="getTweet(tweet.id)"
          height="300px"
        >
          <v-card-text class="px-10 py-0">
            Tweet id: {{ tweet.id }}
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
            <div v-if="tweet.attachment" class="media">
              <div v-for="(attachment, index) in tweet.attachment" :key="index">
                <div v-if="attachment.type === 'url'" class="mt-2">
                  <a :href="attachment.url" target="_blank">{{
                    attachment.url
                  }}</a>
                </div>
                <div v-if="attachment.type === 'img'" class="mt-2">
                  <v-img
                    :src="getPath('twitter') + attachment.path"
                    class="attachment"
                  ></v-img>
                </div>
              </div>
            </div>
            <v-btn class="mt-3" color="orange" large text>
              <v-icon left large>mdi-gesture-double-tap</v-icon>
              تـمام صفحه
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
      dark
      overlay-color="cyan darken-4"
      v-model="dialog"
      width="700"
      scrollable
      overlay-opacity="0.8"
    >
      <v-card v-if="tweet" dark color="grey_deep_1">
        <v-card-text class="px-10 py-6">
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
          <h3 class="tweet" v-html="tweet.text_translated"></h3>
          <div v-if="tweet.attachment" class="media mt-8">
            <div v-for="(attachment, index) in tweet.attachment" :key="index">
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

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange_color_1" text @click="dialog = false"
            >بستن</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    cols: {
      type: Number,
      default: 12,
      require: false,
    },

    md: {
      type: Number,
      default: 6,
      require: false,
    },

    lg: {
      type: Number,
      default: 3,
      require: false,
    },

    xl: {
      type: Number,
      default: 3,
    },
  },
  data: () => {
    return {
      tweets: [],
      dialog: false,
      tweet: null,
    }
  },

  async activated() {
    await this.lastTweets()
  },

  methods: {
    async lastTweets() {
      const response = await this.$axios.get('/tweets/index')
      this.tweets = response.data.data
    },

    async getTweet(tweet_id) {
      this.tweet = null
      this.dialog = true
      const response = await this.$axios.get(`/tweets/show/${tweet_id}`)
      this.tweet = response.data.data
    },
  },
}
</script>
