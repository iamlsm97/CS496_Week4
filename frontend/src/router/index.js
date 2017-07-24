import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import RoomList from '@/components/RoomList'
import Game from '@/components/Game'

import store from '@/store/index'

import Hello from '@/components/Hello'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: MainPage },
    { path: '/roomlist', component: RoomList },
    { path: '/test', component: Hello },
    { path: '/game/:roomID', component: Game },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
  } else if (store.state.nickname !== 'null') {
    next()
  } else {
    next('/')
  }
})

export default router
