<template>
  <div class="mx-5 tweets-page">
    <div class="d-flex justify-space-between">
      <h3 class="mt-3 mb-1 text_color_grey--text">آخرین توییت ها</h3>
    </div>

    <h6 class="orange_color_1--text mb-3 font-weight-light">
      در این بخش می‌توانید به صوررت لحظه‌ای ،توییت‌های تریدرهای حرفه ای را به
      زبان فارسی مشاهده کنید
    </h6>
    <v-row>
      <v-col cols="12" md="6">
        <div :class="[tweet_list, 'news-title']">
          <div
            v-for="(tweet, index) in tweets"
            :key="index"
            class="pt-4 font-font-weight-light"
          >
            <div class="d-flex">
              <a
                @click="gotoTweet(tweet.id)"
                :class="[active[tweet.id], 'text_color_grey--text']"
              >
                <v-avatar size="30">
                  <v-img
                    :src="
                      getPath('influencer') + tweet.influencer.profile_image
                    "
                    width="100%"
                    class="mx-auto d-block"
                  ></v-img>
                </v-avatar>
                <span
                  class="font-weight-regular my-2"
                  v-html="splitTweet(tweet.text_translated)"
                >
                </span>
              </a>
            </div>
            <div class="d-flex justify-end">
              <v-btn
                color="cyan"
                icon
                small
                @click="gotoTweet(tweet.id)"
                class="ml-5"
              >
                <v-icon right small>mdi-arrow-left</v-icon>
              </v-btn>
            </div>
            <v-divider class="mt-3"></v-divider>
          </div>
        </div>
        <!-- ====================================================================== -->
        <!-- ==================Display tweet detail only in mobile==================== -->
        <!-- ====================================================================== -->
        <div :class="[tweet_detail, 'details-of-tweet']">
          <div v-if="!tweet" class="news-title">
            <v-avatar size="80">
              <img src="~/assets/images/logo.png" width="80" />
            </v-avatar>
          </div>
          <v-card v-else dark color="#3f4248">
            <div class="d-flex justify-end">
              <div class="py-5">
                <v-btn small @click="gotoAllTweets">
                  <span>بازگشـت</span>
                  <v-icon right>mdi-arrow-left</v-icon>
                </v-btn>
              </div>
            </div>
            <v-card-text class="px-10 py-6">
              <div v-if="tweet.influencer" class="profile d-flex">
                <span>
                  <v-avatar size="80">
                    <v-img
                      :src="
                        getPath('influencer') + tweet.influencer.profile_image
                      "
                      width="100%"
                      class="mx-auto d-block"
                    ></v-img>
                  </v-avatar>
                </span>
                <span class="mr-3 mt-5 tex-right">
                  <h2 class="cyan--text n">
                    {{ tweet.influencer.name }}
                  </h2>
                  <!-- <h4 class="text_color_grey--text mt-1 sn">
                  {{ tweet.influencer.screen_name }}@
                </h4> -->

                  <h4 class="text_color_grey--text mt-1 f">
                    <span>followers:</span>
                    {{ tweet.influencer.followers }}
                  </h4>
                </span>
              </div>
              <h3 class="tweet mt-8" v-html="tweet.text_translated"></h3>
              <div v-if="tweet.attachment" class="media mt-3">
                <div
                  v-for="(attachment, index) in tweet.attachment"
                  :key="index"
                >
                  <div v-if="attachment.type === 'url'" class="mt-2 tweet-link">
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
            </v-card-text>
          </v-card>
        </div>
      </v-col>

      <v-col cols="12" md="6" class="d-none d-md-flex">
        <div v-if="!tweet" class="news-title">
          <v-avatar size="200">
            <img
              src="~/assets/images/logo2.png"
              width="200"
              class="mx-auto d-block"
            />
          </v-avatar>
        </div>
        <v-card v-else dark color="#3f4248" width="100%">
          <v-card-text class="px-10 py-6">
            <div v-if="tweet.influencer" class="profile d-flex">
              <span>
                <v-avatar size="90">
                  <v-img
                    :src="
                      getPath('influencer') + tweet.influencer.profile_image
                    "
                    width="100%"
                    class="mx-auto d-block"
                  ></v-img>
                </v-avatar>
              </span>
              <span class="mr-3 mt-5 tex-right">
                <h2 class="cyan--text n">
                  {{ tweet.influencer.name }}
                </h2>
                <!-- <h4 class="text_color_grey--text mt-1 sn">
                  {{ tweet.influencer.screen_name }}@
                </h4> -->

                <h4 class="text_color_grey--text mt-1 f">
                  <span>followers:</span>
                  {{ tweet.influencer.followers }}
                </h4>
              </span>
            </div>
            <h3
              class="tweet mt-8"
              dir="rtl"
              v-html="tweet.text_translated"
            ></h3>

            <div v-if="tweet.attachment" class="media mt-3">
              <div v-for="(attachment, index) in tweet.attachment" :key="index">
                <div v-if="attachment.type === 'url'" class="mt-2 tweet-link">
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
          </v-card-text>
        </v-card>
      </v-col>
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
    }
  },

  async mounted() {
    this.onResize()
    this.tweet_list = 'd_block'
    window.addEventListener('resize', this.onResize, { passive: true })
    this.uuid = null
    await this.lastTweets()
  },
  computed: {
    strippedContent() {
      let regex = /(<([^>]+)>)/gi
      return this.comment.content.rendered.replace(regex, '')
    },
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 959
      if (this.isMobile) {
        this.tweet_detail = 'd-none'
        this.tweet_list = 'd-block'
      } else {
        console.log(44444444444444444444444)
        this.tweet_detail = 'd-none'
        this.tweet_list = 'd-block'
      }
    },
    gotoAllTweets() {
      this.tweet_detail = 'd-none'
      this.tweet_list = 'd-block'
    },
    async gotoTweet(id) {
      if (this.isMobile) {
        console.log(333333333333333333)
        this.tweet_list = 'd-none'
        this.tweet_detail = 'd-block'
      }
      this.active = []
      this.active[id] = 'active'
      this.uuid = this.$route.query.uuid
      this.$router.push({
        query: { uuid: id },
      })
      console.log(this.uuid, 'gggggggggggggggggggggg')
      this.tweet = null
      await this.getTweet(id)
    },
    async lastTweets() {
      const response = await this.$axios.get('/tweets/index')
      this.tweets = response.data.data
    },
    strip(str) {},
    async getTweet(id) {
      this.tweet = null
      const response = await this.$axios.get(`/tweets/show/${id}`)
      this.tweet = response.data.data
    },
  },
}
</script>
