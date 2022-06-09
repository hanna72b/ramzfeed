<template>
  <v-app light class="mr-auth-layout">
    <section class="container">
      <v-row justify="center">
        <v-col cols="12" xl="3" lg="4" md="6">
          <notifications />

          <v-card class="mr-card">
            <router-link to="/"> </router-link>
            <v-card-text class="px-6 mt-1">
              <nuxt />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>
  </v-app>
</template>

<script>
import notifications from '@/components/Notification'

export default {
  components: {
    notifications,
  },
  data() {
    return {}
  },
  created() {},
  computed: {
    registerLoginLink() {
      if (this.$route.name === 'auth-login') return 'login'
      if (this.$route.name === 'auth-register') return 'register'
      if (this.$route.name === 'auth-code') return 'code'
      else return null
    },
  },
}
</script>
