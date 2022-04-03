<template>
  <div id="app">
    <v-app id="inspire">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="12" lg="11" xl="9">
            <v-row justify="center" class="my-8">
              <v-col>
                <div class="d-flex">
                  <v-icon>mdi-cart-outline</v-icon>
                  <v-icon>mdi-magnify</v-icon>
                  <v-icon>mdi-account-arrow-up-outline</v-icon>
                </div>
              </v-col>
              <v-col
                ><img
                  class="d-block mx-auto"
                  src="~/assets/images/logo-dark.svg"
              /></v-col>
              <v-col class="text-left"><span>ثبت‌نام | ورود</span></v-col>
            </v-row>
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({}),
}
</script>
