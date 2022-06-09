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
      <h4 class="text-right mb-4 text--grey">
        کد تایید چهار رقمی که برای شما SMS شده است را وارد کنید
      </h4>
      <v-otp-input
        v-model="code"
        length="4"
        type="number"
        hide-spin-buttons
      ></v-otp-input>

      <div v-if="countDown > 0" class="text-center my-4 font-weight-bold">
        {{ countDown }} ثانیه تا ارسال پیامک
      </div>
      <div v-if="countDown == 0" class="text-center mb-4 font-weight-bold">
        هنوز پیامک دریافت نکرده‌اید ؟

        <a @click="sendCodeAgain">ارسال مجدد پیامک</a>
      </div>

      <v-btn
        color="cyan"
        large
        class="mx-auto text-center d-block my-4"
        width="100%"
        type="submit"
        >ارسال</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import { digitsFaToEn } from 'persian-tools2'

export default {
  layout: 'auth_layout',

  data: () => {
    return {
      valid: true,
      countDown: 90,
      code: null,
      mobile: null,
      token: null,
      rules: {
        codeRules: [
          (v) => !!v || 'کد تائید اجباری است',
          (v) => (v && v.length > 3) || 'کد تائید  باید ۴ عدد باشد',
          (v) => /[0-9]/.test(v) || 'فقط عدد وارد کنید',
        ],
      },
    }
  },
  computed: {},
  watch: {
    code(val) {
      this.code = digitsFaToEn(val)
    },
  },
  created() {
    this.mobile = this.$auth.$storage.getLocalStorage('mobile')
    this.token = this.$auth.$storage.getLocalStorage('token')
    this.checkVerifyCode()
    this.countDownTimer()
  },
  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }
    },
    // async sendCodeAgain() {
    //   const token = this.checkVerifyCode()
    //   const value = {
    //     token,

    //     type: 'register',
    //   }
    //   try {
    //     this.countDown = 90
    //     this.countDownTimer()
    //     await this.$axios.post('send-verify-code-again', value)
    //   } catch (error) {
    //     console.log(error.response)
    //     return false
    //   }
    // },

    checkVerifyCode() {
      console.log(this.code)

      if (!this.mobile) {
        this.$store.commit('FLUSH', 'لطفا مجددا لاگین کنید')
        return this.$router.push({ path: '/auth/mobile' })
      }
    },
    async submit() {
      try {
        const value = {
          code: this.code,
          token: this.token,
          phone: this.mobile,
        }

        const response = await this.$axios.post('/auth/check-code', value)
        if (response.data.data) {
          return this.$router.push({
            path: '/auth/new-password',
          })
        }
        console.log(response.data.data)
      } catch (error) {
        return false
      }
    },
  },
}
</script>
