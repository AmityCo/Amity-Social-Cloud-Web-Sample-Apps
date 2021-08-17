import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents)

Vue.config.productionTip = false;

document.addEventListener('gesturestart', e => e.preventDefault())

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

requestAnimationFrame(pushToTop)
function pushToTop(){
  if(!location.hash.startsWith('#/login'))
    window.scrollTo(0,0);
  requestAnimationFrame(pushToTop);
}