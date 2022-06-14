<template>
  <div class="mx-5 tweets-page">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="5" xl="4">
        <div class="d-flex justify-space-between">
          <h3 class="mt-3 mb-1 text_color_grey--text">آخرین توییت ها</h3>
        </div>

        <h5 class="orange_color_1--text mb-3 font-weight-light">
          در این بخش می‌توانید به صوررت لحظه‌ای ،توییت‌های تریدرهای حرفه ای را
          به زبان فارسی مشاهده کنید
        </h5>
        <div class="news-title">
          <div v-if="tweets.length === 0">
            <loading></loading>
          </div>
          <div v-else>
            <div
              v-for="(tweet, index) in tweets"
              :key="index"
              class="pt-4 font-font-weight-light"
            >
              <div class="profile d-flex">
                <span>
                  <v-avatar size="70">
                    <v-img
                      :src="
                        getPath('influencer') + tweet.influencer.profile_image
                      "
                      width="100%"
                      class="mx-auto d-block"
                    ></v-img>
                  </v-avatar>
                </span>
                <span class="mr-3 mt-1 tex-right">
                  <h2 class="cyan--text n">
                    {{ tweet.influencer.name }}
                  </h2>
                  <h4 class="text_color_grey--text sn">
                    @{{ tweet.influencer.screen_name }}
                  </h4>

                  <h4 class="text_color_grey--text f">
                    {{ tweet.influencer.followers }} followers
                  </h4>
                </span>
              </div>

              <div class="">
                <h3
                  class="tweet mt-8"
                  dir="rtl"
                  v-html="tweet.text_translated"
                ></h3>

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
                    <div v-if="attachment.type === 'img'" class="mt-2">
                      <v-img
                        :src="getPath('twitter') + attachment.path"
                        @click="dialog_img = true"
                        class="cursor-pointer mx-auto"
                        :aspect-ratio="16 / 9"
                        width="100%"
                      ></v-img>
                    </div>
                  </div>
                </div>
                {{
                  toJalali(new Date(tweet.published_at).getTime() / 1000, true)
                }}
              </div>

              <v-divider class="mt-3"></v-divider>
            </div>
          </div>
        </div>
      </v-col>

      <!-- ==============================================DETAILS======================================= -->
    </v-row>

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
import tweet from '@/components/TweetCard.vue'
import loading from '@/components/Loading.vue'
import debounce from 'lodash/debounce'

export default {
  components: {
    tweet,
  },
  data: () => {
    return {
      tweets: [],
      dialog: false,
      dialog_img: false,
      tweet: null,
      active: [],
      isMobile: false,
      display_tweet_in_mobile: false,
      tweet_detail: 'd-none',
      tweet_list: 'd-block',
      detail_loading: false,
      slug: null,
    }
  },

  async mounted() {
    if (process.browser) {
      window.addEventListener('resize', this.onResize, { passive: true })
    }

    this.tweet_list = 'd_block'
  },

  watch: {
    $route: {
      immediate: true,
      async handler(tweet) {
        // document.addEventListener('resize', this.onResize, { passive: true })
        this.slug = tweet.query.tweet
        console.log(tweet.query.tweet, 'rrrrrrrrrrrrrrrrrrrrrrrrrrrr')
        this.onResize()
        if (this.slug) {
          console.log('has SLUG')
          await this.getTweet()
        } else {
          console.log('DONT has SLUG')
          await this.lastTweets()
        }
        // make actions with newVal.page
      },
    },
  },
  methods: {
    onResize: debounce(function () {
      if (process.browser) {
        this.isMobile = window.innerWidth < 959 ? true : false
      }
      console.log(
        this.isMobile,
        'iiiiiiiiiiiiiiiiiiissssssssssssssssssssssssssssssssssssss'
      )
      if (this.isMobile && this.slug) {
        console.log('a11111')
        this.tweet_detail = 'd-block'
        this.tweet_list = 'd-none'
        this.getTweet()
      } else if (this.isMobile && !this.slug) {
        console.log('a22222222')
        this.tweet_detail = 'd-none'
        this.tweet_list = 'd-block'
      }

      if (!this.isMobile && this.slug) {
        console.log('a333333')
        this.tweet_detail = 'd-none'
        this.tweet_list = 'd-block'
        this.lastTweets()
      } else if (!this.isMobile && !this.slug) {
        console.log('a4444444444444')
        this.tweet_detail = 'd-none'
        this.tweet_list = 'd-block'
      }
    }, 500),

    gotoAllTweets() {
      this.tweet_detail = 'd-none'
      this.tweet_list = 'd-block'
    },

    goToMainTweets() {
      this.$router.push('tweets')
    },
    async gotoTweet(slug) {
      // if (this.isMobile) {
      //   this.tweet_list = 'd-none'
      //   this.tweet_detail = 'd-block'
      // }

      // this.onResize()
      this.tweet = null
      this.active = []
      this.active[slug] = 'active'
      this.$router.push({ query: { tweet: slug } })

      // this.tweet = null
      await this.getTweet()
    },
    async lastTweets() {
      const response = await this.$axios.get('/tweets/index')
      this.tweets = response.data.data
    },
    async getTweet() {
      this.tweet = null
      this.detail_loading = true
      const response = await this.$axios.get(`/tweets/show/slug/${this.slug}`)
      this.tweet = response.data.data

      this.detail_loading = false
    },
  },
}
</script>
