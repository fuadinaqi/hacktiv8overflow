import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})

console.log(store)

// router.beforeEach((to, from, next) => {
//   if (!store.state.token) {
//     if (to.path !== '/login') {
//       next('/login')
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router
