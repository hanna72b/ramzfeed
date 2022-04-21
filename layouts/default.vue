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
      floating
      permanent
    >
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

      <!-- <v-navigation-drawer
        v-model="drawer"
        absolute
        color="grey lighten-3"
        mini-variant
      >
        <v-avatar
          class="d-block text-center mx-auto mt-4"
          color="grey darken-1"
          size="36"
        ></v-avatar>

        <v-divider class="mx-3 my-5"></v-divider>

        <v-avatar
          v-for="n in 6"
          :key="n"
          class="d-block text-center mx-auto mb-9"
          color="grey lighten-1"
          size="28"
        ></v-avatar>
      </v-navigation-drawer> -->

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
        text: 'خـانه',
        color: '#506266',
        link: '/',
      },
      {
        icon: 'mdi-newspaper-variant-outline',
        text: 'مقالات',
        color: '#506266',
      },
      {
        icon: 'mdi-bluetooth',
        text: 'Bluetooth',
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
