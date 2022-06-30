import Vue from 'vue'
import moment from 'moment'

Vue.mixin({
  computed: {},
  watch: {},
  methods: {
    getPath(path) {
      let prefix = null
      switch (path) {
        case 'twitter':
          prefix = 'twitter/'
          break

        case 'long_news':
          prefix = 'long_news/'
          break

        case 'article':
          prefix = 'articles/'
          break

        case 'influencer':
          prefix = 'twitter/influencer/'
          break

        case 'crawling_source':
          prefix = 'crawling_sources/'
          break
      }

      return `${this.$baseUrl}/storage/uploads/${prefix}`
    },

    /**
     *
     * @param timestamp
     * @param input
     * @returns {string|*}
     */
    toJalali(timestamp, input) {
      if (!timestamp) {
        return ''
      }

      let option = {
        day: '2-digit',
        year: 'numeric',
        month: 'short',
      }

      if (input) {
        const { noWeek = false, noTime = false, slash = false } = input

        option = slash
          ? {
              day: '2-digit',
              year: 'numeric',
              month: '2-digit',
            }
          : {
              day: '2-digit',
              year: 'numeric',
              month: noTime ? 'short' : '2-digit',
              weekday: 'long',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            }

        if (noWeek) delete option.weekday
        if (noTime) {
          delete option.hour
          delete option.minute
          delete option.second
        }
      }

      return Intl.DateTimeFormat('fa-IR', option).format(
        Number(timestamp) * 1000
      )
    },

    timestampToDate(timestamp) {
      let date
      if (timestamp !== null) {
        date = timestamp.slice(0, -3)
      } else {
        date = timestamp
      }
      return moment.unix(date).format('YYYY-MM-DD HH:mm:ss')
    },

    validation(ValidationObj) {
      let msg = []
      let err

      if (ValidationObj[0].flag !== null && ValidationObj[0].flag === 'array') {
        if (ValidationObj[0].minVal > ValidationObj[0].field.length) {
          this.$store.commit('SET_ERRORS', {
            type: 'success',
            msg_type: 'txt',
            message: ValidationObj[0].message,
          })
          err = true
          ValidationObj = {}
        }
      }

      Object.values(ValidationObj).forEach((v) => {
        if (v.flag === 'required') {
          if (v.field == null || v.field === '') {
            console.log('55555555555555555555555')
            console.log(v, 'ffffffffffffffffff')
            msg.push(v.message)

            this.$store.commit('SET_ERRORS', {
              type: 'success',
              msg_type: 'array',
              message: [msg],
            })
            err = true
            ValidationObj = {}
          }
        }

        if (v.flag === 'custom') {
          msg.push(v.message)

          this.$store.commit('SET_ERRORS', {
            type: 'success',
            msg_type: 'array',
            message: [msg],
          })
          err = true
          ValidationObj = {}
        }
      })

      if (err === true) {
        throw new Error('Required')
      }
      msg = []
    },

    toEngNum(strNum) {
      const pn = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
      const en = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      const an = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
      let cache = strNum
      for (let i = 0; i < 10; i++) {
        const regexFa = new RegExp(pn[i], 'g')
        const regexAr = new RegExp(an[i], 'g')
        cache = cache.replace(regexFa, en[i])
        cache = cache.replace(regexAr, en[i])
      }
      return cache
    },

    dateToTimestamp(date, { resetHour = false, resetFrom = false } = {}) {
      try {
        let d = new Date(date)

        if (resetHour) {
          d = new Date(new Date(date).setHours(23, 59, 59, 0))
        }
        if (resetFrom) {
          d = new Date(new Date(date).setHours(0, 0, 0, 0))
        }
        return d.getTime() / 1000
      } catch (e) {
        console.log(e)
      }
    },

    splitTweet(str) {
      if (str) {
        const length = [...str].length
        return length > 100 ? str.slice(0, 100) + '...' : str
      }
    },
    displayImg(basePath, imagePath) {
      // if (typeof imagePath !== 'string') {
      //   console.log('imagePath is not string')
      //     return require('~/assets/images/no-image.png')
      // }
      if (imagePath && imagePath.length) {
        return this.getPath(basePath) + imagePath
      } else {
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrrr')
      }
    },
  },
})
