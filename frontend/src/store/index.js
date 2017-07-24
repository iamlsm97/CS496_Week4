import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const nickname = localStorage.getItem('nickname') ? localStorage.getItem('nickname') : null

const store = {
  state: {
    nickname,
    roomID: '',
    joined: false,
  },
  mutations: {
    changeNickname (state, nickname) {
      state.nickname = nickname

      localStorage.setItem('nickname', nickname)
    },
    changeRoomID (state, roomID) {
      state.roomID = roomID
    },
    changeJoined (state, joined) {
      state.joined = joined
    },
    setLoading (state, loading) {
      state.loading = loading
    },
  },
  actions: {
    changeNickname ({ commit }, nickname) {
      commit('changeNickname', nickname)
    },
    changeRoomID ({ commit }, roomID) {
      commit('changeRoomID', roomID)
    },
    changeJoined ({ commit }, joined) {
      commit('changeJoined', joined)
    },
    setLoading ({ commit }, loading) {
      commit('setLoading', loading)
    },
  },
}

export default new Vuex.Store(store)
