<template>
  <div>
    <v-row justify="center" class="mt-6">
      <v-col cols="11" md="8" lg="7" xl="6">
        <div class="d-flex justify-space-between">
          <h3 class="text-right mb-6">پروفایل کاربری</h3>
          <v-btn text color="cyan" @click="logout">خروج</v-btn>
        </div>

        <v-form v-model="valid" @submit.prevent="submitData">
          <v-row>
            <v-col cols="12" lg="6" md="6">
              <v-text-field v-model="name" label="نام" outlined></v-text-field>
            </v-col>

            <v-col cols="12" lg="6" md="6">
              <v-text-field
                v-model="family"
                label="نام خانوادگی"
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="12" lg="6" md="6">
              <v-text-field
                v-model="phone"
                label="موبایل"
                :disabled="true"
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="12" lg="6" md="6">
              <v-text-field
                v-model="email"
                :rules="rules.email"
                label="ایمیل"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="deep-orange"
              depressed
              large
              width="200px"
              type="submit"
              class="mx-auto d-block"
              >ذخیره</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},

  data() {
    return {
      valid: true,
      name: null,

      family: null,
      email: null,

      phone: null,

      rules: {
        email: [
          (v) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'یک ایمیل صحیح وارد کنید',
        ],
      },
    }
  },
  computed: { ...mapGetters(['isAuthenticated', 'loggedInUser']) },
  created() {
    if (this.loggedInUser) {
      this.phone = this.loggedInUser.mobile
      this.email = this.loggedInUser.email
      this.name = this.loggedInUser.first_name
      this.family = this.loggedInUser.last_name
    }
  },
  methods: {
    async submitData() {
      try {
        const data = {
          first_name: this.name,
          last_name: this.family,
          email: this.email,
        }

        await this.$axios.put('/user/profile', data)
        this.$store.commit('SET_ERRORS', {
          type: 'success',
          messages: { message: 'اطلاعات شما با موفقیت ذخیره شد' },
        })
      } catch (error) {
        return error
      }
    },

    logout() {
      this.$auth.logout()
      return this.$router.push({
        path: '/',
      })
    },
  },
}
</script>
