import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { authService } from '@/services/Auth'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next)=> {
    
  if(to.name !== 'login' && !authService.isAuthenticated() && to.name !== 'register') {
      return router.push( '/login'); 
  }
  next()
})