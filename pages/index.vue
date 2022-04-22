<template>
  <div class="front">
    <v-row class="last-news" no-gutters>
      <v-col cols="12" md="6" lg="7">
        <keep-alive>
          <component :is="`lastNews`"></component>
        </keep-alive>
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <keep-alive>
          <component :is="`lastNewsShort`"></component>
        </keep-alive>
        <keep-alive>
          <component :is="`lastTweets`"></component>
        </keep-alive>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import lastNews from '~/components/front/LastNews'
import lastNewsShort from '~/components/front/LastNewsShort'
import lastTweets from '~/components/front/LastTweets'

export default {
  components: {
    lastNews,
    lastNewsShort,
    lastTweets,
  },
  data: () => {
    return {
      tab: null,
    }
  },
}
</script>
