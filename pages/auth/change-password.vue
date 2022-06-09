<template>
  <div>
    <h2 class="text-center mb-10">بازیابی رمز عبور</h2>
    <v-form v-model="valid" @submit.prevent="submit">
      <v-text-field
        v-model="pass"
        :rules="rules.passRules"
        hint="رمز عبور مورد نظر خود را وارد کنید"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        outlined
        label="رمز عبور"
        :type="show1 ? 'text' : 'password'"
        @click:append="show1 = !show1"
      ></v-text-field>
      <v-text-field
        v-model="re_pass"
        :rules="[passwordConfirmationRule]"
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        outlined
        label="تکرار رمز عبور"
        :type="show2 ? 'text' : 'password'"
        @click:append="show2 = !show2"
      ></v-text-field>

      <v-btn
        color="amir"
        text="ارسال"
        class="mx-auto text-center"
        :disable="!valid"
        width="80"
      ></v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'guest',
  layout: 'auth_layout',
  components: {},

  data: () => {
    return {
      valid: true,
      show1: false,
      show2: false,

      pass: null,

      re_pass: null,
      rules: {
        phoneRules: [
          (v) => !!v || 'شماره موبایل اجباری است',
          (v) => (v && v.length > 10) || 'شماره موبایل باید ۱۱ عدد باشد',
          (v) => /[0-9]/.test(v) || 'فقط عدد وارد کنید',
        ],
        passRules: [
          (v) => !!v || 'رمز عبور اجباری است',
          (v) => (v && v.length >= 6) || 'رمز عبور باید حداقل ۶ کارکتر باشد',
        ],
      },
    }
  },
  computed: {
    passwordConfirmationRule() {
      if (this.re_pass == null) {
        return ' تکرار رمز عبور اجباری است'
      }

      if (this.pass !== this.re_pass) {
        return 'رمز عبور و تکرار رمز عبور باید مشابه باشند'
      } else {
        return true
      }
    },
    ...mapGetters(['persianName']),
  },
  methods: {
    async submit() {
      const token = this.$auth.$storage.getLocalStorage('verify_code_token')
      const value = {
        token,
        password: this.pass,
      }
      try {
        const response = await this.$axios.post('change-password', value)

        await this.$auth.setUserToken(response.data.token)

        await this.$auth.$storage.removeLocalStorage('verify_code_token')
        return this.$router.push('/user/profile')
      } catch {
        return false
      }
    },
  },
}
</script>
