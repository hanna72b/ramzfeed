<template>
  <div>
    <h2 class="text-center mt-4 mb-10">ورود | ثبت‌نام</h2>
    <h4 class="text-right mt-4 mb-2">
      سلام! لطفا شماره موبایل خود را وارد کنید
    </h4>

    <v-form v-model="valid" @submit.prevent="login">
      <v-text-field
        v-model="phone"
        outlined
        :rules="rules.phoneRules"
        label="شماره موبایل"
        maxlength="11"
        color="cyan"
      ></v-text-field>

      <v-btn
        color="cyan"
        class="mx-auto text-center d-block mt-4"
        large
        width="100%"
        type="submit"
      >
        <span>ورود</span>
      </v-btn>
    </v-form>
    <!-- <router-link to="/auth/forgot">
      <div class="mx-auto text-center mt-4">رمز عبور خود را فراموش کرده‌ام</div>
    </router-link> -->
  </div>
</template>

<script>
export default {
  // middleware: 'guest',
  layout: 'auth_layout',

  data: () => {
    return {
      valid: true,
      show1: false,
      phone: null,
      pass: null,

      rules: {
        passRules: [
          (v) => !!v || 'رمز عبور اجباری است',
          (v) => (v && v.length >= 6) || 'رمز عبور باید حداقل ۶ کارکتر باشد',
        ],
      },
    }
  },

  mounted() {},

  methods: {
    async login() {
      try {
        const value = {
          phone: this.phone,
        }
        const response = await this.$axios.post('auth/account-exist', value)
        const exist = response.data.data
        this.$auth.$storage.setLocalStorage('mobile', this.phone)
        if (!exist) {
          const response = await this.$axios.post('auth/create-code', value)
          await this.$auth.$storage.setLocalStorage(
            'token',
            response.data.data.token
          )
          return this.$router.push({
            path: '/auth/code',
          })
        } else {
          return this.$router.push({
            path: '/auth/password',
          })
        }
      } catch (error) {}
    },
  },
}
</script>
