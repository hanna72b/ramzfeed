<template>
  <div v-if="setErrors">
    <!-- //////////////////--------------TEXT    MESSAGE--------------////////////////////////////////// -->
    <div v-if="setErrors.msg_type === 'txt'">
      <v-snackbar
        v-if="setErrors.type === 'success'"
        v-model="snackbar"
        color="blue-grey darken-4"
        :timeout="timeout"
        multi-line
        vertical
        top
      >
        <h3 class="text-right">- {{ setErrors.message }}</h3>

        <v-btn
          class="mt-4 float-left"
          dark
          color="cyan darken-3"
          light
          @click="snackbar = false"
          text
        >
          بستن
        </v-btn>
      </v-snackbar>
      <!-- ///////////////////////--------- WARNING MESSAGE ----------////////////////////////////////////// -->
      <v-snackbar
        v-if="setErrors.type === 'warning'"
        v-model="snackbar"
        color="red  accent-4"
        :timeout="timeout"
        top
        absolute
        elevation="16"
        vertical
      >
        <h3 class="text-center">
          <v-icon color="#FFF">mdi-alert-box</v-icon>
          {{ setErrors.message }}
        </h3>
      </v-snackbar>
    </div>
    <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////// -->
    <!-- //////////////////--------------ARRAY    MESSAGE--------------////////////////////////////////// -->
    <div v-if="setErrors.msg_type === 'array'">
      <v-snackbar
        v-model="snackbar"
        color="blue-grey darken-4"
        :timeout="timeout"
        multi-line
        vertical
        top
      >
        <div
          v-for="(msg, index) in setErrors.message"
          :key="index"
          class="text-right w-100"
        >
          <h3 class="text-right">- {{ msg }}</h3>
        </div>

        <v-btn
          class="mt-4 float-left"
          dark
          color="cyan darken-3"
          light
          @click="snackbar = false"
          text
        >
          بستن
        </v-btn>
      </v-snackbar>

      <!-- ///////////////////////--------- WARNING MESSAGE ----------////////////////////////////////////// -->
      <v-snackbar
        v-if="setErrors.type === 'warning'"
        v-model="snackbar"
        color="red  accent-4"
        :timeout="timeout"
        top
        absolute
        elevation="16"
        vertical
      >
        <h3 class="text-center">
          <v-icon color="#FFF">mdi-alert-box</v-icon>
          <div
            v-for="(msg, index) in setErrors.message"
            :key="index"
            class="text-right w-100"
          >
            {{ msg }}
          </div>
        </h3>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => {
    return {
      multiLine: true,
      snackbar: false,
      timeout: 7000,
      msg_type: null,
    }
  },
  computed: {
    ...mapGetters(['setErrors']),
  },
  watch: {
    setErrors(val) {
      if (val.type !== null) {
        this.snackbar = true
      }
    },
  },

  mounted() {},
}
</script>

<style lang="scss">
.vue-notification-group {
  width: 100% !important;
}
</style>
