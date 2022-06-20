<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      right
      width="100"
      color="grey_deep_1"
      mobile-breakpoint="960"
      floating
      style="border-right: 5px solid #ffbe00 !important"
    >
      <div class="logo-right text-center d-none d-md-block">
        <router-link to="/">
          <img src="~/assets/images/logo.png" width="96" />
          <div class="fidinex-menu text-center">رمـز‌فـید</div>
        </router-link>
      </div>
      <div v-if="loggedInUser" class="panel-menu-in-right">
        <router-link to="/profile">پنل‌کاربری شما</router-link>
      </div>
      <div v-else class="panel-menu-in-right">
        <router-link to="/auth/mobile"> ورود | ثبت‌نام</router-link>
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
      <Notification />
      <nuxt />
    </v-main>
    <v-footer
      height="110px"
      color="grey_deep_1"
      fixed
      class="d-sm-flex d-md-none footer"
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mr-3 berger-menu"
      ></v-app-bar-nav-icon>

      <span class="berger-menu-txt">مـنو</span>

      <div class="logo-footer">
        <router-link to="/">
          <img src="~/assets/images/logo2.png" width="96" />
        </router-link>
      </div>

      <div class="fidinex-menu">RamzFeed</div>
    </v-footer>

    <!-- main footer -->
    <v-footer height="40px" color="#44474c" fixed>
      <div class="d-flex footer-menu">
        <span class="item">درباره ما</span>
        <span class="item">تماس با ما</span>
        <span class="item"> | RamzFeed.com</span>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Notification from '@/components/Notification'

export default {
  components: { Notification },
  computed: { ...mapGetters(['isAuthenticated', 'loggedInUser']) },
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
