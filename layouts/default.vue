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
    <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      class="mr-16"
    ></v-app-bar-nav-icon>
    <v-navigation-drawer
      v-model="drawer"
      app
      right
      width="100"
      color="grey_deep_1"
      floating
    >
      <div class="logo-right text-center my-4">Catinex</div>
      <div v-for="(item, i) in items" :key="i" class="mt-5">
        <v-icon
          v-text="item.icon"
          :color="item.color"
          size="30"
          class="mx-auto d-block text-center mt-1"
        ></v-icon>

        <div class="text-center mb-3 mt-1 text_color_grey--text">
          {{ item.text }}
        </div>
        <v-divider></v-divider>
      </div>

      <!-- <v-sheet color="grey lighten-5" height="128" width="100%"></v-sheet> -->
    </v-navigation-drawer>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
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
      },
      {
        icon: 'mdi-twitter',
        text: 'توییت‌هـا',
        color: '#606650',
      },
      {
        icon: 'mdi-chart-donut',
        text: 'Data Usage',
        color: '#606650',
      },
    ],
  }),
}
</script>
