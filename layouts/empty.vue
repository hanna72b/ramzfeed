<template>
  <v-app dark class="empty-layout">
    <v-main>
      <v-container>
        <div>
          <v-btn
            color="red"
            depressed
            fab
            class="mt-5"
            @click="$router.push('/')"
          >
            <v-icon color="#FFF">mdi-close-thick</v-icon>
          </v-btn>
        </div>
        <v-row justify="center">
          <v-col cols="11" md="7" lg="4">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {}
  },
}
</script>
