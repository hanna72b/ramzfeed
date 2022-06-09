export default function ({ route, app }) {
  if (route.query) {
    if (route.query.message === '410') {
      app.store.commit('SET_ERRORS', {
        type: 'warning',
        messages: {
          message:
            'هم‌اکنون میتوانید وارد شوید. لطفا شماره موبایل خود را وارد کنید',
        },
      })
    }
  }
}
