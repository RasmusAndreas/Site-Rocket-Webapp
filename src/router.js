import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Forgot from './views/Forgot.vue'
import Website from './views/Website.vue'
import Reset from './views/Reset.vue'
import Report from './views/Report.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/website/:id',
      name: 'website',
      component: Website,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: Forgot,
      meta: {
        requiresVisitor: true,
      },
    },
    {
      path: '/reset/:email/:resetToken',
      name: 'reset',
      component: Reset,
      meta: {
        requiresVisitor: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresVisitor: true,
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: {
        requiresVisitor: true,
      },
    },
    {
      path: '/report/:key',
      name: 'report',
      component: Report,
    }
  ]
})
