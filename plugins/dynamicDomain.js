export default ({ app, req }, inject) => {
  const host = process.server ? req.headers.host : window.location.host
  let baseUrl = ''
  if (host === 'localhost:3000') {
    baseUrl = 'http://localhost:8000'
  } else {
    baseUrl = 'https://api.ramzfeed.com'
  }

  app.$axios.onRequest((config) => {
    config.baseURL = `${baseUrl}/api/v1`
  })

  inject('baseUrl', baseUrl)
}
