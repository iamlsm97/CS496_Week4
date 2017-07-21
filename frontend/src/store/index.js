import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const nickname = localStorage.getItem('nickname') ? localStorage.getItem('nickname') : null

const store = {
  state: {
    nickname,
  },
  mutations: {
    changeNickname (state, nickname) {
      state.nickname = nickname

      localStorage.setItem('nickname', nickname)
    },
    setLoading (state, loading) {
      state.loading = loading
    },
  },
  actions: {
    changeNickname ({ commit }, nickname) {
      commit('changeNickname', nickname)
    },
    setLoading ({ commit }, loading) {
      commit('setLoading', loading)
    },
  },
}

export default new Vuex.Store(store)
