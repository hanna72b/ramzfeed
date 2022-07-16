<template>
  <div class="front">
    <v-row class="last-news" no-gutters>
      <v-col cols="12" md="6" lg="7">
        <keep-alive>
          <component :is="`lastNews`"></component>
        </keep-alive>
      </v-col>
      <v-col cols="12" md="6" lg="5">
        <keep-alive>
          <component :is="`lastTweets`"></component>
        </keep-alive>
        <!-- <div class="divider-1"></div> -->
        <!-- <keep-alive>
          <component :is="`lastNewsShort`"></component>
        </keep-alive> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import lastNews from '~/components/front/LastNews'

import lastTweets from '~/components/front/LastTweets'

export default {
  components: {
    lastNews,
    lastTweets,
  },
  data: () => {
    return {
      tab: null,
    }
  },
  created() {
    // this.$store.commit('SET_ERRORS', {
    //   type: 'success',
    //   msg_type: 'txt',
    //   message: 'اطلاعات شما با موفقیت ذخیره شد',
    // })
  },
}
</script>
