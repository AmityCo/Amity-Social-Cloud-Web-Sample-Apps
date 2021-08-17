import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import routes from './routes'

import store from '../store'
import RouterPrefetch from 'vue-router-prefetch'

Vue.use(VueRouter)
Vue.use(RouterPrefetch)
Vue.use(VueCookies)

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  // If state isn't yet available 
  if (!store.state.user && to.path !== '/login'){
    // Check if user data is available in cookie
    if(Vue.$cookies.get('userId')){
      await store.dispatch('login', Vue.$cookies.get('userId'))
      next()
    }
    else return next({ path: '/login' })
  }
  next()
})

export default router
