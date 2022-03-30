<template>
  <div ref="form">
    <h3 class="text-right pt-10 pb-12 grey--text">
      <v-icon class="ml-1">mdi-account-plus</v-icon>
      عضویت در اکوسیستم
    </h3>

    <v-snackbar v-model="snackbar" :multi-line="true">
      <ul v-for="(error, index) in errors" :key="index" class="my-1 mr-6">
        <li class="mb-2">{{ error }}</li>
      </ul>
    </v-snackbar>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="first_name"
          ref="first_name"
          :rules="[() => !!first_name || 'این فیلد اجباری است']"
          :error-messages="errorMessages"
          label="نام"
          color="cyan"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="last_name"
          ref="last_name"
          :rules="[() => !!last_name || 'این فیلد اجباری است']"
          label="نام‌خانوادگی"
          color="cyan"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="email"
          ref="email"
          :rules="[() => !!email || 'این فیلد اجباری است']"
          label="ایمیل"
          color="cyan"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
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
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="re_pass"
          ref="re_pass"
          :rules="[passwordConfirmationRule]"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          label="تکرار رمز عبور"
          :type="show2 ? 'text' : 'password'"
          @click:append="show2 = !show2"
          color="cyan"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          v-model="gender"
          ref="gender"
          :rules="[() => !!gender || 'این فیلد اجباری است']"
          :items="gender_items"
          label=" جنسیت"
          color="cyan"
          return-object
        ></v-select>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="mobile"
          maxlength="11"
          ref="mobile"
          :rules="[
            () => !!mobile || 'این فیلد اجباری است',
            (v) => (v && v.length > 10) || 'شماره موبایل باید ۱۱ عدد باشد',
            (v) => /[0-9]/.test(v) || 'فقط عدد وارد کنید',
          ]"
          label="شماره موبایل"
          color="cyan"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <div class="text-right grey--text">
          این بخش مختص ثبت نام افراد حقیقی است، در صورت ثبت با نام شرکت/سازمان
          یا استارتاپ حساب کاربری لغو خواهد شد. پس از ثبت نام می توانید استارتاپ
          خود را اضافه نموده و مدیریت نمایید.وارد کردن تمامی اطلاعات خواسته شده
          اجباری می باشد
        </div>
      </v-col>
    </v-row>

    <v-btn
      @click="registerUser"
      color="cyan"
      type="submit"
      dark
      x-large
      width="200px"
      rounded
      class="form-btn"
    >
      <v-icon>mdi-account-plus</v-icon>
      عضـویت
    </v-btn>

    <v-btn color="blue" dark x-large to="/auth/login" class="mt-5 d-flex" text>
      قبلا ثبت‌نام کرده‌اید؟ وارد شوید
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
      errorMessages: '',
      formHasErrors: false,
      show1: false,
      show2: false,
      mobile: '09303988621',
      first_name: null,
      last_name: null,
      pass: 'iran33',
      re_pass: 'iran33',
      errors: [],
      email: null,
      gender: 'null',
      snackbar: false,
    }
  },
  transition: {
    name: 'home',
    mode: 'out-in',
  },
  computed: {
    form() {
      return {
        first_name: this.first_name,
        last_name: this.last_name,
        mobile: this.mobile,
        email: this.email,
        pass: this.pass,
        re_pass: this.re_pass,
        gender: this.gender,
      }
    },

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
  },
  watch: {
    mobile(val) {
      this.mobile = digitsFaToEn(val)
    },
  },
  mounted() {},
  methods: {
    validation() {
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) {
          this.formHasErrors = true
        }
        this.$refs[f].validate(true)
      })
    },
    async registerUser() {
      this.formHasErrors = false
      this.validation()
      this.errors = []
      try {
        const value = {
          mobile: this.mobile,
          password: this.pass,
          re_password: this.re_pass,
          first_name: this.first_name,
          last_name: this.last_name,
          gender: this.gender.value,
          username: this.email,
        }
        console.log(this.formHasErrors, 'ddddddddddddddddd')
        if (!this.formHasErrors) {
          await this.$axios.post('user/register', value)
          // console.log(register.data)

          await this.$storage.setLocalStorage('username', this.email)

          this.$router.push({ path: '/auth/code', query: { q: 'register' } })
        }
      } catch (error) {
        this.snackbar = true

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
