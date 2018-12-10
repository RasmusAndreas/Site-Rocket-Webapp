import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Forgot from './views/Forgot.vue'
import Website from './views/Website.vue'
import Reset from './views/Reset.vue'

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
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
      meta: {
        requiresVisitor: true,
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "login" */ './views/Signup.vue'),
      meta: {
        requiresVisitor: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
