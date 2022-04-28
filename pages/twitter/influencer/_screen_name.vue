<template>
  <v-row class="mx-5">
    <v-col cols="12">
      <div v-if="influencer" class="influencer">
        <div class="profile">
          <v-avatar size="120">
            <v-img
              :src="influencer.profile_image"
              width="100%"
              class="mx-auto d-block"
            ></v-img>
          </v-avatar>
          <h2 class="text_color_grey--text">{{ influencer.screen_name }}</h2>
          <h4 class="text_color_grey--text">@{{ influencer.name }}</h4>
          <h5 class="text_color_grey--text mt-1">
            {{ influencer.description }}
          </h5>
          <h5 class="text_color_grey--text mt-2">
            {{ influencer.description_translated }}
          </h5>

          <h4 class="text_color_grey--text mt-2">
            <span>followers:</span>
            {{ influencer.followers }}
          </h4>
        </div>

        <div v-if="tweets.length" class="mt-7">
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
                  <div class="pt-4 mb-3">
                    <v-avatar size="60">
                      <v-img
                        :src="influencer.profile_image"
                        width="100%"
                      ></v-img>
                    </v-avatar>
                    <span class="d-inline-block mr-3">
                      <h4>{{ influencer.name }}</h4>
                      <h5>@{{ influencer.screen_name }}</h5>
                    </span>
                  </div>
                  Tweet id: {{ tweet.id }}
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
                        <v-img
                          :src="getPath('twitter') + attachment.path"
                        ></v-img>
                      </div>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => {
    return {
      tweets: [],
      screen_name: null,
      influencer: null,
    }
  },

  async mounted() {
    this.screen_name = this.$route.params.screen_name
    await this.getInfluencer()
    await this.getTweets()
  },

  methods: {
    async getInfluencer() {
      const response = await this.$axios.get(
        `/influencer/show/${this.screen_name}`
      )
      this.influencer = response.data.data
    },

    async getTweets() {
      const response = await this.$axios.get(
        `/influencer/tweets/show/${this.influencer.id}`
      )
      this.tweets = response.data.data
    },
  },
}
</script>
