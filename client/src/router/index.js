import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Landing from '@/components/layout/Landing'
import About from '@/components/layout/About'
import Dashboard from '@/components/dashboard/Dashboard'
import Features from '@/components/dashboard/Features'
import Images from '@/components/dashboard/Images'
import NotFound from '@/components/layout/NotFound'
import Editor from '@/components/dashboard/Editor'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter (to, from, next) {
        if (!localStorage.getItem('token')) {
          next()
        } else {
          next({name: 'Dashboard', params: {token: localStorage.getItem('token')}})
        }
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter (to, from, next) {
        if (!localStorage.getItem('token')) {
          next()
        } else {
          next({name: 'Dashboard', params: {token: localStorage.getItem('token')}})
        }
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next({name: 'Login'})
        }
      }
    },
    {
      path: '/features',
      name: 'Features',
      component: Features,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next({name: 'Login'})
        }
      }
    },
    {
      path: '/images',
      name: 'Images',
      component: Images,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next({name: 'Login'})
        }
      }
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor,
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next({name: 'Login'})
        }
      }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
