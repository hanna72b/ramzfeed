<template></template>
<script>
export default {
  components: {},
  data: () => {
    return {
      dialog: null,
      posts: [],
      news_short: [],
      loading: false,
      titles: 'd-flex',
      brief: 'd-none',
      page: 1,
      last_page: null,
    }
  },
  async created() {
    await this.lastNewsShort()
  },
  methods: {
    async lastNewsShort() {
      const response = await this.$axios.get(
        `/news-short/last?page=${this.page}`
      )
      this.news_short = response.data.data
      this.page = response.data.pagination.current_page
      this.last_page = response.data.pagination.last_page
    },
  },
}
</script>
