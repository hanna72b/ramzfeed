<template>
  <div ref="form">
    <h3 class="text-right pt-10 pb-12 grey--text">
      <v-icon class="ml-1">mdi-login-variant</v-icon>
      ورود | ثبت نام
    </h3>

    <v-snackbar v-model="snackbar" :multi-line="true">
      <ul v-for="(error, index) in errors" :key="index" class="my-1 mr-6">
        <li class="mb-2">{{ error }}</li>
      </ul>
    </v-snackbar>
    <h5 class="mb-5">رمز عبور خود را وارد کنید</h5>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-text-field
          v-model="pass"
          ref="pass"
          :rules="[
            (v) => !!pass || 'این فیلد اجباری است',
            (v) => (v && v.length >= 6) || 'رمز عبور باید حداقل ۶ کارکتر باشد',
          ]"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          label="رمز عبور"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
          color="cyan"
          outlined
        ></v-text-field>
      </v-col>

      <v-btn
        @click="login"
        color="cyan"
        type="submit"
        dark
        x-large
        width="200px"
        rounded
        class="mx-auto d-block mt-5"
      >
        <v-icon>mdi-login</v-icon>
        ورود
      </v-btn>
      <div class="mt-9 grey--text">
        <v-divider class="mb-4"></v-divider>

        شماره تلفن شما: ۰۹۲۲۲۲۲۲۲۲۲۲۲۲
        <br />
        <v-btn color="blue" text class="mx-auto d-block">
          <v-icon>mdi-refresh</v-icon>
          تغییر شماره تلفن
        </v-btn>
      </div>
    </v-row>
  </div>
</template>

<script>
import { digitsFaToEn } from 'persian-tools2'

export default {
  layout: 'empty',
  components: {},
  data: () => {
    return {
      valid: true,

      show1: false,
      pass: null,
      errors: [],
      snackbar: false,
      errorMessages: '',
      formHasErrors: false,
      rules: {
        codeRules: [
          (v) => !!v || 'رمزعبور اجباری است',
          (v) => (v && v.length > 5) || 'کد تائید  باید ۴ عدد باشد',
        ],
      },
    }
  },
  computed: {
    form() {
      return {
        code: this.code,
      }
    },
  },
  watch: {
    code(val) {
      this.code = digitsFaToEn(val)
    },
  },
  transition: {
    name: 'home',
    mode: 'out-in',
  },
  mounted() {
    this.countDownTimer()
  },
  methods: {
    validation() {
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) {
          this.formHasErrors = true
        }
        this.$refs[f].validate(true)
      })
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }
    },

    async sendCodeAgain() {
      try {
        const username = await this.checkVerifyCode()

        // if (!phone) {
        //   // this.$store.commit('FLUSH', 'لطفا مجددا لاگین کنید')
        //   this.$store.commit('SET_ERRORS', {
        //     type: 'warning',
        //     messages: 'لطفا مجددا لاگین کنید',
        //   })
        //   return this.$router.push({ path: '/auth/login' })
        // }
        // const token = this.checkVerifyCode()
        const value = {
          type: 'register',
          username,
        }

        this.countDown = 90
        this.countDownTimer()
        await this.$axios.post('user/code/resend', value)
      } catch (error) {
        return false
      }
    },

    async checkVerifyCode() {
      const username = await this.$storage.getLocalStorage('username')
      console.log('ddddddddddddddddddd')
      console.log(username)
      if (!username) {
        this.errors = ['لطفا مجددا لاگین کنید']
        return this.$router.push({ path: '/auth/login' })
      }
      return username
    },
    async submit() {
      try {
        this.formHasErrors = false
        this.validation()
        this.errors = []
        const queryType = this.$route.query.q
        if (queryType === 'forgot') {
          const code = await this.$auth.$storage.getLocalStorage(
            'verify_code_token'
          )

          if (!code) {
            return this.$router.push('/auth/forgot')
          }

          const value = { code: parseInt(this.code), type: 'forgot' }
          const response = await this.$axios.post('/user/code', value)
          // this.$auth.setUserToken(response.data.data.access_token)
          return this.$router.push(
            `/auth/new-password?q=${response.data.data.uuid}`
          )
        } else {
          const username = await this.$storage.getLocalStorage('username')
          const value = {
            code: parseInt(this.code),
            username,
          }
          if (!this.formHasErrors) {
            const response = await this.$axios.post('/user/code', value)
            console.log(response.data)
            this.$auth.setUserToken(response.data.data.access_token)
            return this.$router.push('/')
          }
        }
      } catch (error) {
        this.snackbar = true

        if (error) {
          return this.errors.push(error.response.data.message)
        }
      }
    },
  },
}
</script>
