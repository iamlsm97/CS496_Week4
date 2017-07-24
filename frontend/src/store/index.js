import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const nickname = localStorage.getItem('nickname') ? localStorage.getItem('nickname') : null

const store = {
  state: {
    nickname,
    roomID: '',
    joined: false,
    turn: 0,
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
    changeTurn (state, turn) {
      state.turn = turn
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
    changeTurn ({ commit }, turn) {
      commit('changeTurn', turn)
    },
    setLoading ({ commit }, loading) {
      commit('setLoading', loading)
    },
  },
}

export default new Vuex.Store(store)
