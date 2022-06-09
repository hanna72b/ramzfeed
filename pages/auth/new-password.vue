<template>
  <div>
    <v-form v-model="valid" @submit.prevent="submit">
      <v-text-field
        v-model="mobile"
        outlined
        class="mt-4"
        label="شماره موبایل"
        :disabled="true"
      ></v-text-field>
      <h2 class="orange--text">به رمزفید خوش‌آمدید</h2>
      <h3 class="text-right mt-4 mb-6">رمز عبور مورد نظر خود را وارد کنید</h3>
      <v-text-field
        v-model="pass"
        color="cyan"
        :rules="rules.passRules"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        outlined
        label="رمز عبور"
        :type="show1 ? 'text' : 'password'"
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-btn
        color="cyan"
        large
        class="mx-auto text-center d-block mt-4"
        width="100%"
        type="submit"
        >ثبت‌نهایی و ورود</v-btn
      >
    </v-form>
  </div>
</template>

<script>
export default {
  // middleware: 'guest',
  layout: 'auth_layout',
  components: {},

  data: () => {
    return {
      valid: true,
      show1: false,
      mobile: null,
      token: null,
      pass: null,
      rules: {
        passRules: [
          (v) => !!v || 'رمز عبور اجباری است',
          (v) => (v && v.length >= 6) || 'رمز عبور باید حداقل ۶ کارکتر باشد',
        ],
      },
    }
  },
  mounted() {
    this.mobile = this.$auth.$storage.getLocalStorage('mobile')
    this.token = this.$auth.$storage.getLocalStorage('token')
  },
  methods: {
    checkMobile() {
      if (!this.mobile || this.token) {
        this.$store.commit('FLUSH', 'لطفا مجددا لاگین کنید')
        return this.$router.push({ path: '/auth/mobile' })
      }
    },
    async submit() {
      const value = {
        phone: this.mobile,
        token: this.token,
        password: this.pass,
      }
      try {
        const response = await this.$axios.post('auth/create-user', value)

        if (response.data.data.id) {
          await this.$auth.loginWith('local', {
            data: {
              phone: this.mobile,
              password: this.pass,
            },
          })

          return this.$router.push('/')
        }
      } catch (error) {
        if (error.response) {
          if (error.response.data.status === 410) {
            return this.$router.push({
              path: '/auth/mobile',
              query: { message: 410 },
            })
          }
        }
        return false
      }
    },
  },
}
</script>
