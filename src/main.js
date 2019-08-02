import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { authService } from '@/services/Auth'
import VuePaginate from 'vue-paginate'
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false

Vue.use(VuePaginate)
Vue.use(VeeValidate)

Vue.prototype.$eventHub = new Vue()
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

