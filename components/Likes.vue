<template>
  <div>
    <v-btn
      @click="action('like', id)"
      color="#02ff1533"
      small
      :loading="likes_loading"
      depressed
      width="120px"
    >
      <v-icon color="#0eff00" small left
        >mdi-chart-timeline-variant-shimmer</v-icon
      >
      <span>صعودی</span>
      <span class="mr-3">{{ likes }}</span>
    </v-btn>

    <v-btn
      @click="action('dislike')"
      small
      color="#ff020233"
      :loading="dislikes_loading"
      depressed
      class="ml-2 mr-3"
      width="120px"
    >
      <v-icon small left color="#ff0000">mdi-chart-timeline-variant</v-icon>
      <span>نزولی</span>
      <span class="mr-3">{{ dislikes }}</span>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    content: {
      type: String,
      default: '',
      require: false,
    },
    id: {
      type: Number,
      default: 0,
      require: false,
    },
    actions: {
      type: Object,
      default: null,
      require: false,
    },
  },
  data() {
    return {
      likes: 0,
      dislikes: 0,
      likes_loading: false,
      dislikes_loading: false,
    }
  },
  computed: { ...mapGetters(['isAuthenticated', 'loggedInUser']) },

  mounted() {
    this.getActions()
  },
  methods: {
    getActions() {
      if (this.actions) {
        this.likes = this.actions.likes
        this.dislikes = this.actions.dislikes
      }
    },
    async action(act, id) {
      try {
        if (!this.loggedInUser) {
          return this.$store.commit('SET_ERRORS', {
            type: 'warning',
            msg_type: 'txt',
            message: 'برای ثبت نظر باید وارد سایت شوید',
          })
        }

        console.log(id, 'id')

        if (act === 'like') {
          this.likes_loading = true
        } else {
          this.dislikes_loading = true
        }
        const value = {
          content: this.content,
          act: act,
          id: this.id,
        }
        let response
        if (this.content === 'news') {
          response = await this.$axios.post('/news/like', value)
        } else {
          response = await this.$axios.post('/news-short/like', value)
        }

        if (response) {
          this.likes_loading = false
          this.dislikes_loading = false
          this.likes = response.data.data.likes
          this.dislikes = response.data.data.dislikes
        }
      } catch (error) {
        this.likes_loading = false
        this.dislikes_loading = false
        if (error.response && error.response.data.status === 422) {
          this.$store.commit('SET_ERRORS', {
            type: 'warning',
            msg_type: 'txt',
            message: error.response.data.message,
          })
        }
      }
    },
  },
}
</script>
<style></style>
