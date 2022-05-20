<template>
  <v-app id="inspire">
    <!-- <v-app-bar
      app
      clipped-right
      dense
      fade-img-on-scroll
      height="50"
      color="grey_deep_0"
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mr-16"
      ></v-app-bar-nav-icon>
    </v-app-bar> -->

    <v-navigation-drawer
      v-model="drawer"
      app
      right
      width="100"
      color="grey_deep_1"
      mobile-breakpoint="960"
      style="border-right: 5px solid #ffbe00 !important"
    >
      <div class="logo-right text-center d-none d-md-block">
        <img src="~/assets/images/logo2.png" width="96" />
        <div class="fidinex-menu">FidiNEX</div>
      </div>

      <div v-for="(item, i) in items" :key="i" class="mt-5">
        <v-btn
          :color="item.color"
          :to="item.link"
          class="mx-auto d-block mb-10"
          active-class="right-menu-active"
          depressed
          text
        >
          <div class="d-flex flex-column">
            <v-icon x-large class="">{{ item.icon }}</v-icon>

            <div class="name-of-link">{{ item.text }}</div>
          </div>
        </v-btn>

        <v-divider></v-divider>
      </div>

      <!-- <v-sheet color="grey lighten-5" height="128" width="100%"></v-sheet> -->
    </v-navigation-drawer>

    <v-main>
      <nuxt />
    </v-main>

    <v-footer
      height="70px"
      color="grey_deep_1"
      fixed
      class="d-sm-flex d-md-none footer"
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mr-3"
      ></v-app-bar-nav-icon>
      مـنو

      <div class="logo-footer">
        <img src="~/assets/images/logo2.png" width="96" />
      </div>

      <div class="fidinex-menu">FidiNEX</div>
    </v-footer>
  </v-app>
</template>

<script>
import currencies from '~/components/Currencies.vue'
export default {
  components: { currencies },
  data: () => ({
    drawer: null,
    collapseOnScroll: true,
    items: [
      {
        icon: 'mdi-home-analytics',
        text: 'خـبرها',
        color: '#506266',
        link: '/',
      },
      {
        icon: 'mdi-newspaper-variant-outline',
        text: 'مقالات',
        color: '#506266',
        link: '/articles',
      },
      {
        icon: 'mdi-twitter',
        text: 'توییت‌هـا',
        color: '#506266',
        link: '/tweets',
      },
    ],
  }),
}
</script>
