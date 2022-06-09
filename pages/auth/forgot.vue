<template>
  <div>
    <h2 class="text-center mb-10">یاد آوری کلمه عبور</h2>

    <v-form v-model="valid" @submit.prevent="submit">
      <v-text-field
        v-model="phone"
        hint="شماره موبایلی که با آن ثبت‌نام کرده‌اید،‌وارد کنید."
        outlined
        :rules="rules.phoneRules"
        label="شماره موبایل"
        background-color="#FFF"
        persistent-hint
        maxlength="11"
      ></v-text-field>

      <v-btn
        color="blue darken-4"
        text="ارسال"
        class="mx-auto text-center d-block my-7"
        width="80"
      ></v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { digitsFaToEn } from 'persian-tools2'

export default {
  // middleware: 'guest',
  layout: 'auth_layout',

  data: () => {
    return {
      valid: true,

      phone: null,

      rules: {
        phoneRules: [
          (v) => !!v || 'شماره موبایل اجباری است',
          (v) => (v && v.length > 10) || 'شماره موبایل باید ۱۱ عدد باشد',
          (v) => /[0-9]/.test(v) || 'فقط عدد وارد کنید',
        ],
      },
    }
  },
  computed: {
    ...mapGetters(['persianName']),
  },
  watch: {
    phone(val) {
      this.phone = digitsFaToEn(val)
    },
  },
  created() {
    // if (this.$route.query.q === 'after_register') {
    //   this.msg = ['ثبت‌نام با موفقیت انجام شد . هم اکنون می‌توانید وارد شوید']
    //   this.msg_type = 'success'
    // }
    this.$store.commit('BTN_STATUS', false)
  },
  methods: {
    async submit() {
      try {
        const value = { phone: this.phone }
        const response = await this.$axios.post('/forgot', value)
        await this.$auth.$storage.setLocalStorage(
          'verify_code_token',
          response.data.data.token
        )
        return this.$router.push({ path: '/auth/code', query: { q: 'forgot' } })
      } catch {
        return false
      }
    },
  },
}
</script>
