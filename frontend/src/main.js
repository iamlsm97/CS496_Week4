// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import { sync } from 'vuex-router-sync'
import store from './store' // vuex store instance
import router from './router' // vue-router instance

sync(store, router) // done.

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

import socketio from 'socket.io-client'
import VueSocketio from 'vue-socket.io'

Vue.use(VueSocketio, socketio('http://localhost:3000'), store)

import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})
