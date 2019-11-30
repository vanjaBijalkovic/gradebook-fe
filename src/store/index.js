import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

import { AuthModule } from './auth_module.store';

/* eslint-disable no-new */
const store = new Vuex.Store({
  modules: {
    AuthModule
  }
})

export default store
