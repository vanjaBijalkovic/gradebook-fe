import { authService } from '../services/Auth'

const user = JSON.parse(localStorage.getItem('user')) || null;

export const AuthModule = {
  state: {
    user,
    error: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    login(context, { email, password }) {
      console.log('test')
      return authService.login(email, password)
        .then((user) => {
          context.commit('setUser', user);
          return true;
        }).catch(e => { 
          context.commit('setError', e.response.data.errors);
          return false
        })
    },
    logout(context) {
      context.commit('setUser', null)
      return authService.logout()
    },
    setError(context, error) {
      context.commit('setError', error)
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getError(state) {
      return state.error;
    }
  }
}