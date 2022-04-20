
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import store from "../store";
import UserList from '@/views/UserList.vue'

import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/user-list',
    name: 'UserList',
    component: UserList,
    meta: {
      requiresAuth: true
    }
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
  
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.is_login) {
      next({ name: 'Login' })
    } else {
      if(to.name == 'Login') {
        next({ name: 'Home' })
      }
      else {
        next() // go to wherever I'm going
      }
     
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router

