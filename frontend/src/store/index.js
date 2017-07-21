import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = {
  state: {
    account,
  },
  mutations: {
    changeAccount (state, account) {
      state.account = account

      localStorage.setItem('account', JSON.stringify(account))
    },
    setLoading (state, loading) {
      state.loading = loading
    },
  },
  actions: {
    changeAccount ({ commit }, account) {
      commit('changeAccount', account)
    },
    setLoading ({ commit }, loading) {
      commit('setLoading', loading)
    },
  },
}

export default new Vuex.Store(store)
