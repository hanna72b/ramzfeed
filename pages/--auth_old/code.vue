<template>
  <div ref="form">
    <h3 class="text-right pt-10 pb-12 grey--text">
      <v-icon class="ml-1">mdi-account-plus</v-icon>
      تائید هویت
    </h3>
    <h5 class="text-center mb-4 text--grey">
      کد تایید چهار رقمی که برای شما SMS شده است را وارد کنید
    </h5>
    <v-snackbar v-model="snackbar" :multi-line="true">
      <ul v-for="(error, index) in errors" :key="index" class="my-1 mr-6">
        <li class="mb-2">{{ error }}</li>
      </ul>
    </v-snackbar>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-text-field
          v-model="code"
          ref="code"
          :error-messages="errorMessages"
          :rules="rules.codeRules"
          maxlength="4"
          outlined
          color="cyan"
        ></v-text-field>

        <div v-if="countDown > 0" class="text-center mt-5 grey--text">
          <v-icon>mdi-clock</v-icon>
          <span> {{ countDown }} ثانیه تا ارسال پیامک</span>
        </div>
        <div v-if="countDown == 0" class="text-center mt-5 grey--text">
          <v-icon>mdi-emoticon-angry</v-icon>
          <span> هنوز پیامک دریافت نکرده‌اید ؟ </span>
          <br />
          <a @click="sendCodeAgain">ارسال مجدد پیامک</a>
        </div>
      </v-col>
    </v-row>
    <v-btn
      color="success"
      dark
      x-large
      @click="submit"
      class="mx-auto d-block mt-12"
      width="200px"
      rounded
    >
      ارســال
    </v-btn>
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
      countDown: 90,
      code: null,
      errors: [],
      snackbar: false,
      errorMessages: '',
      formHasErrors: false,
      rules: {
        codeRules: [
          (v) => !!v || 'کد تائید اجباری است',
          (v) => (v && v.length > 3) || 'کد تائید  باید ۴ عدد باشد',
          (v) => /[0-9]/.test(v) || 'فقط عدد وارد کنید',
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
        const mobile = await this.checkVerifyCode()

        this.countDown = 90
        this.countDownTimer()
        await this.$axios.post('user/code/resend', value)
      } catch (error) {
        return false
      }
    },

    async checkVerifyCode() {
      const mobile = await this.$storage.getLocalStorage('mobile')

      console.log(mobile)
      if (!mobile) {
        this.errors = ['لطفا مجددا لاگین کنید']
        return this.$router.push({ path: '/auth/login' })
      }
      return mobile
    },
    async submit() {
      try {
        this.formHasErrors = false
        this.validation()
        this.errors = []
        const queryType = this.$route.query.q
        const mobile = await this.$auth.$storage.getLocalStorage('mobile')
        if (queryType === 'forgot') {
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
          console.log('uuuuuuuuuuuuuuuuuuuuuu')
          const value = {
            code: parseInt(this.code),
            mobile,
            type: 'register',
          }

          if (!this.formHasErrors) {
            console.log(333333333333333333333333)
            const response = await this.$axios.post('/user/code', value)
            console.log(response)
            await this.$auth.loginWith('local', {
              data: {
                mobile: this.mobile,
              },
            })
            return this.$router.push('/')
          }
        }
      } catch (error) {
        this.snackbar = true
        console.log(error)
        // if (error) {
        //   return this.errors.push(error.response.data.message)
        // }
      }
    },
  },
}
</script>
