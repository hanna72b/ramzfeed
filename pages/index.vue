<template>
  <div class="front">
    <section class="front-news">
      <keep-alive>
        <component :is="`lastNews`"></component>
      </keep-alive>
    </section>
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
}
</script>
