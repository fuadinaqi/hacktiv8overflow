import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import ProfileAnswer from '@/components/ProfileAnswer'
import ProfileHome from '@/components/ProfileHome'
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
    },
    {
      path: '/profile',
      component: ProfileHome,
      children: [
        {
          path: '',
          name: 'profile',
          component: Profile,
          props: true
        },
        {
          path: ':id',
          component: ProfileAnswer
        }
      ]
    }
  ]
})

console.log(store)

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token')) {
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next(false)
    } else {
      next()
    }
  }
})

export default router
