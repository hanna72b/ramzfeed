<template>
  <div>
    <keep-alive>
      <component :is="`videos`"></component>
    </keep-alive>
    <v-row justify="center" class="my-12">
      <v-col cols="6" md="6" lg="3">
        <div class="category-front-grid">
          <div>
            <h3>آخـرین اخبار و مقالات</h3>
            <h2 class="name text-center">NFT</h2>
          </div>
          <img src="~/assets/images/icons/nft.png" />
        </div>
      </v-col>

      <v-col cols="6" md="6" lg="3">
        <div class="category-front-grid">
          <div>
            <h3>آخـرین اخبار و مقالات</h3>
            <h2 class="name">رمـز ارزهـا</h2>
          </div>
          <img src="~/assets/images/icons/bitcoin.png" />
        </div>
      </v-col>

      <v-col cols="6" md="6" lg="3">
        <div class="category-front-grid">
          <div>
            <h3>آخـرین اخبار و مقالات</h3>
            <h2 class="name">فـارکس</h2>
          </div>
          <img src="~/assets/images/icons/tether.png" />
        </div>
      </v-col>

      <v-col cols="6" md="6" lg="3">
        <div class="category-front-grid">
          <div>
            <h3>آخـرین اخبار و مقالات</h3>
            <h2 class="name">مـتاورس</h2>
          </div>
          <img src="~/assets/images/icons/ar-glasses.png" />
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <div>
          <span>
            <v-icon>mdi-circle-half-full</v-icon>
            <span>آخرین خـبرهـا</span>
          </span>
          <keep-alive>
            <component :is="`lastNews`"></component>
          </keep-alive>
        </div>
      </v-col>
      <v-col cols="4">
        <div>
          <span>
            <v-icon>mdi-circle-half-full</v-icon>
            <span>آخرین مـقالات آمـوزشی</span>
          </span>
          <keep-alive>
            <component :is="`lastNews`"></component>
          </keep-alive>
        </div>
      </v-col>

      <v-col cols="4">
        <div class="last-videos-front-banner-lg">
          <img src="~/assets/images/front/last_video.jpg" class="w-100" />
          <h2>آخرین ویدیوهای آموزشی</h2>
          <h3>از بهترین تریدرهای دنیا</h3>
          <h4>همراه با زیر نویس فارسی</h4>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import lastNews from '~/components/front/LastNews'
import videos from '~/components/front/Videos'
export default {
  components: {
    lastNews,
    videos,
  },
}
</script>
