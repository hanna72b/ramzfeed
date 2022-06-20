<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <div class="live-banner mx-5" v-bind="attrs" v-on="on">
        <div class="ltitle">خبــــرهای فـــوری</div>
        <div class="lstitle">پخش زنده سرخط خبر‌های دنیای کریپتوکارنسی</div>
        <div class="click-me">کلیک کنید</div>
      </div>
    </template>
    <v-card class="news-title-short">
      <v-row justify="center" class="news-short-header">
        <v-col cols="12" md="10" lg="5" xl="4">
          <div class="d-flex justify-space-between mt-3 mb-1">
            <v-toolbar-title> خبرهای فوری و کوتاه </v-toolbar-title>

            <v-toolbar-items>
              <v-btn dark text @click="dialog = false">
                <span class="orange--text">بازگـشت</span>

                <v-icon class="mr-3" color="orange"
                  >mdi-page-previous-outline</v-icon
                >
              </v-btn>
            </v-toolbar-items>
          </div>
        </v-col>
      </v-row>

      <v-row
        justify="center"
        style="position: relative; top: 45px"
        id="scrolling-techniques-8"
      >
        <v-col cols="12" md="10" lg="5" xl="4">
          <v-card color="background" height="100%">
            <v-card-text>
              <div>
                <h4 class="mr-1 mt-1 mb-2 cyan--text">
                  پخش زنده سرخط خبر‌های دنیای کریپتوکارنسی
                </h4>

                <div class="">
                  <div class="inner">
                    <div
                      v-for="(ns, index) in news_short"
                      :key="index"
                      class="pt-4 font-font-weight-light"
                    >
                      <h4
                        v-if="ns.publish > 1"
                        class="font-weight-regular text_color_grey--text"
                      >
                        <span v-if="ns.publish === 2">
                          <v-chip
                            v-if="ns.important"
                            color="red"
                            dark
                            label
                            small
                            class="my-2"
                          >
                            خـبر مهم
                          </v-chip>
                          {{ ns.title_translated }}
                        </span>
                        <span v-if="ns.publish === 3">
                          <v-chip
                            v-if="ns.important"
                            color="red"
                            dark
                            label
                            small
                            class="my-2"
                          >
                            خـبر مهم
                          </v-chip>
                          {{ ns.description_translated }}
                        </span>
                        <span v-if="ns.publish === 4">
                          <v-chip
                            v-if="ns.important"
                            color="red"
                            dark
                            label
                            small
                            class="my-2"
                          >
                            خـبر مهم
                          </v-chip>
                          {{ ns.title_translated }}
                          <br />
                          {{ ns.description_translated }}
                        </span>

                        <div class="like-dislike d-flex my-3 justify-end">
                          <keep-alive>
                            <component
                              :is="`likes`"
                              content="short_news"
                              :actions="ns.news_like"
                              :id="ns.id"
                            ></component>
                          </keep-alive>
                        </div>
                        <v-divider class="mt-4"></v-divider>
                      </h4>
                    </div>
                  </div>
                </div>

                <v-pagination
                  class="mx-auto d-block my-6"
                  color="cyan"
                  v-model="page"
                  @input="lastNewsShort"
                  :total-visible="7"
                  :length="last_page"
                  light
                  circle
                  dark
                ></v-pagination>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
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
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>
