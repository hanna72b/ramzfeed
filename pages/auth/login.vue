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

    <v-row>
      <v-col cols="12">
        <h5 class="mb-5">سلام! لطفا شماره موبایل خود را وارد کنید</h5>
        <v-text-field
          v-model="mobile"
          ref="mobile"
          :rules="[() => !!mobile || 'این فیلد اجباری است']"
          label="شماره تلفن همراه"
          color="cyan"
          maxlength="11"
          outlined
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="12">
        <h5 class="mb-5">رمز عبور خود را وارد کنید</h5>
        <v-text-field
          v-model="password"
          ref="password"
          :rules="[
            (v) => !!password || 'این فیلد اجباری است',
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
    </v-row>

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
  </div>
</template>

<script>
import { digitsFaToEn } from 'persian-tools2'

export default {
  layout: 'empty',
  components: {},

  data: () => {
    return {
      dialog: false,
      errorMessages: '',
      formHasErrors: false,
      show1: false,
      password: null,
      errors: [],
      mobile: null,
      snackbar: false,
    }
  },
  // transition: {
  //   name: 'home',
  //   mode: 'out-in',
  // },
  computed: {
    form() {
      return {
        mobile: this.mobile,
      }
    },
  },
  watch: {
    mobile(val) {
      this.mobile = digitsFaToEn(val)
    },
  },
  mounted() {
    setTimeout(() => {
      this.$emit('createUser', true)
    }, 2000)
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
    async login() {
      this.formHasErrors = false
      // console.log(this.form)
      this.validation()
      this.errors = []
      try {
        if (!this.formHasErrors) {
          const value = {
            mobile: this.mobile,
            password: this.password,
          }

          const login = await this.$axios.post('user/login', value)

          if (login.data.data.access_token) {
            await this.$auth.loginWith('local', {
              data: {
                mobile: this.mobile,
                password: this.password,
              },
            })

            this.$router.push({
              path: '/',
            })
          } else {
            await this.$auth.$storage.setLocalStorage(
              'mobile',
              login.data.data.mobile
            )

            this.$router.push({
              path: '/auth/code',
              query: { q: 'register' },
            })
          }
        }
      } catch (error) {
        this.snackbar = true
        console.log('33333333333333333333')
        console.log(error)
        if (error.response.data.errors) {
          Object.values(error.response.data.errors).map((err) => {
            return this.errors.push(err[0])
          })
        } else {
          return this.errors.push(error.response.data.message)
        }
      }
    },
  },
}
</script>
