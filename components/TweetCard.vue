<template>
  <div>
    <div class="grid">
      <div class="grid-sizer"></div>
      <div class="grid-item"></div>
      <div
        v-for="(tweet, index) in tweets"
        :key="index"
        class="grid-item grid-item--width2"
      >
        Tweet id: {{ tweet.id }}
        <div v-if="tweet.influencer" class="profile pt-4 mb-3">
          <nuxt-link
            :to="`/twitter/influencer/${tweet.influencer.screen_name}`"
          >
            <v-avatar size="60">
              <v-img :src="tweet.influencer.profile_image" width="100%"></v-img>
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
              <a :href="attachment.url" target="_blank">{{ attachment.url }}</a>
            </div>
            <div v-if="attachment.type === 'img'" class="mt-2">
              <v-img
                :src="getPath('twitter') + attachment.path"
                class="attachment"
                :aspect-ratio="16 / 9"
                width="90%"
              ></v-img>
            </div>
          </div>
        </div>
        <v-btn class="mt-3" color="orange" large text>
          <v-icon left large>mdi-gesture-double-tap</v-icon>
          تـمام صفحه
        </v-btn>
      </div>
    </div>

    <v-dialog
      dark
      overlay-color="blue-grey  darken-4"
      v-model="dialog"
      width="700"
      scrollable
      overlay-opacity="0.8"
    >
      <v-card v-if="tweet" dark color="grey_deep_1">
        <v-card-text class="px-10 py-6 tweet-card-dialog">
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
                <a :href="attachment.url" target="_blank" class="tweet-link">
                  <v-icon color="orange darken-4" small right>
                    mdi-open-in-new
                  </v-icon>
                  dddd
                  {{ attachment.url }}</a
                >
              </div>
              <div v-if="attachment.type === 'img'" class="mt-2">
                <v-img
                  :src="getPath('twitter') + attachment.path"
                  @click="dialog_img = true"
                  class="cursor-pointer"
                ></v-img>
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

    <v-dialog
      dark
      overlay-color="blue-grey  darken-4"
      v-model="dialog_img"
      width="95%"
      scrollable
      overlay-opacity="0.8"
    >
      <v-card v-if="tweet" dark color="grey_deep_1">
        <v-card-text class="px-3 py-3 tweet-card-dialog">
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
          <v-btn color="orange_color_1" text @click="dialog_img = false"
            >بستن</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
if (process.browser) {
  var Masonry = require('masonry-layout')
  // var ImagesLoaded = require(“imagesloaded”);
}
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
      dialog_img: false,
      tweet: null,
    }
  },

  async activated() {
    await this.lastTweets()

    var grid = document.querySelector('.grid')
    var msnry = new Masonry(grid, {
      // options...
      itemSelector: '.grid-item',
      columnWidth: 200,

      // use element for option
      columnWidth: '.grid-sizer',
      percentPosition: true,
      horizontalOrder: true,
    })

    // grid.appendChild(elem)
    // msnry.appended(elem)
    // msnry.layout()
  },

  methods: {
    loadCards() {
      // all images are loaded
      // activate mansonry grid
      // let masonry = new Masonry(this.selector, this.options)
      // this.$emit('masonry-loaded', masonry)
    },

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
