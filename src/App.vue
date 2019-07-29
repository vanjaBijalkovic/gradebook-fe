<template>
  <div id="app">
    <nav class="navbar navbar-inverse">
      <router-link to="/">Gradebooks</router-link>
      <div class="navbar-right navbar-btn">
        <router-link class="btn btn-danger navbar-btn" to="register">Register</router-link>
        <router-link class="btn btn-danger navbar-btn" to="/login" v-if="!test">Login</router-link>
        <a href="#" @click="logout" v-if="test">Logout</a>
      </div>
    </nav>
    <router-view/>
  </div>
</template>
<script>
import { authService } from '@/services/Auth'
export default {
  data() {
      return {
        isAuthenticated: authService.isAuthenticated()
      }
    },
    methods: {
      logout() {
        authService.logout()
        this.isAuthenticated = false
      }
    },
    computed: {
      test() {
        console.log(this.isAuthenticated)
        return this.isAuthenticated
      }
    }
    
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
.nav {
  justify-content: space-between;
  
  background-color: lightgray;
}
</style>
