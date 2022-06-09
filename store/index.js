export const state = () => ({
  btnStatus: false,
  flush: null,
  setErrors: {},
})

export const mutations = {
  BTN_STATUS(state, btnStatus) {
    state.btnStatus = btnStatus
  },
  FLUSH(state, flush) {
    state.flush = flush
  },
  SET_ERRORS(state, setErrors) {
    // state.setErrors = setErrors;
    state.setErrors = JSON.parse(JSON.stringify(setErrors))
  },
}

export const actions = {}

export const getters = {
  loggedInUser(state) {
    return state.auth.user
  },
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  btnStatus: (state) => state.btnStatus,
  getFlush: (state) => state.flush,
  setErrors: (state) => state.setErrors,
}
