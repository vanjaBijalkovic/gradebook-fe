import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { authService } from '@/services/Auth'
import VuePaginate from 'vue-paginate'
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false

Vue.use(VuePaginate)
Vue.use(VeeValidate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next)=> {

  if(to.name !== 'login' && !authService.isAuthenticated() && to.name !== 'register') {
      return router.push( {name:'login'}); // reroute na login ako nije ulogovan
  }
  next()
})