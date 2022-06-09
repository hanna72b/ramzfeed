/* eslint-disable prettier/prettier */

export default function (app) {
  app.$axios.onRequest((config) => {
    config.headers.common['Content-Type'] = 'application/json'
    config.headers.common['Accept-Language'] = 'fa'
    config.headers.common['Cache-Control'] = 'no cache'
  })

  app.$axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)

    if (code === 401) {
      app.redirect('/auth/login')
      app.$auth.logout()
    }
    if (code === 403) {
      app.redirect('/auth/login')
      app.$auth.logout()
    }

    if (code === 422) {
      app.store.commit('SET_ERRORS', {
        type: 'warning',
        messages: error.response.data,
      })
    }
  })
}
