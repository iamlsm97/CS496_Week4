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
    roomOwner: false,
    numUsers: 0,
    destroyedState: false,
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
    changeRoomOwner (state, roomOwner) {
      state.roomOwner = roomOwner
    },
    changeNumUsers (state, numUsers) {
      state.numUsers = numUsers
    },
    changeDestroyedState (state, destroyedState) {
      state.destroyedState = destroyedState
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
    changeRoomOwner ({ commit }, roomOwner) {
      commit('changeRoomOwner', roomOwner)
    },
    changeNumUsers ({ commit }, numUsers) {
      commit('changeNumUsers', numUsers)
    },
    changeDestroyedState ({ commit }, destroyedState) {
      commit('changeDestroyedState', destroyedState)
    },
    setLoading ({ commit }, loading) {
      commit('setLoading', loading)
    },
  },
}

export default new Vuex.Store(store)
