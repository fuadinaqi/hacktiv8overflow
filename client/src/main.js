// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import Buefy from 'buefy'
import VueParticles from 'vue-particles'
import swal from 'sweetalert'

import 'buefy/lib/buefy.css'

Vue.use(Buefy)
Vue.use(VueParticles)

Vue.config.productionTip = false

Vue.prototype.$swal = swal
Vue.prototype.$axios = axios.create({
  baseURL: 'http://35.198.230.193:3003/'
})
Vue.prototype.$store = store

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
